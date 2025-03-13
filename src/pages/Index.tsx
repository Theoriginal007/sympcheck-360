
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import Stats from '@/components/home/Stats';
import TestimonialSection from '@/components/home/TestimonialSection';
import HealthDashboard from '@/components/health-dashboard/HealthDashboard';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        <Hero />
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience Our AI-Powered Health Dashboard</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Monitor your vital health metrics, track progress, and receive personalized insights to improve your wellbeing.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg">
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
        
        <Features />
        
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">AI-Powered Symptom Checker</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Our advanced AI system analyzes your symptoms and provides guidance based on the latest medical knowledge, adapted for Kenyan healthcare context.
            </p>
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-health-primary/5 to-health-secondary/5 p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left">
                  <h3 className="text-2xl font-semibold mb-4">How It Works</h3>
                  <ul className="space-y-4">
                    {[
                      "Describe your symptoms in detail",
                      "Our AI analyzes your input using localized medical data",
                      "Receive personalized health recommendations",
                      "Connect with healthcare professionals if needed"
                    ].map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-health-primary text-white flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="mt-6 bg-health-primary hover:bg-health-primary/90"
                    asChild
                  >
                    <Link to="/symptom-checker">
                      Try Symptom Checker
                    </Link>
                  </Button>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="text-left mb-4">
                    <h4 className="font-medium text-gray-900">Describe your symptoms</h4>
                    <p className="text-sm text-gray-500">Be specific about when they started and their severity</p>
                  </div>
                  <textarea 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-health-primary focus:border-health-primary mb-4" 
                    rows={4}
                    placeholder="I've been experiencing headaches for the past three days, primarily in the morning..."
                  ></textarea>
                  <Button 
                    className="w-full bg-health-primary hover:bg-health-primary/90"
                    asChild
                  >
                    <Link to="/symptom-checker">
                      Analyze Symptoms
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <Stats />
        
        <section className="py-20 bg-gradient-to-br from-health-primary to-health-secondary text-white">
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
                  price: "KSh 300"
                },
                {
                  title: "Audio Consultations",
                  description: "Speak directly with doctors through voice calls",
                  price: "KSh 500"
                },
                {
                  title: "Video Consultations",
                  description: "Face-to-face virtual appointments with specialists",
                  price: "KSh 800"
                }
              ].map((option, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                  <p className="opacity-90 mb-4">{option.description}</p>
                  <p className="text-2xl font-bold mb-4">{option.price}</p>
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
        
        <TestimonialSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
