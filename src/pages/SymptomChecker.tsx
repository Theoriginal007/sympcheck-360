
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SymptomCheckerComponent from '@/components/symptom-checker/SymptomChecker';

const SymptomChecker = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow">
        <SymptomCheckerComponent />
      </main>
      <Footer />
    </div>
  );
};

export default SymptomChecker;
