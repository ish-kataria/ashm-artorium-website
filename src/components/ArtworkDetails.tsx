"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Ruler,
  Palette,
  Calendar,
  Package,
  ChevronLeft,
  ChevronRight,
  Play
} from "lucide-react";
import Link from "next/link";
import BookButton from "@/components/BookButton";

interface ArtworkDetailsProps {
  artwork: {
    id: string;
    title: string;
    price: number;
    description?: string;
    images: string[];
    videos: string[];
    dateCreated: string;
  };
}

export default function ArtworkDetails({ artwork }: ArtworkDetailsProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Combine images and videos into one media array
  const allMedia = [
    ...artwork.images.map(url => ({ type: 'image' as const, url })),
    ...artwork.videos.map(url => ({ type: 'video' as const, url }))
  ];

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gray-700">Shop</Link>
          <span>/</span>
          <span className="text-gray-900">{artwork.title}</span>
        </div>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Media Gallery */}
        <div className="space-y-4">
          {/* Main Media Display */}
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            {allMedia[currentMediaIndex]?.type === 'image' ? (
              <img
                src={allMedia[currentMediaIndex].url}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            ) : allMedia[currentMediaIndex]?.type === 'video' ? (
              <video
                src={allMedia[currentMediaIndex].url}
                className="w-full h-full object-cover"
                controls
                loop
                muted
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-2" />
                  <p>No media available</p>
                </div>
              </div>
            )}

            {/* Navigation Arrows */}
            {allMedia.length > 1 && (
              <>
                <button
                  onClick={prevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Media Counter */}
            {allMedia.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentMediaIndex + 1} / {allMedia.length}
              </div>
            )}

            {/* Media Type Indicator */}
            {allMedia[currentMediaIndex] && (
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {allMedia[currentMediaIndex].type === 'video' ? '📹 Video' : '📷 Photo'}
              </div>
            )}
          </div>

          {/* Media Thumbnails */}
          {allMedia.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allMedia.map((media, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentMediaIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all relative ${
                    currentMediaIndex === index ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {media.type === 'image' ? (
                    <img
                      src={media.url}
                      alt={`${artwork.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="relative">
                      <video
                        src={media.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-gray-100 text-gray-800">Original Artwork</Badge>
              {new Date().getTime() - new Date(artwork.dateCreated).getTime() < 30 * 24 * 60 * 60 * 1000 && (
                <Badge className="bg-green-500">New</Badge>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{artwork.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl font-bold text-gray-900">${artwork.price.toFixed(2)}</span>
            </div>

            {artwork.description && (
              <p className="text-gray-600 leading-relaxed">{artwork.description}</p>
            )}
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                Created {new Date(artwork.dateCreated).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Original Mixed Media Artwork</span>
            </div>
          </div>

          <Separator />

          {/* Inquiry Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Available for viewing and purchase - Contact for details
              </span>
            </div>

            <div className="flex gap-3">
              <Button asChild size="lg" className="flex-1 bg-gray-900 hover:bg-gray-800">
                <Link href={`/contact?subject=Purchase Inquiry - ${artwork.title}`}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Inquire About Purchase
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'text-red-500 border-red-500' : ''}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Shipping & Policies */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 text-green-600" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-blue-600" />
              <span>Certificate of authenticity included</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RotateCcw className="h-4 w-4 text-purple-600" />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Details */}
      {artwork.description && (
        <div className="mt-16">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">About This Artwork</h3>
              <p className="text-gray-600 leading-relaxed">{artwork.description}</p>
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Created</span>
                  <span>{new Date(artwork.dateCreated).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium</span>
                  <span>Mixed Media</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span>Original Artwork</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Contact for Commission */}
      <div className="mt-12 bg-gradient-to-r from-gray-50 to-white rounded-lg p-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Love this style? Commission a Custom Piece
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Interested in a similar artwork with your own specifications? Ashm accepts commission
          work for custom pieces that reflect your unique vision and space.
        </p>
        <Button asChild variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white">
          <Link href="/contact">Discuss Commission</Link>
        </Button>
      </div>
    </div>
  );
}
