
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-[#1EAEDB] text-white py-20">
      <div className="arogya-container">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Arogya Mitra centralizes your fragmented medical reports and documents in one secure place.</h1>
          <div className="flex justify-center space-x-4 mt-8">
            <Button 
              asChild 
              variant="outline" 
              className="bg-white text-[#1EAEDB] hover:bg-gray-100 px-8 py-3 text-lg"
            >
              <Link to="/signup">Sign Up</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              className="bg-white text-[#1EAEDB] hover:bg-gray-100 px-8 py-3 text-lg"
            >
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
