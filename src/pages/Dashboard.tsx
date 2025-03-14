
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HealthDashboard from '@/components/health-dashboard/HealthDashboard';
import ComingSoonFeatures from '@/components/health-dashboard/ComingSoonFeatures';

/**
 * Dashboard page that includes health monitoring features and
 * placeholders for upcoming AI, wearable integration, and other features
 * as outlined in the project documentation
 */
const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Your Health Dashboard</h1>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Monitor your vital health metrics, track progress, and receive personalized insights to improve your wellbeing.
            Our AI-powered platform is designed to reduce unnecessary hospital visits and improve health monitoring.
          </p>

          {/* Project scope banner */}
          <div className="bg-gradient-to-r from-health-primary/10 to-health-secondary/10 p-4 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-2">HealthSphere Project Scope</h2>
            <p className="text-sm text-gray-700">
              HealthSphere aims to reduce unnecessary hospital visits by 25%, improve health monitoring by 40% through wearable 
              integration, increase health literacy by 35% with culturally appropriate materials, and facilitate over 100,000 
              virtual consultations in the first year. The platform complies with the Kenya Data Protection Act, ensuring data security.
            </p>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Coming Soon Features</h2>
          <ComingSoonFeatures />
          
          <h2 className="text-2xl font-semibold mb-4">Current Health Metrics</h2>
          <HealthDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
