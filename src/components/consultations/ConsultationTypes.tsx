
/**
 * ConsultationTypes Component
 * 
 * Displays the available consultation types (video, audio, text) with a clean UI.
 * Uses the ConsultationTypeSelector to handle the selection of different consultation options.
 * 
 * @component
 */
import React from 'react';
import ConsultationTypeSelector from './ConsultationTypeSelector';

interface ConsultationTypesProps {
  value: string;
  onChange: (value: string) => void;
}

const ConsultationTypes = ({ value, onChange }: ConsultationTypesProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Consultation Types</h2>
      <ConsultationTypeSelector value={value} onChange={onChange} />
    </div>
  );
};

export default ConsultationTypes;
