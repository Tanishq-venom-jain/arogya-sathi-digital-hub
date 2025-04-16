
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SignUpForm from '@/components/auth/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="arogya-container">
          <SignUpForm />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignUpPage;
