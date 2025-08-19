"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Eye, Grid, List, Package, Video, Play, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import BookButton from "@/components/BookButton";

interface Artwork {
  id: string;
  title: string;
  price: number;
  description?: string;
  images: string[];
  videos: string[];
  dateCreated: string;
}

export default function ProductGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  // Load artworks from localStorage
  useEffect(() => {
    const savedArtworks = localStorage.getItem("ashm-artworks");
    if (savedArtworks) {
      setArtworks(JSON.parse(savedArtworks));
    }
  }, []);

  const sortedArtworks = [...artworks].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
      case 'featured':
      default:
        return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
    }
  });

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
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'}`}
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Artwork Available Yet</h3>
            <p className="text-gray-600 mb-6">
              New original artwork will appear here as it becomes available.
              Check back soon or follow us for updates on new pieces!
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-500">Interested in a custom commission?</p>
              <Button asChild className="bg-gray-900 hover:bg-gray-800">
                <Link href="/contact?subject=Custom Commission Inquiry">
                  Request Custom Artwork
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid'
            ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
            : 'grid-cols-1'
        }`}>
          {sortedArtworks.map((artwork) => (
          <Card key={artwork.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {/* Media Container */}
              <div className="relative overflow-hidden">
                <Link href={`/artwork/${artwork.id}`}>
                  {artwork.images.length > 0 ? (
                    <img
                      src={artwork.images[0]}
                      alt={artwork.title}
                      className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                        viewMode === 'grid' ? 'h-64' : 'h-48 sm:h-64'
                      }`}
                    />
                  ) : artwork.videos.length > 0 ? (
                    <div className="relative">
                      <video
                        src={artwork.videos[0]}
                        className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === 'grid' ? 'h-64' : 'h-48 sm:h-64'
                        }`}
                        muted
                        loop
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <Play className="h-8 w-8 text-white opacity-70" />
                      </div>
                    </div>
                  ) : (
                    <div className={`w-full bg-gray-200 flex items-center justify-center ${
                      viewMode === 'grid' ? 'h-64' : 'h-48 sm:h-64'
                    }`}>
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </Link>

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

                {/* Media count badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {artwork.images.length > 1 && (
                    <Badge className="bg-black/70 text-white text-xs">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      {artwork.images.length}
                    </Badge>
                  )}
                  {artwork.videos.length > 0 && (
                    <Badge className="bg-purple-600/80 text-white text-xs">
                      <Video className="h-3 w-3 mr-1" />
                      {artwork.videos.length}
                    </Badge>
                  )}
                </div>

                {/* New Badge (within 30 days) */}
                {new Date().getTime() - new Date(artwork.dateCreated).getTime() < 30 * 24 * 60 * 60 * 1000 && (
                  <Badge className="absolute top-3 right-3 bg-green-500 text-white">
                    New
                  </Badge>
                )}
              </div>

              {/* Content */}
              <div className={`p-6 ${viewMode === 'list' ? 'sm:flex sm:items-center sm:justify-between' : ''}`}>
                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <Link href={`/artwork/${artwork.id}`}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-gray-700 transition-colors">
                      {artwork.title}
                    </h3>
                  </Link>
                  {artwork.description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {artwork.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Added {new Date(artwork.dateCreated).toLocaleDateString()}
                  </p>
                </div>

                <div className={`flex items-center justify-between mt-4 ${
                  viewMode === 'list' ? 'sm:flex-col sm:items-end sm:ml-6 sm:mt-0' : ''
                }`}>
                  <div className={viewMode === 'list' ? 'sm:mb-3' : ''}>
                    <span className="text-2xl font-bold text-gray-900">
                      ${artwork.price.toFixed(2)}
                    </span>
                  </div>

                  <Button asChild className="bg-gray-900 hover:bg-gray-800">
                    <Link href="/contact?subject=Artwork Purchase Inquiry">
                      Contact for Purchase
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}

      {/* Load More Button - only show if there are artworks */}
      {artworks.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
            Load More Artwork
          </Button>
        </div>
      )}
    </div>
  );
}
