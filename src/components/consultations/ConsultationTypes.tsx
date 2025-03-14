
/**
 * ConsultationTypes Component
 * 
 * Displays the available consultation types (video, audio, text) with a clean UI.
 * Uses the ConsultationTypeSelector to handle the selection of different consultation options.
 * Supports both English and Swahili (coming soon) to be culturally appropriate for Kenyan users.
 * 
 * @component
 */
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
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
      
      {/* Culturally appropriate alert for Kenya - part of the project scope */}
      <Alert className="mt-6 bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-500" />
        <AlertTitle>HealthSphere Kenya</AlertTitle>
        <AlertDescription className="text-sm">
          All consultations are conducted by licensed Kenyan healthcare professionals. 
          <span className="block mt-1 text-health-primary font-medium">
            Swahili language support coming soon.
          </span>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ConsultationTypes;
