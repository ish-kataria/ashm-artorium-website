"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ShoppingCart, Heart, Eye, ChevronLeft, ChevronRight, Image as ImageIcon, Play } from "lucide-react";
import { useState, useEffect } from "react";
import BookButton from "@/components/BookButton";
import artworkDbService, { Artwork as DbArtwork } from "@/services/artworkDbService";

export default function ArtworkGallery() {
  // Track current media index per artwork id
  const [currentIndex, setCurrentIndex] = useState<Record<string, number>>({});
  const [artworks, setArtworks] = useState<DbArtwork[]>([]);
  const [loading, setLoading] = useState(true);

  // Load artworks (top 3 most recent)
  useEffect(() => {
    const load = async () => {
      try {
        await artworkDbService.initDatabase();
        const all = await artworkDbService.getAllArtworks();
        setArtworks(all.slice(0, 3));
      } catch (e) {
        console.error("Failed to load artworks", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const goPrev = (id: string, total: number) => {
    setCurrentIndex((prev) => {
      const idx = prev[id] ?? 0;
      const next = Math.max(0, idx - 1);
      return { ...prev, [id]: next };
    });
  };

  const goNext = (id: string, total: number) => {
    setCurrentIndex((prev) => {
      const idx = prev[id] ?? 0;
      const next = Math.min(total - 1, idx + 1);
      return { ...prev, [id]: next };
    });
  };

  const renderMedia = (item: { type: "image" | "video"; url: string }, isHovered: boolean) => {
    if (item.type === "image") {
      return (
        <img
          src={item.url}
          alt="artwork media"
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      );
    }
    return (
      <div className="relative">
        <video
          src={item.url}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          muted
          loop
          autoPlay={false}
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => e.currentTarget.pause()}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="bg-white/90 rounded-full p-2">
            <Play className="h-5 w-5 text-gray-900" />
          </div>
        </div>
      </div>
    );
  };

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
          {loading ? (
            <>
              <Card className="animate-pulse h-[420px] bg-gray-100" />
              <Card className="animate-pulse h-[420px] bg-gray-100" />
              <Card className="animate-pulse h-[420px] bg-gray-100" />
            </>
          ) : artworks.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <div className="mx-auto max-w-md">
                <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-6">
                  <ImageIcon className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Artwork coming soon</h3>
                <p className="text-gray-600">This collection is being curated. Please check back shortly for newly featured pieces.</p>
              </div>
            </div>
          ) : (
            artworks.map((artwork) => {
              const idx = currentIndex[artwork.id] ?? 0;
              const total = artwork.media?.length ?? 0;
              const media = total > 0 ? artwork.media[idx] : null;

              return (
                <Card key={artwork.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-0">
                    {/* Image/Video Container with carousel controls */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      {media ? (
                        renderMedia(media, false)
                      ) : (
                        <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
                          <div className="text-center text-gray-400">
                            <ImageIcon className="h-10 w-10 mx-auto mb-2" />
                            <p>No media</p>
                          </div>
                        </div>
                      )}

                      {/* Arrows */}
                      {total > 1 && (
                        <div
                          className="absolute inset-0 flex items-center justify-between px-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-20 pointer-events-none"
                        >
                          <button
                            className={`p-3 md:p-2 rounded-full bg-white/90 hover:bg-white shadow pointer-events-auto ${idx === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={(e) => { e.stopPropagation(); goPrev(artwork.id, total); }}
                            disabled={idx === 0}
                            aria-label="Previous media"
                          >
                            <ChevronLeft className="h-6 w-6 md:h-5 md:w-5 text-gray-900" />
                          </button>
                          <button
                            className={`p-3 md:p-2 rounded-full bg-white/90 hover:bg-white shadow pointer-events-auto ${idx === total - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={(e) => { e.stopPropagation(); goNext(artwork.id, total); }}
                            disabled={idx === total - 1}
                            aria-label="Next media"
                          >
                            <ChevronRight className="h-6 w-6 md:h-5 md:w-5 text-gray-900" />
                          </button>
                        </div>
                      )}

                      {/* Dots */}
                      {total > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                          {artwork.media.map((_, i) => (
                            <button
                              key={i}
                              aria-label={`Go to media ${i + 1}`}
                              className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-white' : 'w-3 bg-white/70 hover:bg-white'}`}
                              onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => ({ ...prev, [artwork.id]: i })); }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Overlay Actions */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-0 pointer-events-none">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white pointer-events-auto" asChild>
                            <Link href={`/artwork/${artwork.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white pointer-events-auto">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Category Badge (removed: not in data) */}

                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {artwork.title}
                      </h3>
                      {/* Additional fields (medium/size) removed: not present in Artwork */}

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-gray-900">
                          ${artwork.price}
                        </span>
                        <BookButton artwork={{
                          id: parseInt(artwork.id) || 0,
                          title: artwork.title,
                          price: artwork.price,
                          category: 'Original Art',
                          medium: artwork.description || 'Mixed Media'
                        }} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
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
