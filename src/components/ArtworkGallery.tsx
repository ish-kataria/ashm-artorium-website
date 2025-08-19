import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import BookButton from "@/components/BookButton";

// Artwork data will come from admin dashboard
const artworks: any[] = [];

export default function ArtworkGallery() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background texture */}
      <div
        className="absolute left-0 w-full h-full bg-cover bg-center opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url('https://ext.same-assets.com/445690581/3631165972.jpeg')`
        }}
      />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Collect Original Artwork
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the emotion and vision of Ashm's original creations. Each piece represents a unique
            artistic journey, available for purchase through our online gallery or during scheduled studio visits.
            Commission options available for custom pieces.
          </p>
        </div>

        {/* Featured Artworks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-0">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white" asChild>
                        <Link href={`/artwork/${artwork.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900">
                    {artwork.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{artwork.medium}</p>
                  <p className="text-sm text-gray-600 mb-4">{artwork.size}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ${artwork.price}
                    </span>
                    <BookButton artwork={artwork} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
            <Link href="/shop">View All Artwork</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
