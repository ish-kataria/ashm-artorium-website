// Email service for sending notifications
// In a real application, this would integrate with services like SendGrid, Nodemailer, or similar

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface EmailData {
  to: string;
  from?: string;
  subject: string;
  html: string;
  text: string;
}

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface BookingEmailData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  className: string;
  date: string;
  time: string;
  participants: number;
}

class EmailService {
  private readonly fromEmail = "noreply@ashmartorium.com";
  private readonly fromName = "Ashm ARTorium";

  // Mock email sending function
  private async sendEmail(emailData: EmailData): Promise<boolean> {
    try {
      // In a real application, this would integrate with an email service
      console.log("Sending email:", {
        to: emailData.to,
        from: emailData.from || this.fromEmail,
        subject: emailData.subject,
        preview: emailData.text.substring(0, 100) + "..."
      });

      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock success response
      return true;
    } catch (error) {
      console.error("Email sending failed:", error);
      return false;
    }
  }

  // Order confirmation email
  async sendOrderConfirmation(orderData: OrderEmailData): Promise<boolean> {
    const template = this.generateOrderConfirmationTemplate(orderData);

    return await this.sendEmail({
      to: orderData.customerEmail,
      from: `${this.fromName} <${this.fromEmail}>`,
      subject: template.subject,
      html: template.html,
      text: template.text
    });
  }

  // Shipping notification email
  async sendShippingNotification(orderData: OrderEmailData & { trackingNumber: string }): Promise<boolean> {
    const template = this.generateShippingNotificationTemplate(orderData);

    return await this.sendEmail({
      to: orderData.customerEmail,
      from: `${this.fromName} <${this.fromEmail}>`,
      subject: template.subject,
      html: template.html,
      text: template.text
    });
  }

  // Class booking confirmation email
  async sendBookingConfirmation(bookingData: BookingEmailData): Promise<boolean> {
    const template = this.generateBookingConfirmationTemplate(bookingData);

    return await this.sendEmail({
      to: bookingData.customerEmail,
      from: `${this.fromName} <${this.fromEmail}>`,
      subject: template.subject,
      html: template.html,
      text: template.text
    });
  }

  // Class reminder email (sent 24 hours before)
  async sendClassReminder(bookingData: BookingEmailData): Promise<boolean> {
    const template = this.generateClassReminderTemplate(bookingData);

    return await this.sendEmail({
      to: bookingData.customerEmail,
      from: `${this.fromName} <${this.fromEmail}>`,
      subject: template.subject,
      html: template.html,
      text: template.text
    });
  }

  // Newsletter signup confirmation
  async sendNewsletterWelcome(email: string, firstName: string): Promise<boolean> {
    const template = this.generateNewsletterWelcomeTemplate(firstName);

    return await this.sendEmail({
      to: email,
      from: `${this.fromName} <${this.fromEmail}>`,
      subject: template.subject,
      html: template.html,
      text: template.text
    });
  }

  // Generate order confirmation email template
  private generateOrderConfirmationTemplate(orderData: OrderEmailData): EmailTemplate {
    const subject = `Order Confirmation - ${orderData.orderId}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .order-items { border: 1px solid #e5e7eb; border-radius: 8px; margin: 20px 0; }
          .item { padding: 15px; border-bottom: 1px solid #e5e7eb; }
          .item:last-child { border-bottom: none; }
          .total { background: #f9fafb; padding: 15px; font-weight: bold; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ashm ARTorium</h1>
            <p>Thank you for your order!</p>
          </div>

          <div class="content">
            <h2>Order Confirmation</h2>
            <p>Dear ${orderData.customerName},</p>
            <p>Thank you for your purchase! Your order has been confirmed and we're preparing it for shipment.</p>

            <p><strong>Order Number:</strong> ${orderData.orderId}</p>
            <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>

            <div class="order-items">
              <h3 style="margin: 0; padding: 15px; background: #f9fafb; border-bottom: 1px solid #e5e7eb;">Order Items</h3>
              ${orderData.items.map(item => `
                <div class="item">
                  <div style="display: flex; justify-content: space-between;">
                    <div>
                      <strong>${item.title}</strong><br>
                      <small>Quantity: ${item.quantity}</small>
                    </div>
                    <div>$${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              `).join('')}
              <div class="total">
                <div style="display: flex; justify-content: space-between;">
                  <span>Total</span>
                  <span>$${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <h3>Shipping Address</h3>
            <p>
              ${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}<br>
              ${orderData.shippingAddress.address}<br>
              ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zip}
            </p>

            <p>You'll receive another email with tracking information once your order ships.</p>
            <p>If you have any questions, please don't hesitate to contact us.</p>
          </div>

          <div class="footer">
            <p>© 2024 Ashm ARTorium | Art that speaks, inspires and transforms!</p>
            <p>825 Meander Ct, Medina, MN 55446 | (763) 607-7480</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Order Confirmation - ${orderData.orderId}

      Dear ${orderData.customerName},

      Thank you for your purchase! Your order has been confirmed and we're preparing it for shipment.

      Order Number: ${orderData.orderId}
      Order Date: ${new Date().toLocaleDateString()}

      Order Items:
      ${orderData.items.map(item => `- ${item.title} (${item.quantity}x) - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

      Total: $${orderData.total.toFixed(2)}

      Shipping Address:
      ${orderData.shippingAddress.firstName} ${orderData.shippingAddress.lastName}
      ${orderData.shippingAddress.address}
      ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} ${orderData.shippingAddress.zip}

      You'll receive another email with tracking information once your order ships.

      © 2024 Ashm ARTorium
      825 Meander Ct, Medina, MN 55446 | (763) 607-7480
    `;

    return { subject, html, text };
  }

  // Generate shipping notification template
  private generateShippingNotificationTemplate(orderData: OrderEmailData & { trackingNumber: string }): EmailTemplate {
    const subject = `Your Order is on the Way! - ${orderData.orderId}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .tracking-box { background: #dbeafe; border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ashm ARTorium</h1>
            <p>Your order is on the way!</p>
          </div>

          <div class="content">
            <h2>Shipping Notification</h2>
            <p>Dear ${orderData.customerName},</p>
            <p>Great news! Your order has been shipped and is on its way to you.</p>

            <div class="tracking-box">
              <h3>Tracking Information</h3>
              <p><strong>Order Number:</strong> ${orderData.orderId}</p>
              <p><strong>Tracking Number:</strong> ${orderData.trackingNumber}</p>
              <p><strong>Estimated Delivery:</strong> ${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
            </div>

            <p>Your artwork has been carefully packaged with professional materials to ensure it arrives in perfect condition.</p>
            <p>Thank you for choosing Ashm ARTorium!</p>
          </div>

          <div class="footer">
            <p>© 2024 Ashm ARTorium | Art that speaks, inspires and transforms!</p>
            <p>825 Meander Ct, Medina, MN 55446 | (763) 607-7480</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Your Order is on the Way! - ${orderData.orderId}

      Dear ${orderData.customerName},

      Great news! Your order has been shipped and is on its way to you.

      Order Number: ${orderData.orderId}
      Tracking Number: ${orderData.trackingNumber}
      Estimated Delivery: ${new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}

      Your artwork has been carefully packaged with professional materials to ensure it arrives in perfect condition.

      Thank you for choosing Ashm ARTorium!

      © 2024 Ashm ARTorium
      825 Meander Ct, Medina, MN 55446 | (763) 607-7480
    `;

    return { subject, html, text };
  }

  // Generate booking confirmation template
  private generateBookingConfirmationTemplate(bookingData: BookingEmailData): EmailTemplate {
    const subject = `Class Booking Confirmed - ${bookingData.className}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .class-details { background: #f0f9ff; border: 1px solid #0ea5e9; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ashm ARTorium</h1>
            <p>Your class is booked!</p>
          </div>

          <div class="content">
            <h2>Class Booking Confirmation</h2>
            <p>Dear ${bookingData.customerName},</p>
            <p>Thank you for booking a class with us! We're excited to create art with you.</p>

            <div class="class-details">
              <h3>Class Details</h3>
              <p><strong>Class:</strong> ${bookingData.className}</p>
              <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${bookingData.time}</p>
              <p><strong>Participants:</strong> ${bookingData.participants}</p>
              <p><strong>Booking ID:</strong> ${bookingData.bookingId}</p>
            </div>

            <h3>What to Bring</h3>
            <p>Please arrive 10 minutes early. All art supplies and materials are provided, but we recommend wearing clothes you don't mind getting a little paint on!</p>

            <h3>Location</h3>
            <p>825 Meander Ct, Medina, MN 55446</p>

            <p>We can't wait to see you!</p>
          </div>

          <div class="footer">
            <p>© 2024 Ashm ARTorium | Art that speaks, inspires and transforms!</p>
            <p>825 Meander Ct, Medina, MN 55446 | (763) 607-7480</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Class Booking Confirmed - ${bookingData.className}

      Dear ${bookingData.customerName},

      Thank you for booking a class with us! We're excited to create art with you.

      Class Details:
      Class: ${bookingData.className}
      Date: ${new Date(bookingData.date).toLocaleDateString()}
      Time: ${bookingData.time}
      Participants: ${bookingData.participants}
      Booking ID: ${bookingData.bookingId}

      What to Bring:
      Please arrive 10 minutes early. All art supplies and materials are provided, but we recommend wearing clothes you don't mind getting a little paint on!

      Location:
      825 Meander Ct, Medina, MN 55446

      We can't wait to see you!

      © 2024 Ashm ARTorium
      825 Meander Ct, Medina, MN 55446 | (763) 607-7480
    `;

    return { subject, html, text };
  }

  // Generate class reminder template
  private generateClassReminderTemplate(bookingData: BookingEmailData): EmailTemplate {
    const subject = `Reminder: Your Art Class is Tomorrow!`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .reminder-box { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 20px; margin: 20px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ashm ARTorium</h1>
            <p>Class Reminder</p>
          </div>

          <div class="content">
            <h2>Your Art Class is Tomorrow!</h2>
            <p>Dear ${bookingData.customerName},</p>
            <p>This is a friendly reminder that your art class is scheduled for tomorrow. We're looking forward to creating with you!</p>

            <div class="reminder-box">
              <h3>Class Details</h3>
              <p><strong>Class:</strong> ${bookingData.className}</p>
              <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> ${bookingData.time}</p>
              <p><strong>Location:</strong> 825 Meander Ct, Medina, MN 55446</p>
            </div>

            <h3>Reminders</h3>
            <ul>
              <li>Please arrive 10 minutes early</li>
              <li>Wear clothes you don't mind getting paint on</li>
              <li>All supplies are provided</li>
              <li>Parking is available on-site</li>
            </ul>

            <p>If you need to cancel or reschedule, please contact us as soon as possible.</p>
            <p>See you tomorrow!</p>
          </div>

          <div class="footer">
            <p>© 2024 Ashm ARTorium | Art that speaks, inspires and transforms!</p>
            <p>825 Meander Ct, Medina, MN 55446 | (763) 607-7480</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Your Art Class is Tomorrow!

      Dear ${bookingData.customerName},

      This is a friendly reminder that your art class is scheduled for tomorrow. We're looking forward to creating with you!

      Class Details:
      Class: ${bookingData.className}
      Date: ${new Date(bookingData.date).toLocaleDateString()}
      Time: ${bookingData.time}
      Location: 825 Meander Ct, Medina, MN 55446

      Reminders:
      - Please arrive 10 minutes early
      - Wear clothes you don't mind getting paint on
      - All supplies are provided
      - Parking is available on-site

      If you need to cancel or reschedule, please contact us as soon as possible.

      See you tomorrow!

      © 2024 Ashm ARTorium
      825 Meander Ct, Medina, MN 55446 | (763) 607-7480
    `;

    return { subject, html, text };
  }

  // Generate newsletter welcome template
  private generateNewsletterWelcomeTemplate(firstName: string): EmailTemplate {
    const subject = `Welcome to the Ashm ARTorium Community!`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
        <style>
          .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
          .header { background: #1f2937; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .welcome-box { background: #f0fdf4; border: 1px solid #22c55e; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Ashm ARTorium</h1>
            <p>Welcome to our community!</p>
          </div>

          <div class="content">
            <div class="welcome-box">
              <h2>Welcome, ${firstName}!</h2>
              <p>Thank you for joining the Ashm ARTorium newsletter. You're now part of our creative community!</p>
            </div>

            <p>As a subscriber, you'll be the first to know about:</p>
            <ul>
              <li>New artwork releases</li>
              <li>Upcoming classes and workshops</li>
              <li>Special events and exhibitions</li>
              <li>Exclusive offers and early access</li>
              <li>Behind-the-scenes studio content</li>
            </ul>

            <p>Stay connected with us on social media for daily inspiration and studio updates!</p>

            <p>Thank you for supporting independent art!</p>
            <p>- Ashm</p>
          </div>

          <div class="footer">
            <p>© 2024 Ashm ARTorium | Art that speaks, inspires and transforms!</p>
            <p>825 Meander Ct, Medina, MN 55446 | (763) 607-7480</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Welcome to the Ashm ARTorium Community!

      Welcome, ${firstName}!

      Thank you for joining the Ashm ARTorium newsletter. You're now part of our creative community!

      As a subscriber, you'll be the first to know about:
      - New artwork releases
      - Upcoming classes and workshops
      - Special events and exhibitions
      - Exclusive offers and early access
      - Behind-the-scenes studio content

      Stay connected with us on social media for daily inspiration and studio updates!

      Thank you for supporting independent art!
      - Ashm

      © 2024 Ashm ARTorium
      825 Meander Ct, Medina, MN 55446 | (763) 607-7480
    `;

    return { subject, html, text };
  }
}

// Export singleton instance
export const emailService = new EmailService();

// Export types for use in other files
export type { OrderEmailData, BookingEmailData };
