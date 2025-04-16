
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CtaSection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-arogya-700 to-arogya-500 text-white">
      <div className="arogya-container text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to transform your healthcare experience?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of doctors and patients who are already benefiting from Arogya Mitra
        </p>
        <div className="flex justify-center space-x-4">
          <Button asChild size="lg" variant="default" className="bg-white text-arogya-700 hover:bg-gray-100">
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
