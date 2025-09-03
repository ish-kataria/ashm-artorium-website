"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ArtworkDetails from "@/components/ArtworkDetails";
import artworkDbService from "@/services/artworkDbService";

interface ArtworkMedia {
  url: string;
  key: string;
  type: 'image' | 'video';
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

export default function ArtworkPageContent() {
  const params = useParams();
  const id = params.id as string;
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArtwork = async () => {
      try {
        const foundArtwork = await artworkDbService.getArtworkById(id);
        setArtwork(foundArtwork);
      } catch (error) {
        console.error('Error loading artwork:', error);
        setArtwork(null);
      } finally {
        setLoading(false);
      }
    };

    loadArtwork();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded mb-4 w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded mb-8 w-1/2 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artwork Not Found</h1>
          <p className="text-gray-600 mb-8">The artwork you're looking for doesn't exist or has been removed.</p>
          <a href="/shop" className="text-blue-600 hover:text-blue-800">
            ← Back to Gallery
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <ArtworkDetails artwork={artwork} />
      <Footer />
    </div>
  );
}
