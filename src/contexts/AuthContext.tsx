
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
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

// Mock users for testing purposes
const mockUsers = [
  {
    id: '1',
    email: 'doctor@example.com',
    password: 'password123',
    name: 'Dr. John Smith',
    role: 'doctor' as UserRole,
    createdAt: new Date(),
  },
  {
    id: '2',
    email: 'patient@example.com',
    password: 'password123',
    name: 'Jane Doe',
    role: 'patient' as UserRole,
    createdAt: new Date(),
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [users, setUsers] = useState(mockUsers);

  useEffect(() => {
    // Simulate checking for a saved session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const signup = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      // Check if email already exists
      if (users.some(u => u.email === email)) {
        toast.error('Email already in use');
        return false;
      }

      // Create new user
      const newUser = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        password,
        name,
        role,
        createdAt: new Date(),
      };

      setUsers(prevUsers => [...prevUsers, newUser]);
      toast.success('Sign up successful! Please log in.');
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Failed to sign up. Please try again.');
      return false;
    }
  };

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Find user by email and password
      const foundUser = users.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        toast.error('Invalid email or password');
        return false;
      }

      if (foundUser.role !== role) {
        toast.error(`Invalid role selected. This account is registered as a ${foundUser.role}.`);
        return false;
      }

      // Omit password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      
      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
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
      setUser(null);
      localStorage.removeItem('user');
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
