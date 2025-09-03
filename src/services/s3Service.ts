// import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
// import { v4 as uuidv4 } from 'uuid';

// Mock UUID function for now
const uuidv4 = () => Math.random().toString(36).substring(2, 15);

// S3 Configuration - These should be set as environment variables
const S3_CONFIG = {
  region: process.env.NEXT_PUBLIC_AWS_REGION || 'us-east-1',
  bucket: process.env.NEXT_PUBLIC_S3_BUCKET || 'ashm-artorium-gallery',
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
};

// Initialize S3 client (disabled for now)
// const s3Client = new S3Client({
//   region: S3_CONFIG.region,
//   credentials: {
//     accessKeyId: S3_CONFIG.accessKeyId,
//     secretAccessKey: S3_CONFIG.secretAccessKey,
//   },
// });
const s3Client: null = null;

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

export interface S3FileData {
  url: string;
  key: string;
  type: 'image' | 'video';
  size: number;
}

class S3Service {
  private generateFileKey(file: File, artworkId: string): string {
    const timestamp = Date.now();
    const randomId = uuidv4().substring(0, 8);
    const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    return `artwork/${artworkId}/${timestamp}-${randomId}.${fileExtension}`;
  }

  private getPublicUrl(key: string): string {
    return `https://${S3_CONFIG.bucket}.s3.${S3_CONFIG.region}.amazonaws.com/${key}`;
  }

  async uploadFile(file: File, artworkId: string): Promise<UploadResult> {
    try {
      // Validate file
      if (!file) {
        return { success: false, error: 'No file provided' };
      }

      // File size check removed for testing with Neon database

      // Validate file type
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/tiff',
        'video/mp4', 'video/mov', 'video/avi', 'video/quicktime'
      ];

      if (!allowedTypes.includes(file.type)) {
        return { success: false, error: 'Unsupported file type' };
      }

      // Generate unique key
      const key = this.generateFileKey(file, artworkId);

      // Convert file to buffer
      const buffer = await file.arrayBuffer();

      // Upload to S3 (disabled for now)
      // const command = new PutObjectCommand({
      //   Bucket: S3_CONFIG.bucket,
      //   Key: key,
      //   Body: new Uint8Array(buffer),
      //   ContentType: file.type,
      //   CacheControl: 'max-age=31536000', // 1 year cache
      //   Metadata: {
      //     originalName: file.name,
      //     artworkId: artworkId,
      //     uploadDate: new Date().toISOString(),
      //   },
      // });

      // await s3Client.send(command);

      // Return mock result for now
      return { success: false, error: 'S3 service disabled' };

      const url = this.getPublicUrl(key);

      return {
        success: true,
        url,
        key,
      };

    } catch (error) {
      console.error('S3 upload error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      };
    }
  }

  async uploadMultipleFiles(files: File[], artworkId: string): Promise<UploadResult[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, artworkId));
    return Promise.all(uploadPromises);
  }

  async deleteFile(key: string): Promise<boolean> {
    try {
      // const command = new DeleteObjectCommand({
      //   Bucket: S3_CONFIG.bucket,
      //   Key: key,
      // });

      // await s3Client.send(command);
      // return true;

      // S3 service disabled for now
      return false;
    } catch (error) {
      console.error('S3 delete error:', error);
      return false;
    }
  }

  async deleteMultipleFiles(keys: string[]): Promise<boolean[]> {
    const deletePromises = keys.map(key => this.deleteFile(key));
    return Promise.all(deletePromises);
  }

  // Helper to extract key from S3 URL
  extractKeyFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const bucketUrl = `${S3_CONFIG.bucket}.s3.${S3_CONFIG.region}.amazonaws.com`;

      if (urlObj.hostname === bucketUrl) {
        return urlObj.pathname.substring(1); // Remove leading slash
      }

      return null;
    } catch {
      return null;
    }
  }

  // Check if S3 is properly configured
  isConfigured(): boolean {
    return !!(S3_CONFIG.accessKeyId && S3_CONFIG.secretAccessKey && S3_CONFIG.bucket);
  }

  // Get configuration status for admin panel
  getConfigStatus() {
    return {
      configured: this.isConfigured(),
      region: S3_CONFIG.region,
      bucket: S3_CONFIG.bucket,
      hasCredentials: !!(S3_CONFIG.accessKeyId && S3_CONFIG.secretAccessKey),
    };
  }
}

export const s3Service = new S3Service();
export default s3Service;
