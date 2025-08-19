"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Users,
  Clock,
  DollarSign,
  Gift,
  Wine,
  Calendar,
  Star,
  BookOpen,
  Brush
} from "lucide-react";

interface ClassData {
  name: string;
  description: string;
  price: string;
  time: string;
  schedule: string;
  priceBreakdown?: string;
  originalPrice?: string;
  popular?: boolean;
}

// Real class data based on Ashm's information
const classTypes = [
  {
    id: 1,
    type: "Demo Class",
    description: "Try before you commit! Experience our teaching style and see if it's the right fit for you.",
    icon: BookOpen,
    color: "bg-blue-600",
    duration: "1 hour",
    groupSize: "Individual attention",
    pricing: "$45",
    classes: [
      {
        name: "Demo Class",
        description: "Experience our professional art instruction and see what techniques you'd like to learn.",
        price: "45",
        time: "By appointment",
        schedule: "Flexible scheduling available"
      } as ClassData
    ]
  },
  {
    id: 2,
    type: "Weekly Art Classes",
    description: "Regular weekly instruction in various art forms. Choose once or twice weekly sessions.",
    icon: Palette,
    color: "bg-purple-600",
    duration: "1 hour per session",
    groupSize: "Small groups",
    pricing: "From $135",
    classes: [
      {
        name: "4-Week Program",
        description: "Perfect for beginners. Learn fundamental techniques with $10 enrollment fee + $125 for 4 classes.",
        price: "135",
        priceBreakdown: "$10 enrollment + $125",
        time: "Various slots",
        schedule: "Once or twice weekly options"
      } as ClassData,
      {
        name: "8-Week Program",
        description: "Advanced learning with discounted pricing. Master multiple art forms with $10 enrollment fee + $235.",
        price: "245",
        priceBreakdown: "$10 enrollment + $235",
        originalPrice: "$260",
        time: "Various slots",
        schedule: "Once or twice weekly options",
        popular: true
      } as ClassData
    ]
  }
];

// Available time slots
interface TimeSlot {
  day: string;
  time: string;
  available: boolean;
}

const timeSlots: TimeSlot[] = [
  { day: "Monday", time: "5:00-6:00 PM", available: true },
  { day: "Tuesday", time: "5:00-6:00 PM", available: true },
  { day: "Tuesday", time: "6:30-7:30 PM", available: true },
  { day: "Wednesday", time: "3:30-4:30 PM", available: true },
  { day: "Wednesday", time: "4:30-5:30 PM", available: true },
  { day: "Wednesday", time: "5:30-6:30 PM", available: true },
  { day: "Friday", time: "3:30-4:30 PM", available: true },
  { day: "Friday", time: "5:00-6:00 PM", available: true },
  { day: "Saturday", time: "10:00-11:00 AM", available: true }
];

// Art forms taught
const artForms = [
  "3D Sculpting", "Texturing", "3D Canvas Painting", "Sketching",
  "Charcoal Drawing", "Illustration Drawing", "Decoupage", "Sculpture Paintings",
  "Impasto Knife Art", "Glass Painting", "Acrylic Painting", "Relief Work"
];

export default function ClassTypeSelector() {
  const [selectedType, setSelectedType] = useState(classTypes[0] || null);
  const [selectedClass, setSelectedClass] = useState(classTypes[0]?.classes?.[0] || null);

  return (
    <div className="space-y-6">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Your Experience</h3>

          {/* Enrollment Alert */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Summer-Fall Enrollment Open!</span>
            </div>
            <p className="text-sm text-green-700">
              Professional instruction in illustration drawing, sketching, 3D sculpting, and much more!
            </p>
          </div>

          {/* Class Type Selection */}
          <div className="space-y-3 mb-6">
            {classTypes.map((type) => {
              const IconComponent = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type);
                    setSelectedClass(type.classes[0]);
                  }}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedType?.id === type.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${type.color} text-white`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <h4 className="font-medium text-gray-900">{type.type}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {type.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {type.groupSize}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      {type.pricing}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Program Options */}
          {selectedType && selectedType.classes.length > 1 && (
            <div className="border-t pt-6 mb-6">
              <h4 className="font-medium text-gray-900 mb-4">Program Options</h4>
              <div className="space-y-3">
                {selectedType.classes.map((classItem: ClassData, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedClass(classItem)}
                    className={`w-full p-3 rounded-lg border text-left transition-all ${
                      selectedClass?.name === classItem.name
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{classItem.name}</h5>
                      <div className="flex items-center gap-2">
                        {classItem.popular && (
                          <Badge className="bg-purple-100 text-purple-800">Best Value</Badge>
                        )}
                        <Badge variant="secondary">${classItem.price}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{classItem.description}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{classItem.schedule}</span>
                      <span>{classItem.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Available Time Slots */}
          <div className="border-t pt-6 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Available Time Slots for New Enrollment</h4>
            <div className="space-y-2">
              {timeSlots.map((slot, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded border">
                  <span className="font-medium text-green-800">{slot.day}</span>
                  <span className="text-green-700">{slot.time}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All time slots are currently available for new enrollment.
            </p>
          </div>

          {/* Art Forms */}
          <div className="border-t pt-6 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Art Forms You'll Learn</h4>
            <div className="grid grid-cols-2 gap-2">
              {artForms.map((artForm, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-center">
                  <Brush className="h-3 w-3 mr-2 text-purple-600" />
                  {artForm}
                </div>
              ))}
            </div>
          </div>

          {/* Selected Class Summary */}
          {selectedClass && (
            <div className="border-t pt-6 mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Selected Program</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-gray-900">{selectedClass.name}</span>
                  {selectedClass.popular && (
                    <Badge className="bg-purple-100 text-purple-800 text-xs">Best Value</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{selectedClass.description}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">${selectedClass.price}</span>
                      {selectedClass.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">${selectedClass.originalPrice}</span>
                      )}
                    </div>
                    {selectedClass.priceBreakdown && (
                      <p className="text-xs text-gray-500">{selectedClass.priceBreakdown}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t">
                  <p className="text-xs text-gray-600 mb-3">
                    <strong>What's Included:</strong> All art supplies and materials provided
                  </p>
                  <Button asChild className="w-full bg-gray-900 hover:bg-gray-800">
                    <a href="/contact?subject=Weekly Art Class Enrollment">
                      <Calendar className="h-4 w-4 mr-2" />
                      Enroll Now
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
