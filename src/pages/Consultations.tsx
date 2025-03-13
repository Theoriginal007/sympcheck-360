
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { 
  Video, 
  MessageSquare, 
  Phone, 
  Clock, 
  Calendar as CalendarIcon, 
  User, 
  CheckCircle2, 
  CheckCheck,
  Loader2
} from 'lucide-react';

// Mock data for doctors
const doctors = [
  { id: 1, name: "Dr. Sarah Kimani", specialty: "General Practitioner", image: "https://i.pravatar.cc/150?img=32", available: true, rating: 4.8, experience: "8 years" },
  { id: 2, name: "Dr. James Ouma", specialty: "Pediatrician", image: "https://i.pravatar.cc/150?img=60", available: true, rating: 4.7, experience: "12 years" },
  { id: 3, name: "Dr. Lucy Njeri", specialty: "Cardiologist", image: "https://i.pravatar.cc/150?img=40", available: false, rating: 4.9, experience: "15 years" },
  { id: 4, name: "Dr. Michael Wafula", specialty: "Dermatologist", image: "https://i.pravatar.cc/150?img=52", available: true, rating: 4.6, experience: "6 years" },
];

// Mock data for time slots
const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
];

const Consultations = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [consultationType, setConsultationType] = useState("video");
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
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
        
        setBookingDetails(details);
        setBookingComplete(true);
        setIsProcessing(false);
        
        toast({
          title: "Appointment Booked!",
          description: "Your consultation has been successfully scheduled.",
          variant: "default",
        });
      }, 2000);
    }
  };

  const resetBooking = () => {
    setBookingStep(1);
    setSelectedDoctor(null);
    setSelectedTime(null);
    setReason("");
    setContactPhone("");
    setContactEmail("");
    setBookingComplete(false);
    setBookingDetails(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="bg-gradient-to-br from-health-primary to-health-secondary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Virtual Consultations</h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Connect with qualified healthcare professionals through secure virtual consultations, no matter where you are in Kenya.
            </p>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4">Consultation Types</h2>
                  <Tabs defaultValue="video" onValueChange={setConsultationType}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="video">Video</TabsTrigger>
                      <TabsTrigger value="audio">Audio</TabsTrigger>
                      <TabsTrigger value="text">Text</TabsTrigger>
                    </TabsList>
                    <TabsContent value="video">
                      <div className="flex items-center space-x-4 p-4 bg-health-primary/5 rounded-lg">
                        <Video className="h-10 w-10 text-health-primary" />
                        <div>
                          <h3 className="font-medium">Video Consultation</h3>
                          <p className="text-sm text-gray-600">Face-to-face virtual appointments with specialists</p>
                          <p className="font-medium mt-1">KSh 800</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="audio">
                      <div className="flex items-center space-x-4 p-4 bg-health-primary/5 rounded-lg">
                        <Phone className="h-10 w-10 text-health-primary" />
                        <div>
                          <h3 className="font-medium">Audio Consultation</h3>
                          <p className="text-sm text-gray-600">Speak directly with doctors through voice calls</p>
                          <p className="font-medium mt-1">KSh 500</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="text">
                      <div className="flex items-center space-x-4 p-4 bg-health-primary/5 rounded-lg">
                        <MessageSquare className="h-10 w-10 text-health-primary" />
                        <div>
                          <h3 className="font-medium">Text Consultation</h3>
                          <p className="text-sm text-gray-600">Chat with healthcare providers through secure messaging</p>
                          <p className="font-medium mt-1">KSh 300</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
                
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
              </div>
              
              <div className="lg:col-span-2">
                {!bookingComplete ? (
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
                                  <div
                                    key={doctor.id}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedDoctor === doctor.id ? 'border-health-primary bg-health-primary/5' : 'border-gray-200 hover:border-health-primary/50'} ${!doctor.available ? 'opacity-60' : ''}`}
                                    onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
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
                                        <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${doctor.available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                          {doctor.available ? 'Available' : 'Unavailable'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
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
                                  <div className="grid grid-cols-2 gap-2">
                                    {timeSlots.map((time) => (
                                      <div
                                        key={time}
                                        className={`border rounded-md p-2 text-center cursor-pointer transition-all ${selectedTime === time ? 'border-health-primary bg-health-primary/5 text-health-primary' : 'border-gray-200 hover:border-health-primary/50'}`}
                                        onClick={() => setSelectedTime(time)}
                                      >
                                        {time}
                                      </div>
                                    ))}
                                  </div>
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
                ) : (
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
                        onClick={resetBooking}
                      >
                        Book Another Appointment
                      </Button>
                      <Button 
                        className="bg-health-primary hover:bg-health-primary/90"
                        onClick={() => window.location.href = '/dashboard'}
                      >
                        Go to Dashboard
                      </Button>
                    </CardFooter>
                  </Card>
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
