
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';
import TestimonialSection from '@/components/home/TestimonialSection';
import HealthDashboard from '@/components/health-dashboard/HealthDashboard';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

/**
 * Landing page component that showcases the app's main features
 * and provides navigation to other sections
 */
const Index = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero section with main call-to-action */}
        <Hero />
        
        {/* Dashboard preview section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-health-primary to-health-accent">Experience Our AI-Powered Health Dashboard</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Monitor your vital health metrics, track progress, and receive personalized insights to improve your wellbeing.
            </p>
            <div className="bg-gradient-to-br from-health-primary/5 to-health-secondary/5 p-8 rounded-xl shadow-lg">
              <HealthDashboard />
            </div>
            <div className="mt-10">
              <Button 
                size="lg" 
                className="bg-health-primary hover:bg-health-primary/90"
                asChild
              >
                <Link to="/dashboard">
                  Access Full Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features showcase section */}
        <Features />
        
        {/* Symptom checker section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-health-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-health-accent/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-health-primary to-health-accent">AI-Powered Symptom Checker</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Our advanced AI system analyzes your symptoms and provides guidance based on the latest medical knowledge, adapted for Kenyan healthcare context.
            </p>
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-semibold mb-6 text-health-primary">How It Works</h3>
                  <ul className="space-y-6">
                    {[
                      "Describe your symptoms in detail",
                      "Our AI analyzes your input using localized medical data",
                      "Receive personalized health recommendations",
                      "Connect with healthcare professionals if needed"
                    ].map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-health-primary text-white flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <span className="font-medium">{step}</span>
                          {index === 1 && (
                            <div className="mt-1 flex flex-wrap gap-2">
                              <span className="text-xs bg-health-primary/10 text-health-primary px-2 py-0.5 rounded-full">Kenyan Healthcare Context</span>
                              <span className="text-xs bg-health-secondary/10 text-health-secondary px-2 py-0.5 rounded-full">Multilingual Support</span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button 
                      className="bg-health-primary hover:bg-health-primary/90"
                      asChild
                    >
                      <Link to="/symptom-checker">
                        Try Symptom Checker
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-health-primary/5 to-health-secondary/5 p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-left mb-4">
                    <h4 className="font-medium text-gray-900">Describe your symptoms</h4>
                    <p className="text-sm text-gray-500">Be specific about when they started and their severity</p>
                  </div>
                  <textarea 
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-health-primary focus:border-health-primary mb-4" 
                    rows={4}
                    placeholder="I've been experiencing headaches for the past three days, primarily in the morning..."
                  ></textarea>
                  <Button 
                    className="w-full bg-health-primary hover:bg-health-primary/90 py-2.5"
                    asChild
                  >
                    <Link to="/symptom-checker">
                      Analyze Symptoms
                    </Link>
                  </Button>
                  <div className="mt-4 bg-white/50 backdrop-blur-sm p-3 rounded-lg border border-health-primary/10">
                    <h5 className="font-medium text-sm mb-2 text-health-primary">Key Benefits</h5>
                    <ul className="space-y-2">
                      {["Privacy protected", "Culturally relevant", "92% accuracy rate"].map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-health-success mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Statistics section */}
        <Stats />
        
        {/* Consultation options section */}
        <section className="py-24 bg-gradient-to-br from-health-primary to-health-secondary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Consult with Healthcare Professionals</h2>
            <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
              Connect with qualified doctors and healthcare providers through secure virtual consultations, no matter where you are in Kenya.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Text Consultations",
                  description: "Chat with healthcare providers through secure messaging",
                  price: "KSh 300",
                  features: ["24/7 availability", "Low bandwidth friendly", "Prescription delivery"]
                },
                {
                  title: "Audio Consultations",
                  description: "Speak directly with doctors through voice calls",
                  price: "KSh 500",
                  features: ["Clear communication", "Network-optimized", "Follow-up included"]
                },
                {
                  title: "Video Consultations",
                  description: "Face-to-face virtual appointments with specialists",
                  price: "KSh 800",
                  features: ["Visual assessment", "Specialist options", "Digital records"]
                }
              ].map((option, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl hover:bg-white/15 transition-colors">
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="opacity-90 mb-4">{option.description}</p>
                  <p className="text-2xl font-bold mb-4">{option.price}</p>
                  <ul className="text-sm space-y-2 mb-6">
                    {option.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-white/80" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full border-white text-white hover:bg-white hover:text-health-primary"
                    asChild
                  >
                    <Link to="/consultations">
                      Book Now
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <TestimonialSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
