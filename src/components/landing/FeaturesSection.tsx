
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Hospital, ClipboardList, Search, Calendar, QrCode, FileText } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card className="arogya-card p-6 flex flex-col items-center text-center">
    <CardContent className="pt-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="arogya-container">
        <h2 className="text-3xl font-bold text-center mb-4">How Arogya Mitra Works</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          A seamless experience for both patients and doctors
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Search className="w-10 h-10 text-arogya-500" />}
            title="Find Doctors"
            description="Search for specialized doctors near you and view their consultation fees"
          />
          <FeatureCard 
            icon={<Calendar className="w-10 h-10 text-arogya-500" />}
            title="Book Appointments"
            description="Schedule appointments with your preferred doctors at your convenience"
          />
          <FeatureCard 
            icon={<QrCode className="w-10 h-10 text-arogya-500" />}
            title="Secure QR Exchange"
            description="Share your information securely with doctors using time-limited QR codes"
          />
          <FeatureCard 
            icon={<ClipboardList className="w-10 h-10 text-arogya-500" />}
            title="Digital Prescriptions"
            description="Receive digital prescriptions and medical reports directly on the app"
          />
          <FeatureCard 
            icon={<FileText className="w-10 h-10 text-arogya-500" />}
            title="Centralized Records"
            description="Access all your medical reports and history in one place, anytime"
          />
          <FeatureCard 
            icon={<Hospital className="w-10 h-10 text-arogya-500" />}
            title="Custom Letterheads"
            description="Doctors can customize their prescription letterheads for a professional touch"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
