"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  Users,
  MessageSquare,
  CreditCard,
  Shield,
  Calendar,
  Clock,
  AlertCircle
} from "lucide-react";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    participants: '1',
    specialRequests: '',
    emergencyContact: '',
    agreeToTerms: false,
    agreeToMarketing: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowConfirmation(true);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (showConfirmation) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for your reservation. We've sent a confirmation email with all the details.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-medium text-green-900 mb-2">Booking Details</h4>
            <div className="space-y-1 text-sm text-green-700">
              <p>Confirmation #: <span className="font-mono">ART-2024-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span></p>
              <p>Name: {formData.firstName} {formData.lastName}</p>
              <p>Email: {formData.email}</p>
              <p>Participants: {formData.participants}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setShowConfirmation(false)}>
              Book Another Class
            </Button>
            <Button variant="outline">
              Add to Calendar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Booking Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                className="mt-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="mt-1 pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                  className="mt-1 pl-10"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Event Details</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="participants">Number of Participants *</Label>
                <Select value={formData.participants} onValueChange={(value) => handleInputChange('participants', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Name and phone number"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="specialRequests">Special Requests or Allergies</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="Any special accommodations, dietary restrictions, or requests..."
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Booking Summary</h4>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Class Fee</span>
                <span className="font-medium">$35.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Additional Participants ({parseInt(formData.participants) - 1})</span>
                <span className="font-medium">${(parseInt(formData.participants) - 1) * 35}.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center font-semibold text-lg">
                <span>Total</span>
                <span>${parseInt(formData.participants) * 35}.00</span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I agree to the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a> and
                <a href="#" className="text-blue-600 hover:underline ml-1">cancellation policy</a>.
                I understand that a 24-hour notice is required for cancellations.
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="marketing"
                checked={formData.agreeToMarketing}
                onCheckedChange={(checked) => handleInputChange('agreeToMarketing', checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="marketing" className="text-sm leading-relaxed">
                I'd like to receive updates about new classes and special events (optional)
              </Label>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <h5 className="font-medium mb-1">Important Information:</h5>
                <ul className="space-y-1 text-blue-700">
                  <li>• Please arrive 10 minutes early for setup</li>
                  <li>• All materials and aprons are provided</li>
                  <li>• Wear clothes you don't mind getting paint on</li>
                  <li>• Cancellations require 24-hour notice for full refund</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              disabled={!formData.agreeToTerms || isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Complete Booking
                </>
              )}
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Save as Draft
            </Button>
          </div>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>Your information is secure and encrypted</span>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
