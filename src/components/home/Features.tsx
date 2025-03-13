
import React from 'react';
import { CheckCircle2, Globe, ShieldCheck, Cpu } from 'lucide-react';

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bridging Healthcare Gaps in Kenya</h2>
          <p className="text-gray-600">
            HealthSphere addresses key healthcare challenges through innovative technology and culturally sensitive approaches.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side: Feature points */}
          <div className="space-y-8 animate-slide-up">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6 text-health-primary" />,
                title: 'Data Security & Privacy',
                description: 'Compliant with Kenya Data Protection Act, ensuring your health information remains private and secure.'
              },
              {
                icon: <Cpu className="w-6 h-6 text-health-primary" />,
                title: 'Advanced AI Technology',
                description: 'Utilizes cutting-edge artificial intelligence to provide accurate symptom analysis and health guidance.'
              },
              {
                icon: <Globe className="w-6 h-6 text-health-primary" />,
                title: 'Culturally Appropriate',
                description: 'Content designed specifically for Kenyan communities, available in both English and Swahili.'
              },
              {
                icon: <CheckCircle2 className="w-6 h-6 text-health-primary" />,
                title: 'Offline Functionality',
                description: 'Access core features even with limited internet connectivity, ideal for rural areas.'
              }
            ].map((feature, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0 mt-1">
                  {feature.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right side: Image or illustration */}
          <div className="relative animate-slide-in-right">
            {/* Main image with glass effect */}
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-health-primary to-health-secondary rounded-2xl p-1">
                <div className="w-full h-full bg-white rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                    alt="Doctor using digital health technology" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-health-accent/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-health-primary/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
