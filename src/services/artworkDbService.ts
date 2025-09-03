// import { neon } from '@netlify/neon';

// Initialize Neon database connection (client-side only)
const sql: unknown = null;

const getDbClient = (): null => {
  // Database disabled for now - using localStorage fallback
  return null;
};

export interface ArtworkMedia {
  url: string;
  key: string;
  type: 'image' | 'video';
  size: number;
}

export interface Artwork {
  id: string;
  title: string;
  price: number;
  description?: string;
  media: ArtworkMedia[];
  dateCreated: string;
}

class ArtworkDbService {
  private isClient = typeof window !== 'undefined';

  // localStorage fallback methods
  private saveToLocalStorage(artwork: Artwork): boolean {
    if (!this.isClient) return false;

    try {
      const existing = localStorage.getItem("ashm-artworks-db") || "[]";
      const artworks: Artwork[] = JSON.parse(existing);

      const index = artworks.findIndex(a => a.id === artwork.id);
      if (index >= 0) {
        artworks[index] = artwork;
      } else {
        artworks.push(artwork);
      }

      localStorage.setItem("ashm-artworks-db", JSON.stringify(artworks));
      console.log('Artwork saved to localStorage successfully:', artwork.id);
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  }

  private getFromLocalStorage(): Artwork[] {
    if (!this.isClient) return [];

    try {
      const data = localStorage.getItem("ashm-artworks-db") || "[]";
      return JSON.parse(data);
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return [];
    }
  }

  private deleteFromLocalStorage(id: string): boolean {
    if (!this.isClient) return false;

    try {
      const existing = localStorage.getItem("ashm-artworks-db") || "[]";
      const artworks: Artwork[] = JSON.parse(existing);
      const filtered = artworks.filter(a => a.id !== id);
      localStorage.setItem("ashm-artworks-db", JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Failed to delete from localStorage:', error);
      return false;
    }
  }

  private clearLocalStorage(): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.removeItem("ashm-artworks-db");
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      return false;
    }
  }

  // Initialize database tables
  async initDatabase() {
    if (!this.isClient) return true;

    // Database service disabled - using localStorage only
    console.log('Database service disabled, using localStorage fallback');
    return true;
  }

  // Save artwork to database or localStorage fallback
  async saveArtwork(artwork: Artwork): Promise<boolean> {
    if (!this.isClient) return false;

    // Database service disabled - use localStorage only
    return this.saveToLocalStorage(artwork);
  }

  // Get all artworks
  async getAllArtworks(): Promise<Artwork[]> {
    if (!this.isClient) return [];

    // Database service disabled - use localStorage only
    return this.getFromLocalStorage();
  }

  // Get single artwork by ID
  async getArtworkById(id: string): Promise<Artwork | null> {
    if (!this.isClient) return null;

    // Database service disabled - use localStorage only
    const artworks = this.getFromLocalStorage();
    return artworks.find(a => a.id === id) || null;
  }

  // Delete artwork
  async deleteArtwork(id: string): Promise<boolean> {
    if (!this.isClient) return false;

    // Database service disabled - use localStorage only
    return this.deleteFromLocalStorage(id);
  }

  // Clear all artwork (for emergency cleanup)
  async clearAllArtwork(): Promise<boolean> {
    if (!this.isClient) return false;

    // Database service disabled - use localStorage only
    return this.clearLocalStorage();
  }

  // Get database stats
  async getStats() {
    if (!this.isClient) return { artworkCount: 0, mediaCount: 0, totalSize: 0 };

    // Database service disabled - use localStorage only
    const artworks = this.getFromLocalStorage();
    const mediaCount = artworks.reduce((sum, artwork) => sum + artwork.media.length, 0);
    const totalSize = artworks.reduce((sum, artwork) =>
      sum + artwork.media.reduce((mediaSum, media) => mediaSum + media.size, 0), 0);

    return {
      artworkCount: artworks.length,
      mediaCount,
      totalSize
    };
  }
}

export const artworkDbService = new ArtworkDbService();
export default artworkDbService;
