"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Upload,
  Edit,
  Trash2,
  Image as ImageIcon,
  Save,
  X,
  Video,
  Play,
  AlertTriangle,
  Trash,
  RefreshCw
} from "lucide-react";

interface Artwork {
  id: string;
  title: string;
  price: number;
  description?: string;
  images: string[];
  videos: string[];
  dateCreated: string;
}

export default function ArtworkManager() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [storageUsage, setStorageUsage] = useState({ used: 0, total: 0 });
  const [storageError, setStorageError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [] as string[],
    videos: [] as string[]
  });

  // Calculate storage usage
  const calculateStorageUsage = () => {
    try {
      const data = localStorage.getItem("ashm-artworks");
      const used = data ? new Blob([data]).size : 0;
      const total = 5 * 1024 * 1024; // Conservative 5MB limit for localStorage
      setStorageUsage({ used, total });

      // Show warning if storage is getting full
      if (used / total > 0.9) {
        setStorageError("Storage is almost full! Consider removing some artwork or using smaller files.");
      } else if (used / total > 0.8) {
        setStorageError("Storage is getting full. You may need to remove some artwork soon.");
      } else {
        setStorageError(null);
      }
    } catch (error) {
      console.error('Error calculating storage usage:', error);
    }
  };

  // Load artworks from localStorage on component mount
  useEffect(() => {
    const savedArtworks = localStorage.getItem("ashm-artworks");
    if (savedArtworks) {
      try {
        setArtworks(JSON.parse(savedArtworks));
      } catch (error) {
        console.error('Error loading artworks:', error);
        setStorageError("Error loading artwork data. Storage may be corrupted.");
      }
    }
    calculateStorageUsage();
  }, []);

  // Save artworks to localStorage with better error handling
  const saveArtworks = (artworkData: Artwork[]) => {
    try {
      const dataString = JSON.stringify(artworkData);
      const dataSize = new Blob([dataString]).size;

      // Check if this will exceed storage before saving
      if (dataSize > 5 * 1024 * 1024) {
        throw new Error('Data too large for storage');
      }

      localStorage.setItem("ashm-artworks", dataString);
      setArtworks(artworkData);
      calculateStorageUsage();
      setStorageError(null);
      return true;
    } catch (error) {
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        setStorageError(
          'Storage quota exceeded! Your artwork collection is too large. Please remove some items or use smaller images.'
        );
      } else if (error instanceof Error && error.message === 'Data too large for storage') {
        setStorageError(
          'This artwork collection is too large for browser storage. Please remove some items.'
        );
      } else {
        setStorageError('Error saving artwork. Please try again.');
        console.error('Error saving to localStorage:', error);
      }
      return false;
    }
  };

  // More aggressive image compression
  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.6): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions
        let { width, height } = img;
        if (width > maxWidth || height > maxWidth) {
          if (width > height) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          } else {
            width = (width * maxWidth) / height;
            height = maxWidth;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);

        // Check final size
        const finalSize = new Blob([compressedDataUrl]).size;
        if (finalSize > 500 * 1024) { // 500KB limit per image
          // Try even more aggressive compression
          const ultraCompressed = canvas.toDataURL('image/jpeg', 0.4);
          resolve(ultraCompressed);
        } else {
          resolve(compressedDataUrl);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setIsCompressing(true);
    try {
      const newImages: string[] = [];

      for (const file of Array.from(files)) {
        // Check file size (limit to 3MB before compression)
        if (file.size > 3 * 1024 * 1024) {
          alert(`Image "${file.name}" is too large. Please use images under 3MB.`);
          continue;
        }

        try {
          const compressedImage = await compressImage(file, 800, 0.6);
          newImages.push(compressedImage);
        } catch (error) {
          console.error(`Error compressing ${file.name}:`, error);
          alert(`Failed to process "${file.name}". Please try a different image.`);
        }
      }

      if (newImages.length > 0) {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...newImages]
        }));
      }
    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try with smaller files.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Strict video size limit to prevent storage issues
      if (file.size > 5 * 1024 * 1024) {
        alert(`Video "${file.name}" is too large. Please use videos under 5MB. Compress your video before uploading.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const videoUrl = event.target?.result as string;
        setFormData(prev => ({
          ...prev,
          videos: [...prev.videos, videoUrl]
        }));
      };
      reader.onerror = () => {
        alert(`Error reading video file "${file.name}". Please try a different file.`);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || (formData.images.length === 0 && formData.videos.length === 0)) {
      alert("Please fill in title, price, and upload at least one image or video.");
      return;
    }

    const artworkData: Artwork = {
      id: editingArtwork?.id || Date.now().toString(),
      title: formData.title,
      price: parseFloat(formData.price),
      description: formData.description || undefined,
      images: formData.images,
      videos: formData.videos,
      dateCreated: editingArtwork?.dateCreated || new Date().toISOString()
    };

    let newArtworks: Artwork[];
    if (editingArtwork) {
      // Update existing artwork
      newArtworks = artworks.map(art =>
        art.id === editingArtwork.id ? artworkData : art
      );
    } else {
      // Add new artwork
      newArtworks = [...artworks, artworkData];
    }

    // Try to save with improved error handling
    if (saveArtworks(newArtworks)) {
      // Success - reset form and close dialog
      setFormData({ title: "", price: "", description: "", images: [], videos: [] });
      setEditingArtwork(null);
      setIsDialogOpen(false);
    } else {
      // Failed to save - keep dialog open so user can make adjustments
      alert("Failed to save artwork due to storage limitations. Try reducing image quality or removing some images.");
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      price: artwork.price.toString(),
      description: artwork.description || "",
      images: artwork.images,
      videos: artwork.videos || []
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this artwork?")) {
      const newArtworks = artworks.filter(art => art.id !== id);
      saveArtworks(newArtworks);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", price: "", description: "", images: [], videos: [] });
    setEditingArtwork(null);
  };

  // Clear all artwork data
  const clearAllArtwork = () => {
    if (confirm("Are you sure you want to delete ALL artwork? This cannot be undone!")) {
      localStorage.removeItem("ashm-artworks");
      setArtworks([]);
      calculateStorageUsage();
      setStorageError(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Storage Error Alert */}
      {storageError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {storageError}
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={clearAllArtwork}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                <Trash className="h-3 w-3 mr-1" />
                Clear All Data
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={calculateStorageUsage}
                className="border-gray-300"
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                Refresh Storage
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Add New Artwork Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Your Artwork Collection</h2>
          <p className="text-gray-600">Manage your original artwork for the gallery</p>

          {/* Storage Usage Indicator */}
          <div className="mt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Storage used: {(storageUsage.used / 1024 / 1024).toFixed(1)}MB / {(storageUsage.total / 1024 / 1024).toFixed(1)}MB</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    storageUsage.used / storageUsage.total > 0.9 ? 'bg-red-500' :
                    storageUsage.used / storageUsage.total > 0.8 ? 'bg-yellow-500' :
                    storageUsage.used / storageUsage.total > 0.6 ? 'bg-orange-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((storageUsage.used / storageUsage.total) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            {storageUsage.used / storageUsage.total > 0.8 && (
              <p className="text-sm text-red-600 mt-1">
                ⚠️ Storage getting full! Images are auto-compressed to save space.
              </p>
            )}
          </div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm();
                setIsDialogOpen(true);
              }}
              className="bg-gray-900 hover:bg-gray-800"
              disabled={storageUsage.used / storageUsage.total > 0.95}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Artwork
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingArtwork ? "Edit Artwork" : "Add New Artwork"}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Artwork Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter artwork title"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your artwork, materials used, inspiration, etc."
                  rows={4}
                />
              </div>

              {/* Image Upload */}
              <div>
                <Label htmlFor="images">Images</Label>
                <p className="text-sm text-gray-500 mb-2">
                  * At least one image or video is required. Images will be automatically compressed to 800px max and optimized for web.
                </p>
                <div className="mt-2">
                  <input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isCompressing}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("images")?.click()}
                    className="w-full"
                    disabled={isCompressing}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isCompressing ? "Compressing Images..." : "Upload Images"}
                  </Button>
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <Label htmlFor="videos">Videos (Optional)</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Upload videos to showcase your artwork's texture, depth, or creation process. Max 5MB per file.
                </p>
                <p className="text-xs text-amber-600 mb-2">
                  💡 Tip: Compress videos heavily before uploading. Use tools like HandBrake, online compressors, or reduce resolution/quality.
                </p>
                <div className="mt-2">
                  <input
                    id="videos"
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("videos")?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Videos
                  </Button>
                </div>

                {/* Video Preview */}
                {formData.videos.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.videos.map((video, index) => (
                      <div key={index} className="relative group">
                        <video
                          src={video}
                          className="w-full h-32 object-cover rounded-lg"
                          controls
                          muted
                        />
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-gray-900 hover:bg-gray-800 flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {editingArtwork ? "Update Artwork" : "Save Artwork"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Artwork Grid */}
      {artworks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No artwork uploaded yet</h3>
            <p className="text-gray-600 text-center mb-4">
              Start building your gallery by uploading your first piece of original artwork.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                {artwork.images.length > 0 ? (
                  <img
                    src={artwork.images[0]}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                ) : artwork.videos.length > 0 ? (
                  <div className="relative">
                    <video
                      src={artwork.videos[0]}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Play className="h-12 w-12 text-white opacity-80" />
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}

                {/* Media count badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
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
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{artwork.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${artwork.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(artwork.dateCreated).toLocaleDateString()}
                  </span>
                </div>
              </CardHeader>

              {artwork.description && (
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {artwork.description}
                  </p>
                </CardContent>
              )}

              <CardContent className="pt-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(artwork)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(artwork.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-200"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
