
// DoctorCard.tsx
// Component for displaying individual doctor cards in the consultation booking process

import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  available: boolean;
  rating: number;
  experience: string;
}

interface DoctorCardProps {
  doctor: Doctor;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

const DoctorCard = ({ doctor, isSelected, onSelect }: DoctorCardProps) => {
  const { toast } = useToast();

  // Function to navigate to doctor's detail page
  const viewDoctorDetails = (doctorId: number) => {
    // In a real app, this would navigate to a doctor details page
    console.log(`Viewing details for doctor ID: ${doctorId}`);
    toast({
      title: "Doctor Selected",
      description: `You've selected ${doctor.name}`,
    });
  };

  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all ${isSelected ? 'border-health-primary bg-health-primary/5' : 'border-gray-200 hover:border-health-primary/50'}`}
      onClick={() => onSelect(doctor.id)}
    >
      <div className="flex items-center">
        <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h4 className="font-medium">{doctor.name}</h4>
          <p className="text-sm text-gray-600">{doctor.specialty}</p>
          <div className="flex items-center mt-1 text-sm">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="mr-2">{doctor.rating}</span>
            <span className="text-gray-500">• {doctor.experience}</span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block bg-green-100 text-green-800">
            Available
          </span>
          <Button 
            variant="link" 
            className="p-0 h-auto text-health-primary text-xs mt-1"
            onClick={(e) => {
              e.stopPropagation();
              viewDoctorDetails(doctor.id);
            }}
          >
            View Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
