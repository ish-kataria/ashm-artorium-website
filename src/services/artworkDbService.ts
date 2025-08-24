import { neon } from '@netlify/neon';

// Initialize Neon database connection (client-side only)
let sql: any = null;

const getDbClient = () => {
  if (typeof window !== 'undefined' && !sql) {
    try {
      // Only try to initialize if we have the database URL
      if (process.env.NETLIFY_DATABASE_URL || typeof window !== 'undefined') {
        sql = neon(); // automatically uses env NETLIFY_DATABASE_URL
      }
    } catch (error) {
      console.warn('Database not configured, using localStorage fallback');
      return null;
    }
  }
  return sql;
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

    const client = getDbClient();
    if (!client) {
      console.log('Database not available, using localStorage fallback');
      return true; // Return true to continue with localStorage
    }

    try {
      await client`
        CREATE TABLE IF NOT EXISTS artworks (
          id VARCHAR(255) PRIMARY KEY,
          title VARCHAR(500) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          description TEXT,
          date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      await client`
        CREATE TABLE IF NOT EXISTS artwork_media (
          id SERIAL PRIMARY KEY,
          artwork_id VARCHAR(255) REFERENCES artworks(id) ON DELETE CASCADE,
          url TEXT NOT NULL,
          key VARCHAR(500) NOT NULL,
          type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
          size BIGINT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;

      await client`
        CREATE INDEX IF NOT EXISTS idx_artwork_media_artwork_id ON artwork_media(artwork_id)
      `;

      console.log('Database initialized successfully');
      return true;
    } catch (error) {
      console.warn('Failed to initialize database, falling back to localStorage:', error);
      return true; // Continue with localStorage fallback
    }
  }

  // Save artwork to database or localStorage fallback
  async saveArtwork(artwork: Artwork): Promise<boolean> {
    if (!this.isClient) return false;

    const client = getDbClient();

    if (!client) {
      // Fallback to localStorage
      return this.saveToLocalStorage(artwork);
    }

    try {
      // Insert or update artwork
      await client`
        INSERT INTO artworks (id, title, price, description, date_created)
        VALUES (${artwork.id}, ${artwork.title}, ${artwork.price}, ${artwork.description || null}, ${artwork.dateCreated})
        ON CONFLICT (id)
        DO UPDATE SET
          title = EXCLUDED.title,
          price = EXCLUDED.price,
          description = EXCLUDED.description,
          updated_at = CURRENT_TIMESTAMP
      `;

      // Delete existing media for this artwork
      await client`DELETE FROM artwork_media WHERE artwork_id = ${artwork.id}`;

      // Insert new media
      if (artwork.media.length > 0) {
        for (const media of artwork.media) {
          await client`
            INSERT INTO artwork_media (artwork_id, url, key, type, size)
            VALUES (${artwork.id}, ${media.url}, ${media.key}, ${media.type}, ${media.size})
          `;
        }
      }

      console.log('Artwork saved to database successfully:', artwork.id);
      return true;
    } catch (error) {
      console.warn('Failed to save to database, trying localStorage:', error);
      return this.saveToLocalStorage(artwork);
    }
  }

  // Get all artworks
  async getAllArtworks(): Promise<Artwork[]> {
    if (!this.isClient) return [];

    const client = getDbClient();

    if (!client) {
      return this.getFromLocalStorage();
    }

    try {
      const artworks = await client`
        SELECT
          id, title, price, description,
          date_created as "dateCreated"
        FROM artworks
        ORDER BY created_at DESC
      `;

      const result: Artwork[] = [];

      for (const artwork of artworks) {
        const media = await client`
          SELECT url, key, type, size
          FROM artwork_media
          WHERE artwork_id = ${artwork.id}
          ORDER BY id ASC
        `;

        result.push({
          ...artwork,
          media: media as ArtworkMedia[]
        });
      }

      return result;
    } catch (error) {
      console.warn('Failed to get artworks from database, trying localStorage:', error);
      return this.getFromLocalStorage();
    }
  }

  // Get single artwork by ID
  async getArtworkById(id: string): Promise<Artwork | null> {
    if (!this.isClient) return null;

    const client = getDbClient();

    if (!client) {
      const artworks = this.getFromLocalStorage();
      return artworks.find(a => a.id === id) || null;
    }

    try {
      const [artwork] = await client`
        SELECT
          id, title, price, description,
          date_created as "dateCreated"
        FROM artworks
        WHERE id = ${id}
      `;

      if (!artwork) return null;

      const media = await client`
        SELECT url, key, type, size
        FROM artwork_media
        WHERE artwork_id = ${id}
        ORDER BY id ASC
      `;

      return {
        ...artwork,
        media: media as ArtworkMedia[]
      };
    } catch (error) {
      console.warn('Failed to get artwork from database, trying localStorage:', error);
      const artworks = this.getFromLocalStorage();
      return artworks.find(a => a.id === id) || null;
    }
  }

  // Delete artwork
  async deleteArtwork(id: string): Promise<boolean> {
    if (!this.isClient) return false;

    const client = getDbClient();

    if (!client) {
      return this.deleteFromLocalStorage(id);
    }

    try {
      await client`DELETE FROM artworks WHERE id = ${id}`;
      // Media will be deleted automatically due to CASCADE
      return true;
    } catch (error) {
      console.warn('Failed to delete from database, trying localStorage:', error);
      return this.deleteFromLocalStorage(id);
    }
  }

  // Clear all artwork (for emergency cleanup)
  async clearAllArtwork(): Promise<boolean> {
    if (!this.isClient) return false;

    const client = getDbClient();

    if (!client) {
      return this.clearLocalStorage();
    }

    try {
      await client`DELETE FROM artwork_media`;
      await client`DELETE FROM artworks`;
      return true;
    } catch (error) {
      console.warn('Failed to clear database, trying localStorage:', error);
      return this.clearLocalStorage();
    }
  }

  // Get database stats
  async getStats() {
    if (!this.isClient) return { artworkCount: 0, mediaCount: 0, totalSize: 0 };

    const client = getDbClient();

    if (!client) {
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

    try {
      const [artworkCount] = await client`SELECT COUNT(*) as count FROM artworks`;
      const [mediaCount] = await client`SELECT COUNT(*) as count FROM artwork_media`;
      const [totalSize] = await client`SELECT COALESCE(SUM(size), 0) as total FROM artwork_media`;

      return {
        artworkCount: artworkCount.count,
        mediaCount: mediaCount.count,
        totalSize: totalSize.total
      };
    } catch (error) {
      console.warn('Failed to get stats from database, trying localStorage:', error);
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
}

export const artworkDbService = new ArtworkDbService();
export default artworkDbService;
