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
  RefreshCw,
  Cloud,
  Settings
} from "lucide-react";
import s3Service, { S3FileData } from "@/services/s3Service";
import artworkDbService, { Artwork as DbArtwork, ArtworkMedia as DbArtworkMedia } from "@/services/artworkDbService";

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

export default function ArtworkManager() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [s3Status, setS3Status] = useState(s3Service.getConfigStatus());
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    pendingFiles: [] as File[]
  });

  // Load artworks from database on component mount
  useEffect(() => {
    const loadArtworks = async () => {
      try {
        // Initialize database tables
        await artworkDbService.initDatabase();

        // Load artworks from database
        const dbArtworks = await artworkDbService.getAllArtworks();
        setArtworks(dbArtworks);
      } catch (error) {
        console.error('Error loading artworks:', error);
        setUploadError("Error loading artwork data from database.");
      }
    };

    loadArtworks();
  }, []);

  // Save artwork to database (replaces localStorage to handle large files)
  const saveArtwork = async (artworkData: Artwork): Promise<boolean> => {
    try {
      const success = await artworkDbService.saveArtwork(artworkData);
      if (success) {
        // Reload artworks from database to ensure consistency
        const updatedArtworks = await artworkDbService.getAllArtworks();
        setArtworks(updatedArtworks);
        return true;
      } else {
        setUploadError('Failed to save artwork to database.');
        return false;
      }
    } catch (error) {
      setUploadError('Error saving artwork data to database.');
      console.error('Error saving to database:', error);
      return false;
    }
  };

  // Convert file to compressed base64 URL for local storage
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // For large files (>5MB), compress them for local storage
      if (file.size > 5 * 1024 * 1024) {
        compressFileForLocalStorage(file)
          .then(resolve)
          .catch(reject);
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to convert file to base64'));
          }
        };
        reader.onerror = () => reject(new Error('File reading failed'));
        reader.readAsDataURL(file);
      }
    });
  };

  // Compress large files for local storage
  const compressFileForLocalStorage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (file.type.startsWith('image/')) {
        // Compress images
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
          // Compress to max 1200px width, 30% quality for local storage
          const maxWidth = 1200;
          const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;

          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Very low quality for local storage to save space
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.3);
          resolve(compressedDataUrl);
        };

        img.onerror = () => reject(new Error('Image compression failed'));
        img.src = URL.createObjectURL(file);
      } else {
        // For videos, just use a placeholder for local storage
        resolve(`data:text/plain;base64,${btoa(`Video file: ${file.name} (${formatFileSize(file.size)})`)}`);
      }
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadError(null);
    const newFiles = Array.from(files);

    // Validate files
    for (const file of newFiles) {
      // Check file type only (removed size limits for testing)
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/tiff',
        'video/mp4', 'video/mov', 'video/avi', 'video/quicktime'
      ];

      if (!allowedTypes.includes(file.type)) {
        setUploadError(`File "${file.name}" has an unsupported format. Supported: JPEG, PNG, WebP, TIFF, MP4, MOV, AVI`);
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      pendingFiles: [...prev.pendingFiles, ...newFiles]
    }));
  };

  const removePendingFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      pendingFiles: prev.pendingFiles.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);

    if (!formData.title || !formData.price) {
      setUploadError("Please fill in title and price.");
      return;
    }

    if (formData.pendingFiles.length === 0 && (!editingArtwork || editingArtwork.media.length === 0)) {
      setUploadError("Please upload at least one image or video.");
      return;
    }

    // S3 is optional - we can upload with local storage for testing

    setIsUploading(true);

    try {
      const artworkId = editingArtwork?.id || Date.now().toString();
      // eslint-disable-next-line prefer-const
      let uploadedMedia: ArtworkMedia[] = editingArtwork?.media ? [...editingArtwork.media] : [];

      // Upload new files
      if (formData.pendingFiles.length > 0) {
        if (s3Status.configured) {
          // Upload to S3 if configured
          const uploadResults = await s3Service.uploadMultipleFiles(formData.pendingFiles, artworkId);

          for (let i = 0; i < uploadResults.length; i++) {
            const result = uploadResults[i];
            const file = formData.pendingFiles[i];

            if (result.success && result.url && result.key) {
              uploadedMedia.push({
                url: result.url,
                key: result.key,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                size: file.size
              });
            } else {
              setUploadError(`Failed to upload ${file.name}: ${result.error}`);
              setIsUploading(false);
              return;
            }
          }
        } else {
          // Fallback to local storage (base64) for testing
          for (const file of formData.pendingFiles) {
            try {
              const base64Url = await convertFileToBase64(file);
              uploadedMedia.push({
                url: base64Url,
                key: `local-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                type: file.type.startsWith('image/') ? 'image' : 'video',
                size: file.size
              });
            } catch (error) {
              setUploadError(`Failed to process ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
              setIsUploading(false);
              return;
            }
          }
        }
      }

      const artworkData: Artwork = {
        id: artworkId,
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description || undefined,
        media: uploadedMedia,
        dateCreated: editingArtwork?.dateCreated || new Date().toISOString()
      };

      // Save artwork to database
      const success = await saveArtwork(artworkData);
      if (success) {
        setFormData({ title: "", price: "", description: "", pendingFiles: [] });
        setEditingArtwork(null);
        setIsDialogOpen(false);
        setUploadError(null);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      price: artwork.price.toString(),
      description: artwork.description || "",
      pendingFiles: []
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (artwork: Artwork) => {
    if (confirm("Are you sure you want to delete this artwork? This will also remove all associated files from cloud storage.")) {
      try {
        // Delete files from S3 if they exist
        if (artwork.media.length > 0) {
          const keys = artwork.media.map(media => media.key);
          await s3Service.deleteMultipleFiles(keys);
        }

        // Remove from database
        const success = await artworkDbService.deleteArtwork(artwork.id);
        if (success) {
          // Reload artworks from database
          const updatedArtworks = await artworkDbService.getAllArtworks();
          setArtworks(updatedArtworks);
        } else {
          setUploadError('Failed to delete artwork from database.');
        }
      } catch (error) {
        setUploadError('Error deleting artwork.');
        console.error('Delete error:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", price: "", description: "", pendingFiles: [] });
    setEditingArtwork(null);
    setUploadError(null);
  };

  const clearAllArtwork = async () => {
    if (confirm("Are you sure you want to delete ALL artwork? This will also remove all files from cloud storage and cannot be undone!")) {
      try {
        // Delete all files from S3
        for (const artwork of artworks) {
          if (artwork.media.length > 0) {
            const keys = artwork.media.map(media => media.key);
            await s3Service.deleteMultipleFiles(keys);
          }
        }

        // Clear all from database
        const success = await artworkDbService.clearAllArtwork();
        if (success) {
          setArtworks([]);
          setUploadError(null);
        } else {
          setUploadError('Failed to clear all artwork from database.');
        }
      } catch (error) {
        setUploadError('Error clearing artwork.');
        console.error('Clear error:', error);
      }
    }
  };

  const getFileTypeIcon = (file: File) => {
    return file.type.startsWith('image/') ? <ImageIcon className="h-4 w-4" /> : <Video className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* S3 Configuration Status */}
      {!s3Status.configured && (
        <Alert className="border-blue-200 bg-blue-50">
          <Settings className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Testing Mode Active</strong><br />
            You can upload artwork now for testing. Files will be stored locally. For production with 4K cloud storage, configure AWS S3:
            <ul className="mt-2 ml-4 list-disc text-sm">
              <li>Set NEXT_PUBLIC_AWS_REGION (current: {s3Status.region})</li>
              <li>Set NEXT_PUBLIC_S3_BUCKET (current: {s3Status.bucket})</li>
              <li>Set NEXT_PUBLIC_AWS_ACCESS_KEY_ID</li>
              <li>Set NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY</li>
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Upload Error Alert */}
      {uploadError && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {uploadError}
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
                onClick={() => setUploadError(null)}
                className="border-gray-300"
              >
                <X className="h-3 w-3 mr-1" />
                Dismiss
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Add New Artwork Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Your Artwork Collection</h2>
          <p className="text-gray-600">Upload high-resolution images and videos (AWS S3 cloud storage or Neon database storage)</p>

          {/* S3 Status Indicator */}
          <div className="mt-2 flex items-center gap-2">
            <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
              s3Status.configured ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
            }`}>
              <Cloud className="h-3 w-3" />
              <span>{s3Status.configured ? 'S3 Cloud Storage' : 'Neon Database Storage'}</span>
            </div>
            {s3Status.configured && (
              <span className="text-xs text-gray-500">
                Bucket: {s3Status.bucket} ({s3Status.region})
              </span>
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

              {/* File Upload */}
              <div>
                <Label htmlFor="files">Images & Videos</Label>
                <p className="text-sm text-gray-500 mb-2">
                  Upload high-resolution images and videos. {s3Status.configured ? 'Files will be stored in AWS S3 cloud storage at full quality.' : 'Files will be compressed for local testing (large files >5MB will be reduced for browser storage). Configure AWS S3 for full-quality production storage.'} Supported formats: JPEG, PNG, WebP, TIFF, MP4, MOV, AVI
                </p>
                <div className="mt-2">
                  <input
                    id="files"
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("files")?.click()}
                    className="w-full"
                    disabled={isUploading}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isUploading ? "Uploading..." : "Select Files"}
                  </Button>
                </div>

                {/* Pending Files Preview */}
                {formData.pendingFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Files to Upload:</h4>
                    <div className="space-y-2">
                      {formData.pendingFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            {getFileTypeIcon(file)}
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removePendingFile(index)}
                            disabled={isUploading}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Existing Media (for editing) */}
                {editingArtwork && editingArtwork.media.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Current Media:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {editingArtwork.media.map((media, index) => (
                        <div key={index} className="relative group">
                          {media.type === 'image' ? (
                            <img
                              src={media.url}
                              alt={`Artwork media ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="relative">
                              <video
                                src={media.url}
                                className="w-full h-32 object-cover rounded-lg"
                                muted
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <Play className="h-6 w-6 text-white opacity-80" />
                              </div>
                            </div>
                          )}
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-black/70 text-white text-xs">
                              {media.type === 'image' ? <ImageIcon className="h-3 w-3" /> : <Video className="h-3 w-3" />}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="bg-gray-900 hover:bg-gray-800 flex-1"
                  disabled={isUploading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isUploading ? (s3Status.configured ? "Uploading to S3..." : "Processing Files...") : editingArtwork ? "Update Artwork" : "Save Artwork"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isUploading}
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
          {artworks.map((artwork) => {
            // Find first image or video for cover
            const firstImage = artwork.media.find(m => m.type === 'image');
            const firstVideo = artwork.media.find(m => m.type === 'video');
            return (
              <Card key={artwork.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  {firstImage ? (
                    <img
                      src={firstImage.url}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  ) : firstVideo ? (
                    <div className="relative">
                      <video
                        src={firstVideo.url}
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
                    {artwork.media.filter(m => m.type === 'image').length > 1 && (
                      <Badge className="bg-black/70 text-white text-xs">
                        <ImageIcon className="h-3 w-3 mr-1" />
                        {artwork.media.filter(m => m.type === 'image').length}
                      </Badge>
                    )}
                    {artwork.media.filter(m => m.type === 'video').length > 0 && (
                      <Badge className="bg-purple-600/80 text-white text-xs">
                        <Video className="h-3 w-3 mr-1" />
                        {artwork.media.filter(m => m.type === 'video').length}
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
                      onClick={() => handleDelete(artwork)}
                      className="text-red-600 hover:text-red-700 hover:border-red-200"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
