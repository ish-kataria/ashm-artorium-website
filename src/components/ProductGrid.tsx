"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Heart,
  Eye,
  Grid,
  List,
  Package,
  Video,
  Play,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import BookButton from "@/components/BookButton";
import artworkDbService from "@/services/artworkDbService";

interface ArtworkMedia {
  url: string;
  key: string;
  type: "image" | "video";
  size: number;
}

interface Artwork {
  id: string;
  title: string;
  price: number;
  description?: string;
  media: ArtworkMedia[];
  dateCreated: string;
}

export default function ProductGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  // Load artworks from database
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        const dbArtworks = await artworkDbService.getAllArtworks();
        setArtworks(dbArtworks);
      } catch (error) {
        console.error("Error loading artworks:", error);
      }
    };

    loadArtworks();
  }, []);

  const sortedArtworks = [...artworks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return (
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
      case "featured":
      default:
        return (
          new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
    }
  });

  // Helper function to get cover media (first image or first video)
  const getCoverMedia = (artwork: Artwork) => {
    const firstImage = artwork.media.find((m) => m.type === "image");
    const firstVideo = artwork.media.find((m) => m.type === "video");
    return firstImage || firstVideo || null;
  };

  return (
    <div>
      {/* Header with Sort and View Options */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {artworks.length} Artworks Available
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Handcrafted original pieces by Ashm Verma
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 ${
                viewMode === "grid"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 ${
                viewMode === "list"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {artworks.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto max-w-md">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Artwork Available Yet
            </h3>
            <p className="text-gray-600 mb-6">
              New original artwork will appear here as it becomes available.
              Check back soon or follow us for updates on new pieces!
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Interested in a custom commission?
              </p>
              <Button asChild className="bg-gray-900 hover:bg-gray-800">
                <Link href="/contact?subject=Custom Commission Inquiry">
                  Request Custom Artwork
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`grid gap-10 ${
            viewMode === "grid"
              ? "grid-cols-1 xl:grid-cols-1"
              : "grid-cols-1"
          }`}
        >
          {sortedArtworks.map((artwork) => {
            const images = artwork.media.filter((m) => m.type === "image");
            const videos = artwork.media.filter((m) => m.type === "video");
            const coverMedia = getCoverMedia(artwork);
            const imageCount = images.length;
            const videoCount = videos.length;

            return (
              <WideArtworkCard
                key={artwork.id}
                artwork={artwork}
                imageCount={imageCount}
                videoCount={videoCount}
                initialMedia={coverMedia}
                viewMode={viewMode}
              />
            );
          })}
        </div>
      )}

      {/* Load More Button - only show if there are artworks */}
      {artworks.length > 0 && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Load More Artwork
          </Button>
        </div>
      )}
    </div>
  );
}

// New wider card with in-card carousel navigation
function WideArtworkCard({
  artwork,
  imageCount,
  videoCount,
  initialMedia,
  viewMode,
}: {
  artwork: Artwork;
  imageCount: number;
  videoCount: number;
  initialMedia: ArtworkMedia | null;
  viewMode: "grid" | "list";
}) {
  const [index, setIndex] = useState<number>(() => {
    if (!initialMedia) return 0;
    const i = artwork.media.findIndex((m) => m.key === initialMedia.key);
    return i >= 0 ? i : 0;
  });

  const next = () => setIndex((prev) => (prev + 1) % artwork.media.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + artwork.media.length) % artwork.media.length);

  const media = artwork.media[index];

  return (
    <Card className="group relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/60 shadow-sm hover:shadow-2xl transition-all duration-300">
      <CardContent className="p-0">
        {/* Media Container */}
        <div className="relative overflow-hidden">
          <Link href={`/artwork/${artwork.id}`}>
            {media ? (
              media.type === "image" ? (
                <img
                  src={media.url}
                  alt={artwork.title}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    "h-[22rem] sm:h-[28rem] lg:h-[34rem]"
                  }`}
                />
              ) : (
                <div className="relative">
                  <video
                    src={media.url}
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      "h-[22rem] sm:h-[28rem] lg:h-[34rem]"
                    }`}
                    muted
                    loop
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
              )
            ) : (
              <div
                className={`w-full bg-gray-200 flex items-center justify-center ${
                  "h-[22rem] sm:h-[28rem] lg:h-[34rem]"
                }`}
              >
                <ImageIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </Link>

          {/* Carousel arrows (only if more than 1 media) */}
          {artwork.media.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  prev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 shadow hover:bg-white focus:outline-none"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  next();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2 shadow hover:bg-white focus:outline-none"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
                {artwork.media.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-5 rounded-full ${
                      i === index ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Overlay Actions */}
          <div className="absolute inset-0 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Badge className="bg-black/70 text-white backdrop-blur-sm">
                {imageCount} Images
              </Badge>
              {videoCount > 0 && (
                <Badge className="bg-purple-600/80 text-white backdrop-blur-sm">
                  {videoCount} Videos
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white shadow-md"
                asChild
              >
                <Link href={`/artwork/${artwork.id}`}>View</Link>
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white shadow-md"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* New and Quality Badges */}
          {new Date().getTime() -
            new Date(artwork.dateCreated).getTime() <
            30 * 24 * 60 * 60 * 1000 && (
            <Badge className="absolute top-4 right-4 bg-green-600 text-white shadow">
              New
            </Badge>
          )}
          {media && media.size > 10 * 1024 * 1024 && (
            <Badge className="absolute bottom-4 right-4 bg-blue-600/90 text-white shadow">
              4K Quality
            </Badge>
          )}
        </div>

        {/* Content */}
        <div className="p-7 lg:p-9">
          <div>
            <Link href={`/artwork/${artwork.id}`}>
              <h3 className="text-3xl font-semibold tracking-tight text-gray-900 mb-3 hover:text-gray-700 transition-colors">
                {artwork.title}
              </h3>
            </Link>
            {artwork.description && (
              <p className="text-base leading-7 text-gray-600 mb-5 line-clamp-2">
                {artwork.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>
                Added {new Date(artwork.dateCreated).toLocaleDateString()}
              </span>
              <span>•</span>
              <span>
                {artwork.media.length} media file
                {artwork.media.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-4xl font-bold text-gray-900">
              ${artwork.price.toFixed(2)}
            </span>

            <Button
              asChild
              className="h-11 px-6 bg-gray-900 hover:bg-gray-800"
            >
              <Link href="/contact?subject=Artwork Purchase Inquiry">
                Contact for Purchase
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
