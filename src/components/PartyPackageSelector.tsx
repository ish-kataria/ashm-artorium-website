"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Palette,
  Users,
  Clock,
  Gift,
  Calendar,
  Star,
  Cake,
  Camera,
  Sparkles,
  Scissors,
  MapPin
} from "lucide-react";

interface PartyPackage {
  name: string;
  type: string;
  duration: string;
  guests: string;
  price: string;
  regularPrice?: string;
  priceNote: string;
  includes: string[];
  discount?: boolean;
  popular?: boolean;
  timeSlots: string[];
}

// Real party packages based on Ashm's pricing
const partyPackages: PartyPackage[] = [
  {
    name: "Canvas Painting / Pottery Painting",
    type: "Weekend Party",
    duration: "2 hours",
    guests: "8-18 kids (8 minimum)",
    price: "46",
    regularPrice: "49",
    priceNote: "per kid",
    includes: [
      "All art supplies provided",
      "Canvas or pottery painting project",
      "2-hour guided instruction",
      "Paint brushes, palettes, acrylic paints",
      "Art tools and knives",
      "Take-home artwork"
    ],
    discount: true,
    timeSlots: ["2-4 PM", "3-5 PM", "4-6 PM", "5-7 PM", "Sun: 12-2 PM"]
  },
  {
    name: "Canvas Painting / Pottery Painting",
    type: "Weekday Party",
    duration: "2 hours",
    guests: "10-18 kids (10 minimum)",
    price: "48",
    regularPrice: "49",
    priceNote: "per kid",
    includes: [
      "All art supplies provided",
      "Canvas or pottery painting project",
      "2-hour guided instruction",
      "Paint brushes, palettes, acrylic paints",
      "Art tools and knives",
      "Take-home artwork"
    ],
    discount: true,
    timeSlots: ["10 AM-12 PM", "11 AM-1 PM", "12-2 PM", "3-5 PM", "6-8 PM"]
  },
  {
    name: "Sculpting / 3D Texture Art",
    type: "Mixed Media Art",
    duration: "2 hours",
    guests: "8-18 kids (8 minimum)",
    price: "49",
    priceNote: "per kid",
    includes: [
      "All art supplies provided",
      "3D sculpting or texture art project",
      "2-hour guided instruction",
      "Mixed media materials",
      "Professional art tools",
      "Take-home artwork"
    ],
    popular: true,
    timeSlots: ["Weekend & Weekday slots available"]
  }
];

// Available time slots
const timeSlots = {
  weekend: ["2-4 PM", "3-5 PM", "4-6 PM", "5-7 PM", "Sun: 12-2 PM"],
  weekday: ["10 AM-12 PM", "11 AM-1 PM", "12-2 PM", "3-5 PM", "6-8 PM"]
};

// Custom themes
const customThemes = [
  "Floral", "Scenery", "Abstract", "Taylor Swift", "Harry Potter", "Unicorns"
];

export default function PartyPackageSelector() {
  const [selectedPackage, setSelectedPackage] = useState(partyPackages[0]);

  return (
    <div className="space-y-6">
      <Card className="sticky top-24">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Select Your Party Package</h3>

          {/* Fall Discount Alert */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-800">Fall Discount Available!</span>
            </div>
            <p className="text-sm text-orange-700">
              Book any available date this fall for special pricing on weekend and weekday packages!
            </p>
          </div>

          {/* Package Selection */}
          <div className="space-y-3 mb-6">
            {partyPackages.map((pkg, index) => (
              <button
                key={index}
                onClick={() => setSelectedPackage(pkg)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedPackage === pkg
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${pkg.popular ? 'bg-purple-600' : pkg.discount ? 'bg-orange-500' : 'bg-pink-500'} text-white`}>
                      {pkg.popular ? <Scissors className="h-4 w-4" /> : <Palette className="h-4 w-4" />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{pkg.name}</h4>
                      <p className="text-sm text-gray-600">{pkg.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {pkg.popular && (
                      <Badge className="bg-purple-100 text-purple-800">All Ages</Badge>
                    )}
                    {pkg.discount && (
                      <Badge className="bg-orange-100 text-orange-800">Discount Price</Badge>
                    )}
                    <Badge variant="secondary">${pkg.price}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {pkg.guests}
                  </div>
                  <div className="flex items-center gap-1">
                    <Gift className="h-3 w-3" />
                    {pkg.priceNote}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Available Time Slots */}
          <div className="border-t pt-6 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Available Time Slots</h4>

            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Weekend (Sat/Sun):</h5>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.weekend.map((slot, idx) => (
                    <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded text-center">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Weekday (Mon-Fri):</h5>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.weekday.map((slot, idx) => (
                    <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded text-center">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Custom Themes */}
          <div className="border-t pt-6 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Custom Themes Available</h4>
            <div className="grid grid-cols-2 gap-2">
              {customThemes.map((theme, index) => (
                <div key={index} className="text-sm text-gray-600 flex items-center">
                  <Sparkles className="h-3 w-3 mr-2 text-pink-500" />
                  {theme}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              And many more! Contact us for custom theme requests.
            </p>
          </div>

          {/* What You Can Bring */}
          <div className="border-t pt-6 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">What You Can Bring</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2"></span>
                Food, cake, disposable plates & glasses
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2"></span>
                Juice, drinks, balloons, birthday banners
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 mt-2"></span>
                Theme decorations (no confetti please)
              </li>
            </ul>
          </div>

          {/* Selected Package Summary */}
          {selectedPackage && (
            <div className="border-t pt-6 mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Selected Package</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-purple-500" />
                  <span className="font-medium text-gray-900">{selectedPackage.name}</span>
                  {selectedPackage.popular && (
                    <Badge className="bg-purple-100 text-purple-800 text-xs">All Ages</Badge>
                  )}
                  {selectedPackage.discount && (
                    <Badge className="bg-orange-100 text-orange-800 text-xs">Discount Price</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{selectedPackage.type} • {selectedPackage.duration} • {selectedPackage.guests}</p>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">${selectedPackage.price}</span>
                      {selectedPackage.regularPrice && (
                        <span className="text-sm text-gray-400 line-through">${selectedPackage.regularPrice}</span>
                      )}
                      <span className="text-sm text-gray-600">{selectedPackage.priceNote}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">What's Included:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {selectedPackage.includes.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </div>

                {/* Upgrade Option */}
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg mb-4">
                  <h5 className="font-semibold text-purple-800 mb-1">3-Hour Party Upgrade</h5>
                  <p className="text-xs text-purple-700">Extend your party for just <span className="font-bold">$99</span></p>
                </div>

                {/* Important Policies */}
                <div className="text-xs text-gray-600 mb-4 space-y-1">
                  <p>• Final kid count must be confirmed 5 days prior with full payment</p>
                  <p>• Additional kids after final count: $5 extra per child</p>
                  <p>• Can add more kids up to 5 days before party date</p>
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1 bg-purple-600 hover:bg-purple-700">
                    <a href="/contact?subject=Birthday Party Booking">
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Now
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                    <a href="/contact?subject=Birthday Party Custom Quote">
                      Custom Quote
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Why Choose Us */}
          <div className="border-t pt-6 mt-6">
            <h4 className="font-medium text-gray-900 mb-4">Why Choose Ashm ARTorium?</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start">
                <Camera className="h-4 w-4 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                Private 1,500 sq ft party hall in Medina
              </li>
              <li className="flex items-start">
                <Users className="h-4 w-4 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                Professional 2-hour guided instruction
              </li>
              <li className="flex items-start">
                <Sparkles className="h-4 w-4 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                Choice between canvas painting or 3D texturing
              </li>
              <li className="flex items-start">
                <Gift className="h-4 w-4 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                All art supplies included - stress-free for parents
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
