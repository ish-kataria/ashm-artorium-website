"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Mail, MessageCircle } from "lucide-react";
import whatsappService from "@/services/whatsappService";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "",
    subject: "",
    message: ""
  });

  // Pre-fill form with URL parameters
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    const urlSubject = searchParams.get('subject');
    const urlMessage = searchParams.get('message');
    const artworkId = searchParams.get('artwork');

    if (urlSubject || urlMessage) {
      setFormData(prev => ({
        ...prev,
        subject: urlSubject ? decodeURIComponent(urlSubject) : prev.subject,
        message: urlMessage ? decodeURIComponent(urlMessage) : prev.message,
        inquiryType: artworkId ? "artwork" : prev.inquiryType
      }));
    }
  }, [searchParams]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Send WhatsApp notification
      const whatsappResult = await whatsappService.sendContactNotification(formData);

      if (whatsappResult.success) {
        setWhatsappSent(true);
        console.log('WhatsApp notification sent successfully');
      } else {
        console.warn('WhatsApp notification failed:', whatsappResult.error);
        // Don't block form submission if WhatsApp fails
      }

      // Simulate additional form processing (email, database, etc.)
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('There was an error submitting your form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Thank You for Your Interest!
          </h3>
          <p className="text-gray-600 mb-4">
            I've received your inquiry and will get back to you within 24 hours. I'm excited to discuss your interest in my artwork and how we can work together!
          </p>

          {whatsappSent && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <MessageCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Instant notification sent!</strong> I've been notified via WhatsApp and will respond even faster.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            <p>In the meantime, feel free to:</p>
            <p>• Browse more artwork in my gallery</p>
            <p>• Follow me on social media for updates</p>
            <p>• Call me directly at <a href="tel:+17636077480" className="text-green-600 hover:text-green-700 underline">(763) 607-7480</a> for immediate assistance</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Send Me a Message</CardTitle>
        <p className="text-gray-600">
          I'd love to hear from you! Whether you're interested in purchasing artwork,
          commissioning a custom piece, or booking a class, let's start a conversation.
        </p>
      </CardHeader>
      <CardContent>
        {submitError && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <Mail className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {submitError}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="mt-1"
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                className="mt-1"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="mt-1"
              placeholder="(555) 123-4567"
            />
          </div>

          {/* Inquiry Type */}
          <div>
            <Label htmlFor="inquiryType">Type of Inquiry *</Label>
            <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select inquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="artwork">Artwork Purchase Inquiry</SelectItem>
                <SelectItem value="class">Join Art Class</SelectItem>
                <SelectItem value="party">Birthday Party/Event</SelectItem>
                <SelectItem value="sip-paint">Sip & Paint Event</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              required
              className="mt-1"
              placeholder="Brief description of your inquiry"
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              required
              className="mt-1"
              rows={6}
              placeholder="Please share details about your interest, timeline, budget (if applicable), and any specific questions you have..."
            />
          </div>

          {/* Artwork Purchase Notice */}
          {formData.inquiryType === 'artwork' && (
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                <strong>Artwork Purchase:</strong> Please mention which piece interests you, and I'll provide detailed information.
              </AlertDescription>
            </Alert>
          )}

          {/* Art Class Notice */}
          {formData.inquiryType === 'class' && (
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                <strong>Art Classes:</strong> Please let me know your preferred schedule from our available time slots. Classes include all materials and professional instruction.
              </AlertDescription>
            </Alert>
          )}

          {/* Party/Event Notice */}
          {formData.inquiryType === 'party' && (
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>
                <strong>Birthday Parties:</strong> Please include your preferred date, number of kids,
                ages, and any special themes. All supplies included in our private 1,500 sq ft party hall!
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gray-900 hover:bg-gray-800"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending Message...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
