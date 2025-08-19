import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, ShoppingBag, MessageCircle, Palette } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Start Your Creative Journey?
        </h2>

        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
          Whether you're looking to explore a new hobby, create something special, or give the
          gift of creativity, I'm here to help you discover the artist within.
        </p>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Book a Class</h3>
            <p className="text-sm opacity-90 mb-4">
              Join one of our regular classes or special events
            </p>
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link href="/contact?subject=Class Schedule Inquiry">View Schedule</Link>
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
            <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Buy Original Art</h3>
            <p className="text-sm opacity-90 mb-4">
              Browse and purchase unique artwork for your space
            </p>
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link href="/shop">Shop Gallery</Link>
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
            <Palette className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Commission Work</h3>
            <p className="text-sm opacity-90 mb-4">
              Request a custom piece tailored to your vision
            </p>
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link href="/contact">Discuss Project</Link>
            </Button>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
            <MessageCircle className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Ask Questions</h3>
            <p className="text-sm opacity-90 mb-4">
              Get in touch with any questions about classes or art
            </p>
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>

        {/* Main CTA */}
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">
            Still Have Questions?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            I'd love to hear from you! Whether you're curious about classes, interested in
            commissioning artwork, or just want to chat about art, don't hesitate to reach out.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                <MessageCircle className="h-5 w-5 mr-2" />
                Get In Touch
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-black bg-white hover:bg-gray-100 hover:text-black">
              <Link href="/contact?subject=First Class Booking">
                <Calendar className="h-5 w-5 mr-2" />
                Book First Class
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
