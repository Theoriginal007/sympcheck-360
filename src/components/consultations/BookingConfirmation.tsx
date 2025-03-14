
// BookingConfirmation.tsx
// Component displaying the booking confirmation after successful booking

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
  available: boolean;
  rating: number;
  experience: string;
}

interface BookingDetails {
  doctor: Doctor;
  date: Date | undefined;
  time: string | null;
  type: string;
  reason: string;
  contactPhone: string;
  contactEmail: string;
  bookingId: string;
  created: Date;
}

interface BookingConfirmationProps {
  bookingDetails: BookingDetails;
  onResetBooking: () => void;
}

const BookingConfirmation = ({ bookingDetails, onResetBooking }: BookingConfirmationProps) => {
  const navigate = useNavigate();

  return (
    <Card className="shadow-md">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
          <CheckCheck className="h-10 w-10 text-green-600" />
        </div>
        <CardTitle>Booking Confirmed!</CardTitle>
        <CardDescription>Your consultation has been successfully scheduled</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-medium text-lg mb-4">Appointment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Booking ID</p>
              <p className="font-medium">{bookingDetails?.bookingId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Booking Date</p>
              <p className="font-medium">{bookingDetails?.created.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Doctor</p>
              <p className="font-medium">{bookingDetails?.doctor?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Specialty</p>
              <p className="font-medium">{bookingDetails?.doctor?.specialty}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Appointment Date</p>
              <p className="font-medium">{bookingDetails?.date?.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Appointment Time</p>
              <p className="font-medium">{bookingDetails?.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Consultation Type</p>
              <p className="font-medium">{bookingDetails?.type.charAt(0).toUpperCase() + bookingDetails?.type.slice(1)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Contact Details</p>
              <p className="font-medium">{bookingDetails?.contactPhone}</p>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-medium text-lg mb-2">What's Next?</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-health-primary text-white flex items-center justify-center mr-2 mt-0.5 text-xs">1</span>
              <span>You'll receive a confirmation SMS and email with your appointment details.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-health-primary text-white flex items-center justify-center mr-2 mt-0.5 text-xs">2</span>
              <span>15 minutes before your scheduled time, you'll get a notification with a link to join.</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-health-primary text-white flex items-center justify-center mr-2 mt-0.5 text-xs">3</span>
              <span>Make sure your device has a working camera and microphone for the consultation.</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="outline" 
          className="mr-4"
          onClick={onResetBooking}
        >
          Book Another Appointment
        </Button>
        <Button 
          className="bg-health-primary hover:bg-health-primary/90"
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingConfirmation;
