import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Gift, Users, Sparkles, Camera, MapPin, Calendar, Star } from "lucide-react";

const partyImages = [
  "https://ext.same-assets.com/445690581/171196731.jpeg",
  "https://ext.same-assets.com/445690581/161189084.jpeg",
  "https://ext.same-assets.com/445690581/872023934.jpeg",
  "https://ext.same-assets.com/445690581/3996472052.jpeg",
  "https://ext.same-assets.com/445690581/1869182630.jpeg"
];



export default function BirthdayParties() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/3578203662.jpeg')`
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Art Birthday Parties
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Create unforgettable memories in our private 1,500 sq ft party hall at Ashm ARTorium, Medina.
            Professional art instruction, all supplies included, and customizable themes make every celebration special!
          </p>

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full mb-4">
            <MapPin className="h-4 w-4" />
            <a
              href="https://maps.app.goo.gl/M7oJUkWekf6oT14w8"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              825 Meander Ct, Medina, MN • 1,500 sq ft Private Hall
            </a>
          </div>

          {/* Seasonal Discount Alert */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-800">🥳 Fall Discount Offer!</span>
            </div>
            <p className="text-sm text-orange-700">
              Book any available date this fall • Limited-time seasonal offer
            </p>
          </div>
        </div>

        {/* Party Photos Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {partyImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={image}
                alt={`Birthday party activity ${index + 1}`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Party Packages -> Replaced with single CTA button */}
        <div className="text-center mb-12">
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
            <Link href="/parties">View Party Packages & Details</Link>
          </Button>
        </div>

        {/* Why Choose Us - Simplified */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose Ashm ARTorium?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <Camera className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h4 className="font-medium text-gray-900 mb-2">Private Hall</h4>
              <p className="text-sm text-gray-600">1,500 sq ft dedicated space</p>
            </div>
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h4 className="font-medium text-gray-900 mb-2">Professional Instruction</h4>
              <p className="text-sm text-gray-600">2-hour guided art sessions</p>
            </div>
            <div className="text-center">
              <Sparkles className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h4 className="font-medium text-gray-900 mb-2">Custom Themes</h4>
              <p className="text-sm text-gray-600">Taylor Swift, Harry Potter & more</p>
            </div>
            <div className="text-center">
              <Gift className="h-8 w-8 mx-auto mb-3 text-purple-600" />
              <h4 className="font-medium text-gray-900 mb-2">All Supplies</h4>
              <p className="text-sm text-gray-600">Completely stress-free</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/parties">
                <Calendar className="h-4 w-4 mr-2" />
                View All Packages
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
              <Link href="/contact?subject=Birthday Party Custom Quote">
                Custom Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
