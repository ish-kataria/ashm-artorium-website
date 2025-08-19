import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Wine, Calendar, Clock, Users, Palette, Heart } from "lucide-react";

const sipPaintImages = [
  "https://ext.same-assets.com/445690581/930475912.jpeg",
  "https://ext.same-assets.com/445690581/601611466.jpeg",
  "https://ext.same-assets.com/445690581/1604824297.jpeg",
  "https://ext.same-assets.com/445690581/1490725869.jpeg"
];

export default function SipAndPaint() {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-orange-50 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/3728144514.jpeg')`
        }}
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sip & Paint Events
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Unwind with friends while creating beautiful art! Our relaxing evening sessions combine
            guided painting instruction with a social atmosphere. Perfect for date nights, girls' nights,
            or team building events. All skill levels welcome!
          </p>
        </div>

        {/* Event Photos Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {sipPaintImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={image}
                alt={`Sip and paint event ${index + 1}`}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Upcoming Events
          </h3>
          <div className="text-center">
            <Card className="border-0 shadow-lg bg-white max-w-md mx-auto">
              <CardContent className="p-8">
                <Wine className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  No Events Currently Scheduled
                </h4>
                <p className="text-gray-600 mb-6">
                  Check back soon for new sip & paint events, or contact us to inquire about scheduling a private event for your group!
                </p>
                <Button asChild className="bg-amber-600 hover:bg-amber-700">
                  <Link href="/contact?subject=Sip and Paint Event Inquiry">
                    <Calendar className="h-4 w-4 mr-2" />
                    Contact for Events
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="bg-white rounded-lg p-8 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-amber-600" />
                What's Included
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Canvas and all painting supplies
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Instruction from professional artist
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-3"></span>
                  Take home your masterpiece when finished
                </li>
              </ul>
            </div>

            <div className="text-center space-y-4">
              <div className="bg-amber-100 rounded-lg p-4">
                <h4 className="font-semibold text-amber-900 mb-2">Private Events</h4>
                <p className="text-sm text-amber-800">
                  Book a private sip & paint for your group of 8+ people.
                  Perfect for bachelorette parties, corporate events, or special celebrations!
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-amber-600 hover:bg-amber-700">
                  <Link href="/events">View All Events</Link>
                </Button>
                <Button asChild variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                  <Link href="/contact">Private Event Inquiry</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
