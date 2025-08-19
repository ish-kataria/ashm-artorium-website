import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Gift, Users, Clock, Sparkles, Camera, Cake, MapPin, Calendar, Star, Palette, Scissors } from "lucide-react";

const partyImages = [
  "https://ext.same-assets.com/445690581/171196731.jpeg",
  "https://ext.same-assets.com/445690581/161189084.jpeg",
  "https://ext.same-assets.com/445690581/872023934.jpeg",
  "https://ext.same-assets.com/445690581/3996472052.jpeg",
  "https://ext.same-assets.com/445690581/1869182630.jpeg"
];

// Real party packages based on Ashm's pricing
const partyPackages = [
  {
    name: "Canvas Painting / Pottery Painting",
    type: "Weekend Party",
    duration: "2 hours",
    guests: "8-18 kids (8 minimum)",
    price: "$46",
    regularPrice: "$49",
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
    price: "$48",
    regularPrice: "$49",
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
    price: "$49",
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

const timeSlots = {
  weekend: ["2-4 PM", "3-5 PM", "4-6 PM", "5-7 PM", "Sun: 12-2 PM"],
  weekday: ["10 AM-12 PM", "11 AM-1 PM", "12-2 PM", "3-5 PM", "6-8 PM"]
};

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

          {/* August Discount Alert */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="h-5 w-5 text-orange-600" />
              <span className="font-semibold text-orange-800">🥳 August Discount Offer!</span>
            </div>
            <p className="text-sm text-orange-700">
              Book any available date in August or September 2025 • Offer ends August 15
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

        {/* Party Packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {partyPackages.map((pkg, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  {index === 2 ? <Scissors className="h-8 w-8 text-purple-600" /> : <Palette className="h-8 w-8 text-purple-600" />}
                  <div className="flex gap-2">
                    {pkg.discount && (
                      <Badge className="bg-orange-100 text-orange-800">Discount Price</Badge>
                    )}
                    {pkg.popular && (
                      <Badge className="bg-purple-100 text-purple-800">All Ages</Badge>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {pkg.name}
                </h3>
                <p className="text-sm text-purple-600 font-medium mb-4">{pkg.type}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {pkg.guests}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Includes:</h4>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {pkg.price}
                        </span>
                        <span className="text-sm text-gray-600">{pkg.priceNote}</span>
                        {pkg.regularPrice && pkg.regularPrice !== pkg.price && (
                          <span className="text-sm text-gray-400 line-through">
                            {pkg.regularPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <Link href="/contact?subject=Birthday Party Booking">
                        <Gift className="h-4 w-4 mr-2" />
                        Book Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Time Slots & Upgrade Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Available Time Slots */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Available Time Slots
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Weekend (Sat/Sun):</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.weekend.map((slot, idx) => (
                      <span key={idx} className="text-sm bg-purple-50 text-purple-700 px-3 py-1 rounded">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Weekday (Mon-Fri):</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.weekday.map((slot, idx) => (
                      <span key={idx} className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade & Policies */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-purple-600" />
                Upgrade & Policies
              </h3>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-1">3-Hour Party Upgrade</h4>
                  <p className="text-sm text-purple-700">Extend your party for just <span className="font-bold">$99</span></p>
                </div>

                <div className="text-sm text-gray-600 space-y-2">
                  <p>• Final kid count must be confirmed 5 days prior with full payment</p>
                  <p>• Additional kids after final count: $5 extra per child</p>
                  <p>• No refunds for cancellations after final count is locked</p>
                  <p>• Can add more kids up to 5 days before party date</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* What You Can Bring & Why Choose Us */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Cake className="h-6 w-6 mr-2 text-purple-600" />
                What You Can Bring
              </h3>
              <ul className="space-y-2 text-gray-600">
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

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">Custom Themes Available:</h4>
                <p className="text-sm text-gray-600">
                  Floral, Scenery, Abstract, Taylor Swift, Harry Potter, Unicorns, and more!
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Why Choose Ashm ARTorium?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <Camera className="h-5 w-5 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                  Private 1,500 sq ft party hall in Medina
                </li>
                <li className="flex items-start">
                  <Users className="h-5 w-5 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                  Professional 2-hour guided instruction
                </li>
                <li className="flex items-start">
                  <Sparkles className="h-5 w-5 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                  Choice between canvas painting or 3D texturing
                </li>
                <li className="flex items-start">
                  <Gift className="h-5 w-5 mr-3 mt-0.5 text-purple-600 flex-shrink-0" />
                  All art supplies included - stress-free for parents
                </li>
              </ul>

              <div className="mt-6 text-center">
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/contact?subject=Birthday Party Custom Quote">
                    Request Custom Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
