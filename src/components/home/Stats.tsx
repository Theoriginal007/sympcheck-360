
import React from 'react';
import { ArrowDownRight, Users, Check, Star, HeartPulse } from 'lucide-react';

const Stats = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-health-primary/5 to-health-secondary/5"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-health-primary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Making a Difference in Kenya</h2>
          <p className="text-gray-600">
            Our platform is achieving measurable impacts on healthcare access and outcomes across Kenya.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <ArrowDownRight className="w-6 h-6 text-health-success" />,
              value: '25%',
              label: 'Reduction in Unnecessary Hospital Visits',
              color: 'bg-health-success/10',
              iconColor: 'text-health-success',
              delay: '0.1s'
            },
            {
              icon: <Users className="w-6 h-6 text-health-primary" />,
              value: '10,000+',
              label: 'Virtual Consultations Conducted',
              color: 'bg-health-primary/10',
              iconColor: 'text-health-primary',
              delay: '0.2s'
            },
            {
              icon: <HeartPulse className="w-6 h-6 text-health-accent" />,
              value: '80%',
              label: 'Improvement in Health Monitoring',
              color: 'bg-health-accent/10',
              iconColor: 'text-health-accent',
              delay: '0.3s'
            },
            {
              icon: <Check className="w-6 h-6 text-health-secondary" />,
              value: '92%',
              label: 'AI Symptom Analysis Accuracy',
              color: 'bg-health-secondary/10',
              iconColor: 'text-health-secondary',
              delay: '0.4s'
            }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="glass-panel rounded-2xl p-6 text-center animate-scale-in"
              style={{ animationDelay: stat.delay }}
            >
              <div className={`w-14 h-14 ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {/* Additional stats in horizontal layout */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '95%', label: 'User Satisfaction' },
              { value: '75%', label: 'Increased Health Literacy' },
              { value: '99.9%', label: 'Platform Uptime' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-5 h-5 text-health-accent mr-1 fill-health-accent" />
                  <Star className="w-5 h-5 text-health-accent mr-1 fill-health-accent" />
                  <Star className="w-5 h-5 text-health-accent mr-1 fill-health-accent" />
                  <Star className="w-5 h-5 text-health-accent mr-1 fill-health-accent" />
                  <Star className="w-5 h-5 text-health-accent fill-health-accent" />
                </div>
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-gray-600 text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
