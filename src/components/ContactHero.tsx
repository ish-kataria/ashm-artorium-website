import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Heart
} from "lucide-react";

export default function ContactHero() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50 relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/2060477584.jpeg')`
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Let's Create Something Together
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
          I'd love to hear from you! Whether you have questions about classes, want to discuss
          a commission, or simply want to chat about art, I'm here to help.
        </p>

        {/* Quick Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <Phone className="h-6 w-6 text-green-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">Call Me</p>
            <a href="tel:+17636077480" className="text-xs text-gray-600 hover:text-green-600 transition-colors">(763) 607-7480</a>
          </div>

          <div className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <Mail className="h-6 w-6 text-blue-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">Email Me</p>
            <a href="mailto:ashmverma@gmail.com" className="text-xs text-gray-600 hover:text-blue-600 transition-colors">ashmverma@gmail.com</a>
          </div>

          <div className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <MapPin className="h-6 w-6 text-purple-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">Visit Studio</p>
            <p className="text-xs text-gray-600">Medina, MN</p>
          </div>

          <div className="flex flex-col items-center p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <Clock className="h-6 w-6 text-orange-600 mb-2" />
            <p className="text-sm font-medium text-gray-900">Response Time</p>
            <p className="text-xs text-gray-600">Within 24 hours</p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Heart className="h-4 w-4 text-red-500" />
          <span>I personally read and respond to every message</span>
        </div>
      </div>
    </section>
  );
}
