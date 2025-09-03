interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
}

interface WhatsAppConfig {
  apiUrl: string;
  phone: string;
  apiKey?: string;
}

interface WhatsAppResponse {
  success: boolean;
  message?: string;
  error?: string;
}

class WhatsAppNotificationService {
  private config: WhatsAppConfig;

  constructor() {
    this.config = {
      apiUrl: process.env.NEXT_PUBLIC_CALLMEBOT_API_URL || '',
      phone: process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '',
      apiKey: process.env.NEXT_PUBLIC_CALLMEBOT_API_KEY || ''
    };
  }

  // Format contact form data into WhatsApp message
  private formatContactMessage(data: ContactFormData): string {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'short',
      timeStyle: 'short'
    });

    let message = `🎨 *New Ashm ARTorium Inquiry*\n\n`;
    message += `👤 *Name:* ${data.name}\n`;
    message += `📧 *Email:* ${data.email}\n`;

    if (data.phone) {
      message += `📱 *Phone:* ${data.phone}\n`;
    }

    message += `🔍 *Inquiry Type:* ${this.getInquiryTypeDisplay(data.inquiryType)}\n`;
    message += `📋 *Subject:* ${data.subject}\n\n`;
    message += `💬 *Message:*\n${data.message}\n\n`;
    message += `⏰ *Received:* ${timestamp}`;

    return message;
  }

  // Convert inquiry type to display format
  private getInquiryTypeDisplay(type: string): string {
    const types: Record<string, string> = {
      'artwork': '🖼️ Artwork Purchase Inquiry',
      'class': '🎓 Join Art Class',
      'party': '🎉 Birthday Party/Event',
      'sip-paint': '🍷 Sip & Paint Event',
      'other': '❓ Other'
    };
    return types[type] || type;
  }

  // Send WhatsApp notification via Call Me Bot API (GET method)
  async sendContactNotification(formData: ContactFormData): Promise<WhatsAppResponse> {
    try {
      // Validate configuration
      if (!this.config.apiUrl || !this.config.phone || !this.config.apiKey) {
        console.warn('WhatsApp service not configured properly');
        return {
          success: false,
          error: 'WhatsApp service not configured'
        };
      }

      const message = this.formatContactMessage(formData);
      const encodedMessage = encodeURIComponent(message);

      // Construct URL for Call Me Bot API (GET method as per their documentation)
      const url = `${this.config.apiUrl}?phone=${this.config.phone}&text=${encodedMessage}&apikey=${this.config.apiKey}`;

      console.log('=== WhatsApp Debug Info ===');
      console.log('API URL:', this.config.apiUrl);
      console.log('Phone:', this.config.phone);
      console.log('API Key:', this.config.apiKey ? 'Present' : 'Missing');
      console.log('Full URL:', url.substring(0, 100) + '...');
      console.log('Sending WhatsApp notification...');

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
        }
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      const result = await response.text();
      console.log('Response text:', result);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, response: ${result}`);
      }

      console.log('✅ WhatsApp notification sent successfully!');
      return {
        success: true,
        message: 'Notification sent successfully'
      };

    } catch (error) {
      console.error('❌ Failed to send WhatsApp notification:', error);

      // Check if it's a CORS error
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('This might be a CORS error. The Call Me Bot API might not allow browser requests.');
        return {
          success: false,
          error: 'Network error - this might be a CORS issue with Call Me Bot API'
        };
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Alternative method for URL-based Call Me Bot API (if they use GET requests)
  async sendContactNotificationURL(formData: ContactFormData): Promise<WhatsAppResponse> {
    try {
      if (!this.config.apiUrl || !this.config.phone || !this.config.apiKey) {
        console.warn('WhatsApp service not configured properly');
        return {
          success: false,
          error: 'WhatsApp service not configured'
        };
      }

      const message = this.formatContactMessage(formData);
      const encodedMessage = encodeURIComponent(message);

      // Construct URL for Call Me Bot API (common format)
      const url = `${this.config.apiUrl}?phone=${this.config.phone}&text=${encodedMessage}&apikey=${this.config.apiKey}`;

      const response = await fetch(url, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();

      console.log('WhatsApp notification sent successfully:', result);
      return {
        success: true,
        message: 'Notification sent successfully'
      };

    } catch (error) {
      console.error('Failed to send WhatsApp notification:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Test the WhatsApp service configuration
  async testConnection(): Promise<WhatsAppResponse> {
    const testData: ContactFormData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '(555) 123-4567',
      inquiryType: 'other',
      subject: 'Test Message',
      message: 'This is a test message to verify WhatsApp integration is working.'
    };

    return await this.sendContactNotification(testData);
  }

  // Check if service is properly configured
  isConfigured(): boolean {
    return !!(this.config.apiUrl && this.config.phone && this.config.apiKey);
  }

  // Get configuration status for debugging
  getConfigStatus() {
    return {
      hasApiUrl: !!this.config.apiUrl,
      hasPhone: !!this.config.phone,
      hasApiKey: !!this.config.apiKey,
      isConfigured: this.isConfigured()
    };
  }
}

export const whatsappService = new WhatsAppNotificationService();
export default whatsappService;
