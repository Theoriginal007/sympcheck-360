
// BookingForm.tsx
// Component for handling the booking process including doctor selection, scheduling, and details

import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, CheckCircle2, User, CalendarIcon, Clock, Video } from 'lucide-react';
import DoctorCard from './DoctorCard';
import TimeSlotPicker from './TimeSlotPicker';

// Mock data for doctors - making all available
const doctors = [
  { id: 1, name: "Dr. Sarah Kimani", specialty: "General Practitioner", image: "https://i.pravatar.cc/150?img=32", available: true, rating: 4.8, experience: "8 years" },
  { id: 2, name: "Dr. James Ouma", specialty: "Pediatrician", image: "https://i.pravatar.cc/150?img=60", available: true, rating: 4.7, experience: "12 years" },
  { id: 3, name: "Dr. Lucy Njeri", specialty: "Cardiologist", image: "https://i.pravatar.cc/150?img=40", available: true, rating: 4.9, experience: "15 years" },
  { id: 4, name: "Dr. Michael Wafula", specialty: "Dermatologist", image: "https://i.pravatar.cc/150?img=52", available: true, rating: 4.6, experience: "6 years" },
];

// Mock data for time slots
const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

interface BookingFormProps {
  consultationType: string;
  onBookingComplete: (bookingDetails: any) => void;
}

const BookingForm = ({ consultationType, onBookingComplete }: BookingFormProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleBookAppointment = () => {
    if (bookingStep < 3) {
      setBookingStep(bookingStep + 1);
    } else {
      // Process the final booking
      setIsProcessing(true);
      
      // Simulate API call delay
      setTimeout(() => {
        const selectedDoctorData = doctors.find(d => d.id === selectedDoctor);
        
        // Create booking details object
        const details = {
          doctor: selectedDoctorData,
          date: date,
          time: selectedTime,
          type: consultationType,
          reason: reason,
          contactPhone: contactPhone,
          contactEmail: contactEmail,
          bookingId: `HD-${Math.floor(Math.random() * 10000)}-${date?.getFullYear()}`,
          created: new Date()
        };
        
        onBookingComplete(details);
        setIsProcessing(false);
        
        toast({
          title: "Appointment Booked!",
          description: "Your consultation has been successfully scheduled.",
          variant: "default",
        });
      }, 2000);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Book Your Consultation</CardTitle>
        <CardDescription>Follow the steps below to schedule your virtual appointment</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={`step-${bookingStep}`}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="step-1" disabled={bookingStep !== 1}>
              <span className={`mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full ${bookingStep >= 1 ? 'bg-health-primary text-white' : 'bg-gray-200'}`}>1</span>
              Doctor
            </TabsTrigger>
            <TabsTrigger value="step-2" disabled={bookingStep !== 2}>
              <span className={`mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full ${bookingStep >= 2 ? 'bg-health-primary text-white' : 'bg-gray-200'}`}>2</span>
              Schedule
            </TabsTrigger>
            <TabsTrigger value="step-3" disabled={bookingStep !== 3}>
              <span className={`mr-2 inline-flex items-center justify-center w-6 h-6 rounded-full ${bookingStep >= 3 ? 'bg-health-primary text-white' : 'bg-gray-200'}`}>3</span>
              Details
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="step-1">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Select a Healthcare Provider</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctors.map((doctor) => (
                    <DoctorCard
                      key={doctor.id}
                      doctor={doctor}
                      isSelected={selectedDoctor === doctor.id}
                      onSelect={setSelectedDoctor}
                    />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="step-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Select Date and Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Choose a date</p>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="border rounded-md"
                      disabled={(date) => 
                        date < new Date() || 
                        date > new Date(new Date().setDate(new Date().getDate() + 30))
                      }
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Choose a time</p>
                    <TimeSlotPicker
                      timeSlots={timeSlots}
                      selectedTime={selectedTime}
                      onSelectTime={setSelectedTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="step-3">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Consultation Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Consultation</label>
                    <Textarea 
                      placeholder="Please describe your health concern briefly" 
                      className="w-full"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                      <Input 
                        type="tel" 
                        placeholder="+254 XXX XXX XXX" 
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input 
                        type="email" 
                        placeholder="you@example.com" 
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Consultation Summary</h4>
                    <ul className="space-y-1 text-sm text-blue-800">
                      <li className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Doctor: {selectedDoctor ? doctors.find(d => d.id === selectedDoctor)?.name : 'Not selected'}
                      </li>
                      <li className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Date: {date ? date.toLocaleDateString() : 'Not selected'}
                      </li>
                      <li className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Time: {selectedTime || 'Not selected'}
                      </li>
                      <li className="flex items-center">
                        <Video className="h-4 w-4 mr-2" />
                        Type: {consultationType.charAt(0).toUpperCase() + consultationType.slice(1)} Consultation
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        {bookingStep > 1 ? (
          <Button
            variant="outline"
            onClick={() => setBookingStep(bookingStep - 1)}
          >
            Back
          </Button>
        ) : (
          <div></div>
        )}
        <Button 
          onClick={handleBookAppointment}
          disabled={
            isProcessing ||
            (bookingStep === 1 && !selectedDoctor) ||
            (bookingStep === 2 && (!date || !selectedTime)) ||
            (bookingStep === 3 && (!reason || !contactPhone || !contactEmail))
          }
          className="bg-health-primary hover:bg-health-primary/90"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : bookingStep === 3 ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirm Booking
            </>
          ) : (
            'Continue'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
