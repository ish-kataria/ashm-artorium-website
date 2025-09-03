import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Palette,
  Heart,
  Users,
  Globe,
  Lightbulb,
  Brush
} from "lucide-react";

export default function ArtistStory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Ashm Verma
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            I'm Ashm Verma, an artist passionate about blending the boundaries between painting and sculpture
            to create immersive, three-dimensional artworks that spark imagination and emotion.
          </p>
        </div>

        {/* Artistic Journey */}
        <div className="space-y-16">
          {/* Creative Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-purple-100 text-purple-800">Artistic Vision</Badge>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Constant Exploration & Innovation
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                My artistic journey has been one of constant exploration—merging form, texture, and depth
                through a wide range of mediums including acrylics, oils, clay, wood, metal, paper, plaster,
                and ceramic. Each piece I create is a unique fusion of sculpture and painting, often on canvas
                or wood, and designed to draw viewers into a deeper emotional and sensory experience.
              </p>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-500">Mixed media specialist</span>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://ext.same-assets.com/445690581/1707968856.jpeg"
                alt="Ashm Verma in her art studio"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Inspiration & Themes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="lg:order-2">
              <Badge className="mb-4 bg-blue-100 text-blue-800">Inspiration</Badge>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Drawing from Life & Emotion
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Inspired by human figures, nature, and expressive themes such as love, balance, moods,
                and hope, my work invites audiences to feel, reflect, and connect. I believe art is a
                powerful tool to reimagine the world around us, and through my work, I aim to inspire
                others to dream and see with new eyes.
              </p>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm text-gray-500">Emotion-driven artistry</span>
              </div>
            </div>
            <div className="lg:order-1">
              <img
                src="https://ext.same-assets.com/445690581/3578203662.jpeg"
                alt="Artistic inspiration and creative process"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Teaching & Community Impact */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-green-100 text-green-800">Education & Community</Badge>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Sharing the Joy of Creativity
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                With years of experience as both a creator and educator, I've had the joy of guiding
                students around the world to explore their own creativity and unlock their imagination.
                As part of giving back to the community, I've also taught the joy of art to over a
                thousand children across the globe—empowering young minds to express themselves and
                see beauty through a creative lens.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-500">Over 1,000 children taught globally</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-500">International teaching experience</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://ext.same-assets.com/445690581/385611733.jpeg"
                alt="Teaching art to children"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Philosophy & Invitation */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-8 text-center">
            <Lightbulb className="h-12 w-12 text-yellow-500 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Art as Transformation
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Whether you're an avid art lover or a curious newcomer, I invite you to dive into this
              journey with me—where every brushstroke, texture, and curve tells a story beyond the surface.
              Let's discover the artist within you and reimagine the world through creativity.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Brush className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-500">Every story matters, every voice is unique</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
