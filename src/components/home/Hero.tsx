
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Heart, Activity, Video, BookOpen } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-32 -left-32 w-96 h-96 bg-health-primary/10 rounded-full blur-3xl animate-pulse-subtle"></div>
        <div className="absolute top-64 -right-32 w-96 h-96 bg-health-accent/10 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-8 animate-slide-down">
          <span className="text-sm font-medium text-health-text">Bringing healthcare closer to you</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-4xl mx-auto animate-fade-in">
          <span className="text-gradient">AI-powered healthcare</span> for Kenyan communities
        </h1>
        
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          HealthSphere uses artificial intelligence to provide accessible, reliable, and culturally appropriate healthcare services, reducing barriers between patients and healthcare providers.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg" 
            className="rounded-full px-8 bg-health-primary hover:bg-health-primary/90 text-white shadow-lg group"
            onClick={() => navigate('/symptom-checker')}
          >
            <span>Check Your Symptoms</span>
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8"
            onClick={() => navigate('/dashboard')}
          >
            Track Your Health
          </Button>
        </div>
        
        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-20 w-full max-w-6xl mx-auto">
          {[
            { 
              icon: <Heart className="w-6 h-6 text-white" />,
              color: 'bg-health-primary',
              title: 'Symptom Checker',
              description: 'AI-powered symptom analysis for preliminary health guidance.',
              link: '/symptom-checker',
              delay: '0.6s'
            },
            { 
              icon: <Activity className="w-6 h-6 text-white" />,
              color: 'bg-health-success',
              title: 'Health Monitoring',
              description: 'Track and monitor your vital health metrics in real-time.',
              link: '/dashboard',
              delay: '0.8s'
            },
            { 
              icon: <Video className="w-6 h-6 text-white" />,
              color: 'bg-health-accent',
              title: 'Virtual Consultations',
              description: 'Connect with healthcare professionals remotely.',
              link: '/consultations',
              delay: '1.0s'
            },
            { 
              icon: <BookOpen className="w-6 h-6 text-white" />,
              color: 'bg-health-secondary',
              title: 'Health Education',
              description: 'Access culturally appropriate health information.',
              link: '/education',
              delay: '1.2s'
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover-lift animate-fade-in"
              style={{ animationDelay: feature.delay }}
              onClick={() => navigate(feature.link)}
            >
              <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
