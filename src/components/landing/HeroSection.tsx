
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-arogya-700 to-arogya-500 text-white py-20">
      <div className="arogya-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Your Medical Records, Anytime, Anywhere</h1>
            <p className="text-xl mb-8">
              Arogya Mitra centralizes your fragmented medical reports and documents in one secure place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="default" className="bg-white text-arogya-700 hover:bg-gray-100">
                <Link to="/login">Patient Login</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-arogya-600/20 hover:text-white">
                <Link to="/login">Doctor Login</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <img 
              src="/placeholder.svg" 
              alt="Digital Health Records" 
              className="max-w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}></div>
    </section>
  );
};

export default HeroSection;
