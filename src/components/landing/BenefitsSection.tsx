
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface BenefitItemProps {
  title: string;
  points: string[];
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, points }) => (
  <div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <ul className="space-y-2">
      {points.map((point, index) => (
        <li key={index} className="flex items-start">
          <div className="w-5 h-5 rounded-full bg-arogya-500 text-white flex items-center justify-center mr-3 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  </div>
);

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="arogya-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Benefits for Everyone</h2>
            
            <div className="space-y-6">
              <BenefitItem
                title="For Patients"
                points={[
                  "Never lose a medical report again",
                  "Find specialized doctors easily",
                  "Book appointments without phone calls",
                  "Access your complete medical history instantly",
                  "Secure sharing with healthcare providers"
                ]}
              />
              
              <BenefitItem
                title="For Doctors"
                points={[
                  "Generate digital prescriptions easily",
                  "Earn extra by using the platform",
                  "Customize your medical letterhead",
                  "Access patient history with permission",
                  "Streamline your appointment schedule"
                ]}
              />
            </div>
            
            <Button asChild className="mt-8 arogya-gradient">
              <Link to="/login">Get Started Now</Link>
            </Button>
          </div>
          
          <div>
            <img 
              src="/placeholder.svg" 
              alt="Arogya Mitra Benefits" 
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
