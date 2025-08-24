import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/2060477584.jpeg')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Meet Ashm Verma
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              An artist passionate about blending the boundaries between painting and sculpture to create
              immersive, three-dimensional artworks that spark imagination and emotion. Welcome to my world
              of texture, depth, and transformative creativity.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-700">Three-Dimensional Mixed Media Artist</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-700">International Art Educator</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-700">Over 1,000 Children Taught Globally</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800">
                <Link href="/shop">View My Artwork</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>

          {/* Artist Portrait */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-lg shadow-2xl">
              <img
                src="https://ext.same-assets.com/445690581/1489321268.jpeg"
                alt="Ashm Verma in her art studio"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating quote */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg max-w-sm">
              <blockquote className="text-gray-700 italic mb-2">
                "Art that speaks, inspires and transforms!"
              </blockquote>
              <cite className="text-sm text-gray-500">— Ashm's Studio Motto</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
