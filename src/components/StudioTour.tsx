import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Camera,
  Palette,
  Users,
  Lightbulb
} from "lucide-react";

const studioImages = [
  {
    src: "https://ext.same-assets.com/445690581/1489321268.jpeg",
    title: "Main Studio Space",
    description: "A bright, inspiring workspace filled with natural light and creative energy"
  },
  {
    src: "https://ext.same-assets.com/445690581/385611733.jpeg",
    title: "Class Area",
    description: "Comfortable seating and workspace for up to 12 students"
  },
  {
    src: "https://ext.same-assets.com/445690581/213612860.jpeg",
    title: "Supply Station",
    description: "Fully stocked with professional-grade art materials and tools"
  },
  {
    src: "https://ext.same-assets.com/445690581/309427705.jpeg",
    title: "Gallery Wall",
    description: "Showcasing student artwork and inspiring examples"
  }
];

export default function StudioTour() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/3631165972.jpeg')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Welcome to My Studio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Step inside Ashm ARTorium, where creativity flows freely and artistic dreams come to life.
            This is more than just a workspace—it's a sanctuary for imagination and self-expression.
          </p>
        </div>

        {/* Studio Location Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center p-6 border-0 shadow-lg">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
              <p className="text-gray-600 text-sm">
                825 Meander Ct<br />
                Medina, MN 55446
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Studio Hours</h4>
              <p className="text-gray-600 text-sm">
                Tue-Sat: 10AM-6PM<br />
                Sunday: 12PM-5PM
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Capacity</h4>
              <p className="text-gray-600 text-sm">
                Up to 16 people<br />
                Intimate class sizes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Studio Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {studioImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="font-semibold mb-1">{image.title}</h4>
                <p className="text-sm text-gray-200">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Features */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Studio Features & Amenities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-600" />
                Art Supplies & Materials
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Professional acrylic and oil paints
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Variety of brushes and painting tools
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Canvas, paper, and mixed media surfaces
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                  Sculpting and texture materials
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Workspace Features
              </h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Natural lighting with full-spectrum LED backup
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Ventilation system for safe material use
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Easy-clean surfaces and protective equipment
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  Comfortable seating and adjustable easels
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Visit Studio CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Visit the Studio?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the creative atmosphere firsthand! Schedule a studio visit, book a class,
            or simply stop by to see current artwork and meet the artist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800">
              <Link href="/classes">
                <Camera className="h-4 w-4 mr-2" />
                Book a Class
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
              <Link href="/contact">
                <MapPin className="h-4 w-4 mr-2" />
                Schedule Studio Visit
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
