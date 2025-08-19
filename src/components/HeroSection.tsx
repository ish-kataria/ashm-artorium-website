import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Marble texture background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/2060477584.jpeg')`
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/60" />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Ashm ARTorium
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 mb-4 font-medium">
          Capturing Creativity
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Art that speaks, inspires and transforms!
        </p>

        {/* Artist Studio Image */}
        <div className="mb-12">
          <img
            src="https://ext.same-assets.com/445690581/1489321268.jpeg"
            alt="Ashm in her art studio"
            className="w-full max-w-4xl mx-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800">
            <Link href="/shop">View Original Art</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
