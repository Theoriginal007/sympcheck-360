
// ConsultationTypeSelector.tsx
// Component for selecting the type of consultation (video, audio, text)

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, MessageSquare, Phone } from 'lucide-react';

interface ConsultationTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ConsultationTypeSelector = ({ value, onChange }: ConsultationTypeSelectorProps) => {
  return (
    <Tabs defaultValue={value} onValueChange={onChange}>
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
  );
};

export default ConsultationTypeSelector;
