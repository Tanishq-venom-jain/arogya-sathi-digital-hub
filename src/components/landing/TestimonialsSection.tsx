
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, testimonial }) => (
  <Card className="arogya-card p-6">
    <CardContent className="pt-6">
      <div className="mb-4 text-arogya-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.51.144-.09.030-.18.066-.27.108l1.18 1.657c.164.228.26.46.28.692.02.232-.03.465-.16.697-.13.232-.31.406-.54.522-.23.116-.46.174-.7.174-.44 0-.79-.157-1.06-.47-.27-.314-.4-.793-.4-1.436 0-.75.19-1.38.56-1.89.38-.51.89-.865 1.56-1.064.66-.198 1.31-.208 1.94-.026.63.18 1.17.507 1.63.977.46.47.82 1.03 1.08 1.67.26.64.38 1.35.38 2.12 0 .81-.16 1.59-.48 2.32-.32.73-.77 1.36-1.37 1.9-.6.54-1.29.96-2.07 1.27-.78.31-1.65.45-2.59.45-2.35 0-4.27-.86-5.76-2.58-1.49-1.72-2.24-4.04-2.24-6.96 0-1.42.19-2.73.58-3.94.39-1.21.93-2.29 1.62-3.22.69-.93 1.5-1.66 2.44-2.2.94-.55 1.95-.82 3.04-.82 1.27 0 2.4.27 3.4.81 1 .54 1.8 1.31 2.4 2.31l-2.7 2.03c-.26-.4-.62-.72-1.07-.96-.45-.24-.95-.36-1.5-.36-.48 0-.93.08-1.35.25-.42.17-.79.38-1.12.66-.33.28-.6.61-.81 1-.21.39-.36.83-.46 1.33h.02c.1-.14.22-.25.38-.34.16-.09.33-.15.52-.2.19-.05.39-.1.6-.12.21-.03.43-.04.65-.04 1.54 0 2.77.5 3.68 1.52.91 1.01 1.37 2.24 1.37 3.7zm8.1 0c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16.036-.33.084-.51.144-.09.030-.18.066-.27.108l1.18 1.657c.164.228.26.46.28.692.02.232-.03.465-.16.697-.13.232-.31.406-.54.522-.23.116-.46.174-.7.174-.44 0-.79-.157-1.06-.47-.27-.314-.4-.793-.4-1.436 0-.75.19-1.38.56-1.89.38-.51.89-.865 1.56-1.064.66-.198 1.31-.208 1.94-.026.63.18 1.17.507 1.63.977.46.47.82 1.03 1.08 1.67.26.64.38 1.35.38 2.12 0 .81-.16 1.59-.48 2.32-.32.73-.77 1.36-1.37 1.9-.6.54-1.29.96-2.07 1.27-.78.31-1.65.45-2.59.45-2.35 0-4.27-.86-5.76-2.58-1.49-1.72-2.24-4.04-2.24-6.96 0-1.42.19-2.73.58-3.94.39-1.21.93-2.29 1.62-3.22.69-.93 1.5-1.66 2.44-2.2.94-.55 1.95-.82 3.04-.82 1.27 0 2.4.27 3.4.81 1 .54 1.8 1.31 2.4 2.31l-2.7 2.03c-.26-.4-.62-.72-1.07-.96-.45-.24-.95-.36-1.5-.36-.48 0-.93.08-1.35.25-.42.17-.79.38-1.12.66-.33.28-.6.61-.81 1-.21.39-.36.83-.46 1.33h.02c.1-.14.22-.25.38-.34.16-.09.33-.15.52-.2.19-.05.39-.1.6-.12.21-.03.43-.04.65-.04 1.54 0 2.77.5 3.68 1.52.91 1.01 1.37 2.24 1.37 3.7z"/>
        </svg>
      </div>
      <p className="text-gray-600 mb-6">{testimonial}</p>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500 text-sm">{role}</p>
      </div>
    </CardContent>
  </Card>
);

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="arogya-container">
        <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            name="Dr. Vikram Mehta"
            role="Orthopedic Surgeon"
            testimonial="Arogya Mitra has revolutionized how I manage patient records. The custom letterhead feature is excellent, and my patients love having digital access to their reports."
          />
          
          <TestimonialCard
            name="Neha Sharma"
            role="Patient"
            testimonial="I used to carry a folder of medical reports everywhere. Now everything is in one app! Finding specialists and booking appointments is so convenient."
          />
          
          <TestimonialCard
            name="Dr. Anjali Desai"
            role="Pediatrician"
            testimonial="The platform is intuitive and saves me time. The extra earnings for digital reports are a nice bonus, and my patients appreciate the professional touch."
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
