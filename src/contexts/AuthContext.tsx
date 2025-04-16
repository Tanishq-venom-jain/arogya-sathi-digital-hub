
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
          role: session.user.user_metadata.role,
          createdAt: new Date(session.user.created_at),
        });
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name,
          role: session.user.user_metadata.role,
          createdAt: new Date(session.user.created_at),
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) throw error;

      // Create profile in the respective table (patients or doctors)
      if (data.user) {
        const userId = data.user.id;
        
        if (role === 'patient') {
          const { error: profileError } = await supabase
            .from('patients')
            .insert([{ id: userId, name, email }]);
            
          if (profileError) throw profileError;
        } else if (role === 'doctor') {
          const { error: profileError } = await supabase
            .from('doctors')
            .insert([{ 
              id: userId, 
              name, 
              email, 
              specialization: '', 
              consultationFee: 0,
              extraFeeForReport: 0
            }]);
            
          if (profileError) throw profileError;
        }
      }

      toast.success('Sign up successful! Please check your email for verification.');
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to sign up. Please try again.');
      return false;
    }
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user?.user_metadata.role !== role) {
        await supabase.auth.signOut();
        toast.error(`Invalid role selected. This account is registered as a ${data.user?.user_metadata.role}.`);
        return false;
      }

      toast.success('Login successful!');
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please check your credentials.');
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      signup,
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
