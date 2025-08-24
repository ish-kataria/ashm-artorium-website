"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar as CalendarIcon,
  Users,
  CheckCircle
} from "lucide-react";

// Mock data for available time slots
const availableSlots = {
  "2024-12-20": [
    { time: "10:00 AM", duration: "2 hours", spots: 5, type: "kids-class" },
    { time: "1:00 PM", duration: "2 hours", spots: 3, type: "kids-class" },
    { time: "7:00 PM", duration: "2.5 hours", spots: 8, type: "sip-paint" }
  ],
  "2024-12-21": [
    { time: "10:00 AM", duration: "2 hours", spots: 6, type: "kids-class" },
    { time: "2:00 PM", duration: "3 hours", spots: 0, type: "birthday-party" },
    { time: "6:30 PM", duration: "2.5 hours", spots: 4, type: "sip-paint" }
  ],
  "2024-12-22": [
    { time: "3:30 PM", duration: "1 hour", spots: 7, type: "kids-class" },
    { time: "7:00 PM", duration: "2.5 hours", spots: 12, type: "sip-paint" }
  ],
  "2024-12-27": [
    { time: "10:00 AM", duration: "2 hours", spots: 8, type: "kids-class" },
    { time: "1:00 PM", duration: "2 hours", spots: 6, type: "kids-class" },
    { time: "4:00 PM", duration: "3 hours", spots: 1, type: "birthday-party" }
  ],
  "2024-12-28": [
    { time: "10:00 AM", duration: "2 hours", spots: 4, type: "kids-class" },
    { time: "6:30 PM", duration: "2.5 hours", spots: 10, type: "sip-paint" }
  ],
  "2024-12-29": [
    { time: "2:00 PM", duration: "2.5 hours", spots: 15, type: "sip-paint" },
    { time: "7:00 PM", duration: "2.5 hours", spots: 8, type: "sip-paint" }
  ]
};

export default function BookingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<{
    time: string;
    duration: string;
    spots: number;
    type: string;
  } | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateString = selectedDate ? formatDate(selectedDate) : '';
  const availableSlotsForDate = availableSlots[selectedDateString as keyof typeof availableSlots] || [];

  const getSlotTypeColor = (type: string) => {
    switch (type) {
      case 'kids-class':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'birthday-party':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'sip-paint':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSlotTypeName = (type: string) => {
    switch (type) {
      case 'kids-class':
        return 'Kids Class';
      case 'birthday-party':
        return 'Birthday Party';
      case 'sip-paint':
        return 'Sip & Paint';
      default:
        return 'Class';
    }
  };

  // Check if a date has available slots
  const hasAvailableSlots = (date: Date) => {
    const dateString = formatDate(date);
    const slots = availableSlots[dateString as keyof typeof availableSlots];
    return slots && slots.some(slot => slot.spots > 0);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Select Date & Time
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Choose Date</h4>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                className="rounded-md border"
                modifiers={{
                  available: (date) => hasAvailableSlots(date),
                  booked: (date) => {
                    const dateString = formatDate(date);
                    const slots = availableSlots[dateString as keyof typeof availableSlots];
                    return slots && slots.every(slot => slot.spots === 0);
                  }
                }}
                modifiersStyles={{
                  available: {
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    fontWeight: 'bold'
                  },
                  booked: {
                    backgroundColor: '#fef2f2',
                    color: '#dc2626',
                    textDecoration: 'line-through'
                  }
                }}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
              />

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-200 rounded"></div>
                  <span>Available dates</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-200 rounded"></div>
                  <span>Fully booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <span>No classes scheduled</span>
                </div>
              </div>
            </div>

            {/* Available Time Slots */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">
                Available Times {selectedDate && `for ${selectedDate.toLocaleDateString()}`}
              </h4>

              {availableSlotsForDate.length > 0 ? (
                <div className="space-y-3">
                  {availableSlotsForDate.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      disabled={slot.spots === 0}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedSlot === slot
                          ? 'border-gray-900 bg-gray-50'
                          : slot.spots === 0
                          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">{slot.time}</span>
                        </div>
                        <Badge className={getSlotTypeColor(slot.type)}>
                          {getSlotTypeName(slot.type)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Duration: {slot.duration}</span>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>
                            {slot.spots === 0 ? 'Fully Booked' : `${slot.spots} spots left`}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-3 opacity-30" />
                  <p>No classes available on this date</p>
                  <p className="text-sm">Please select another date</p>
                </div>
              )}
            </div>
          </div>

          {/* Selected Slot Summary */}
          {selectedSlot && (
            <div className="mt-6 border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-3">Selected Time Slot</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">
                    {selectedDate?.toLocaleDateString()} at {selectedSlot.time}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-green-700">
                  <span>{getSlotTypeName(selectedSlot.type)} - {selectedSlot.duration}</span>
                  <span>{selectedSlot.spots} spots remaining</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
