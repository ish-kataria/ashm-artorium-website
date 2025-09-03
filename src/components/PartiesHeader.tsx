import { MapPin, Star } from "lucide-react";

export default function PartiesHeader() {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/3578203662.jpeg')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Birthday Party Packages
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Choose the perfect package for an unforgettable celebration! All packages include
          professional instruction, art supplies, and use of our private 1,500 sq ft party hall.
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
        <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-lg p-4 max-w-lg mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="h-5 w-5 text-orange-600" />
            <span className="font-semibold text-orange-800">🥳 Fall Discount Offer!</span>
          </div>
          <p className="text-sm text-orange-700">
            Book any available date this fall • Limited-time seasonal offer
          </p>
        </div>

        {/* Pricing highlight */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 max-w-lg mx-auto mt-6">
          <p className="text-sm font-medium text-gray-900 mb-1">Starting at $46 per child</p>
          <p className="text-xs text-gray-600">
            Weekend packages from $46/kid • Weekday packages from $48/kid • 3D Art packages $49/kid
          </p>
        </div>
      </div>
    </section>
  );
}
