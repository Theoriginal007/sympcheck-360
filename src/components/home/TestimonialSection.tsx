
import React from 'react';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600">
            HealthSphere is making a real difference in the lives of Kenyan communities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "The symptom checker helped me understand what was wrong when I couldn't reach a doctor. The health guidance was accurate and helped me decide whether I needed emergency care.",
              author: "Sarah Mwangi",
              role: "Teacher, Nairobi",
              delay: "0.1s"
            },
            {
              quote: "As a healthcare provider in a rural area, HealthSphere has been invaluable. I can now follow up with patients remotely, and the AI system helps triage cases effectively.",
              author: "Dr. James Omondi",
              role: "Physician, Kisumu",
              delay: "0.2s"
            },
            {
              quote: "The health monitoring feature helped me manage my diabetes better. Being able to track my metrics and get culturally relevant advice has improved my quality of life.",
              author: "Daniel Kipchoge",
              role: "Patient with Diabetes",
              delay: "0.3s"
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow animate-scale-in"
              style={{ animationDelay: testimonial.delay }}
            >
              <Quote className="w-10 h-10 text-health-primary/20 mb-4" />
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-health-primary to-health-secondary rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Featured testimonial */}
        <div className="mt-16 bg-gradient-to-r from-health-primary to-health-secondary rounded-2xl p-1 animate-slide-up">
          <div className="bg-white rounded-xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <Quote className="w-12 h-12 text-health-primary mb-4" />
                <p className="text-xl md:text-2xl font-medium text-gray-800 mb-6">
                  "HealthSphere has revolutionized healthcare delivery in our community. The platform's culturally appropriate content has significantly improved health literacy among our people."
                </p>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-health-primary to-health-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    MW
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-lg">Mary Wambui</h4>
                    <p className="text-gray-600">Community Health Worker, Nakuru</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80" 
                    alt="Community health worker with patient" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-health-accent/20 rounded-full blur-xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
