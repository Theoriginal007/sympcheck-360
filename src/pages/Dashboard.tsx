
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HealthDashboard from '@/components/health-dashboard/HealthDashboard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Your Health Dashboard</h1>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Monitor your vital health metrics, track progress, and receive personalized insights to improve your wellbeing.
          </p>
          <HealthDashboard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
