import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar, Clock, Users, Palette, Star, DollarSign, BookOpen } from "lucide-react";

const classImages = [
  "https://ext.same-assets.com/445690581/385611733.jpeg",
  "https://ext.same-assets.com/445690581/2095320856.jpeg",
  "https://ext.same-assets.com/445690581/213612860.jpeg",
  "https://ext.same-assets.com/445690581/309427705.jpeg",
  "https://ext.same-assets.com/445690581/3517334407.jpeg"
];

// Real art forms taught
const artForms = [
  "3D Sculpting",
  "Texturing",
  "3D Canvas Painting",
  "Sketching",
  "Charcoal Drawing",
  "Illustration Drawing",
  "Decoupage",
  "Sculpture Paintings",
  "Impasto Knife Art",
  "Glass Painting",
  "Acrylic Painting",
  "Relief Work"
];

// Real class options with pricing
const classOptions = [
  {
    title: "Demo Class",
    description: "Try before you commit! Experience our teaching style and see if it's the right fit for you.",
    price: "$45",
    duration: "1 hour",
    badge: "Try First",
    color: "bg-blue-100 text-blue-800"
  },
  {
    title: "4-Week Program",
    description: "Perfect for beginners. Learn fundamental art techniques with professional guidance.",
    price: "$135",
    priceBreakdown: "$10 enrollment + $125",
    duration: "4 classes",
    badge: "Popular",
    color: "bg-green-100 text-green-800"
  },
  {
    title: "8-Week Program",
    description: "Advanced learning with discounted pricing. Master multiple art forms and techniques.",
    price: "$245",
    priceBreakdown: "$10 enrollment + $235",
    originalPrice: "$260",
    duration: "8 classes",
    badge: "Best Value",
    color: "bg-purple-100 text-purple-800"
  }
];

export default function ClassesSection() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/1707968856.jpeg')`
        }}
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Weekly Art Classes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            Learn various art forms with professional instruction. From 3D sculpting to illustration drawing,
            develop your artistic skills in our inspiring studio environment.
          </p>

          {/* Enrollment Alert */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 border border-green-200 px-6 py-3 rounded-full">
            <Star className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">Enrollment Open for Summer-Fall Classes!</span>
          </div>
        </div>

        {/* Class Photos Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {classImages.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src={image}
                alt={`Art class activity ${index + 1}`}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Art Forms Taught */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            Art Forms You'll Learn
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {artForms.map((artForm, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-gray-900">{artForm}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {classOptions.map((classInfo, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {index === 0 && <BookOpen className="h-8 w-8 text-blue-600" />}
                  {index === 1 && <Calendar className="h-8 w-8 text-green-600" />}
                  {index === 2 && <Star className="h-8 w-8 text-purple-600" />}
                  <Badge className={classInfo.color}>
                    {classInfo.badge}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {classInfo.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {classInfo.description}
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {classInfo.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    Small group classes
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl font-bold text-gray-900">
                          {classInfo.price}
                        </span>
                        {classInfo.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            {classInfo.originalPrice}
                          </span>
                        )}
                      </div>
                      {classInfo.priceBreakdown && (
                        <p className="text-xs text-gray-500">{classInfo.priceBreakdown}</p>
                      )}
                    </div>
                    <Button asChild className="bg-gray-900 hover:bg-gray-800">
                      <Link href={`/contact?subject=${encodeURIComponent(`${classInfo.title} Enrollment`)}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                What's Included in Every Class
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                  All art supplies and materials provided
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                  Professional instruction and guidance
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                  Learn multiple art techniques and forms
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                  Take-home artwork, once completed
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3 mt-2"></span>
                  Flexible once or twice weekly options
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Class Schedule Options
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-900 mb-2">Available Time Slots:</p>
                  <div className="grid grid-cols-1 gap-1 text-gray-600">
                    <span>• Monday 5:00-6:00 PM</span>
                    <span>• Tuesday 5:00-6:00 PM</span>
                    <span>• Tuesday 6:30-7:30 PM</span>
                    <span>• Wednesday 3:30-4:30 PM</span>
                    <span>• Wednesday 4:30-5:30 PM</span>
                    <span>• Wednesday 5:30-6:30 PM</span>
                    <span>• Friday 3:30-4:30 PM</span>
                    <span>• Friday 5:00-6:00 PM</span>
                    <span>• Saturday 10:00-11:00 AM</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button asChild size="lg" className="w-full bg-gray-900 hover:bg-gray-800">
                    <Link href="/contact?subject=Weekly Art Class Schedule Inquiry">Contact for Enrollment & Schedule</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
