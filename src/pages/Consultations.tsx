
// Consultations.tsx
// Main page for booking virtual consultations with healthcare providers

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConsultationTypes from '@/components/consultations/ConsultationTypes';
import HowItWorks from '@/components/consultations/HowItWorks';
import BookingForm from '@/components/consultations/BookingForm';
import BookingConfirmation from '@/components/consultations/BookingConfirmation';

const Consultations = () => {
  const [consultationType, setConsultationType] = useState("video");
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const handleBookingComplete = (details: any) => {
    setBookingDetails(details);
    setBookingComplete(true);
  };

  const resetBooking = () => {
    setBookingComplete(false);
    setBookingDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <section className="bg-gradient-to-br from-health-primary to-health-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Virtual Consultations</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Connect with qualified healthcare professionals through secure virtual consultations, no matter where you are in Kenya.
            </p>
          </div>
        </section>
        
        {/* Main content section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left sidebar */}
              <div className="lg:col-span-1">
                <ConsultationTypes 
                  value={consultationType} 
                  onChange={setConsultationType} 
                />
                <HowItWorks />
              </div>
              
              {/* Main booking form area */}
              <div className="lg:col-span-2">
                {!bookingComplete ? (
                  <BookingForm 
                    consultationType={consultationType}
                    onBookingComplete={handleBookingComplete}
                  />
                ) : (
                  <BookingConfirmation 
                    bookingDetails={bookingDetails}
                    onResetBooking={resetBooking}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Consultations;
