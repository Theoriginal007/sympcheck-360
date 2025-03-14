
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HealthDashboard from '@/components/health-dashboard/HealthDashboard';
import ComingSoonFeatures from '@/components/health-dashboard/ComingSoonFeatures';
import { useToast } from '@/components/ui/use-toast';
import { ArrowUpRight, HandWaving } from 'lucide-react';

/**
 * Dashboard page that includes health monitoring features and
 * placeholders for upcoming AI, wearable integration, and other features
 * as outlined in the project documentation
 */
const Dashboard = () => {
  const { toast } = useToast();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Welcome toast
    toast({
      title: "Welcome to your Health Dashboard",
      description: "Track your health metrics and discover upcoming features",
      icon: <HandWaving className="h-5 w-5 text-health-accent" />,
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-health-primary to-health-accent">
              Your Personal Health Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Monitor your vital health metrics, track progress, and receive personalized insights to improve your wellbeing.
              Our AI-powered platform is designed to reduce unnecessary hospital visits and improve health monitoring.
            </p>
          </div>

          {/* Project scope banner */}
          <div className="bg-gradient-to-r from-health-primary/10 to-health-secondary/10 p-6 rounded-xl mb-12 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3">HealthSphere Project Scope</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-700 mb-4">
                  HealthSphere aims to revolutionize healthcare access in Kenya through innovative technology solutions:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowUpRight className="h-5 w-5 text-health-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Reduce unnecessary hospital visits by 25%</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowUpRight className="h-5 w-5 text-health-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Improve health monitoring by 40% through wearable integration</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowUpRight className="h-5 w-5 text-health-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Increase health literacy by 35% with culturally appropriate materials</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowUpRight className="h-5 w-5 text-health-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Facilitate over 100,000 virtual consultations in the first year</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowUpRight className="h-5 w-5 text-health-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Ensure data security through compliance with the Kenya Data Protection Act</span>
                  </li>
                  <li className="flex items-start">
                    <ArrowUpRight className="h-5 w-5 text-health-primary mr-2 flex-shrink-0 mt-0.5" />
                    <span>Support both English and Swahili languages for improved accessibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <ComingSoonFeatures />
          
          <h2 className="text-3xl font-bold mb-6 text-center">Your Current Health Metrics</h2>
          <HealthDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
