
// HowItWorks.tsx
// Component displaying the consultation booking process steps

import React from 'react';

const HowItWorks = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-4">How It Works</h2>
      <ul className="space-y-4">
        {[
          "Select your preferred consultation type",
          "Choose a healthcare provider from our network",
          "Schedule a convenient date and time",
          "Provide a brief description of your health concern",
          "Complete your booking and receive confirmation"
        ].map((step, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-health-primary text-white flex items-center justify-center mr-3 mt-0.5">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HowItWorks;
