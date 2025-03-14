
// TimeSlotPicker.tsx
// Component for selecting time slots in the consultation booking process

import React from 'react';

interface TimeSlotPickerProps {
  timeSlots: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

const TimeSlotPicker = ({ timeSlots, selectedTime, onSelectTime }: TimeSlotPickerProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {timeSlots.map((time) => (
        <div
          key={time}
          className={`border rounded-md p-2 text-center cursor-pointer transition-all ${selectedTime === time ? 'border-health-primary bg-health-primary/5 text-health-primary' : 'border-gray-200 hover:border-health-primary/50'}`}
          onClick={() => onSelectTime(time)}
        >
          {time}
        </div>
      ))}
    </div>
  );
};

export default TimeSlotPicker;
