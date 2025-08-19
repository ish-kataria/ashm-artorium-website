"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import {
  User,
  MapPin,
  CreditCard,
  Lock,
  Truck,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface FormData {
  // Contact Info
  email: string;
  phone: string;

  // Billing Address
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;

  // Shipping Address
  shippingSameAsBilling: boolean;
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  shippingCountry: string;

  // Special Instructions
  specialInstructions: string;

  // Agreements
  agreeToTerms: boolean;
  subscribeNewsletter: boolean;
}

export default function CheckoutForm() {
  const { state } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZip: '',
    billingCountry: 'US',
    shippingSameAsBilling: true,
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingZip: '',
    shippingCountry: 'US',
    specialInstructions: '',
    agreeToTerms: false,
    subscribeNewsletter: false
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store checkout data in sessionStorage for the payment page
      const checkoutData = {
        formData,
        cartItems: state.items,
        cartTotal: state.total
      };

      sessionStorage.setItem('checkout-data', JSON.stringify(checkoutData));

      // Redirect to payment page with customer info
      const customerName = `${formData.billingFirstName} ${formData.billingLastName}`;
      const queryParams = new URLSearchParams({
        email: formData.email,
        name: customerName
      });

      router.push(`/payment?${queryParams.toString()}`);
    } catch (error) {
      console.error("Checkout preparation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-4 text-orange-500" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">
            You need to add items to your cart before you can checkout.
          </p>
          <Button onClick={() => router.push('/shop')}>
            Continue Shopping
          </Button>
        </CardContent>
      </Card>
    );
  }

  const steps = [
    { number: 1, title: "Contact & Billing", icon: User },
    { number: 2, title: "Shipping", icon: Truck },
    { number: 3, title: "Review & Payment", icon: CreditCard }
  ];

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? 'bg-gray-900 border-gray-900 text-white'
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`mx-4 h-0.5 w-16 ${
                      currentStep > step.number ? 'bg-gray-900' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Contact & Billing */}
        {currentStep >= 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Information & Billing Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <Separator />

              {/* Billing Address */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Billing Address</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingFirstName">First Name *</Label>
                      <Input
                        id="billingFirstName"
                        value={formData.billingFirstName}
                        onChange={(e) => handleInputChange('billingFirstName', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingLastName">Last Name *</Label>
                      <Input
                        id="billingLastName"
                        value={formData.billingLastName}
                        onChange={(e) => handleInputChange('billingLastName', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billingAddress">Address *</Label>
                    <Input
                      id="billingAddress"
                      value={formData.billingAddress}
                      onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="billingCity">City *</Label>
                      <Input
                        id="billingCity"
                        value={formData.billingCity}
                        onChange={(e) => handleInputChange('billingCity', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="billingState">State *</Label>
                      <Select value={formData.billingState} onValueChange={(value) => handleInputChange('billingState', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MN">Minnesota</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          {/* Add more states as needed */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="billingZip">ZIP Code *</Label>
                      <Input
                        id="billingZip"
                        value={formData.billingZip}
                        onChange={(e) => handleInputChange('billingZip', e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {currentStep === 1 && (
                <div className="flex justify-end">
                  <Button type="button" onClick={() => setCurrentStep(2)}>
                    Continue to Shipping
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Shipping */}
        {currentStep >= 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="shippingSameAsBilling"
                  checked={formData.shippingSameAsBilling}
                  onCheckedChange={(checked) => handleInputChange('shippingSameAsBilling', checked as boolean)}
                />
                <Label htmlFor="shippingSameAsBilling">
                  Shipping address is the same as billing address
                </Label>
              </div>

              {!formData.shippingSameAsBilling && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shippingFirstName">First Name *</Label>
                      <Input
                        id="shippingFirstName"
                        value={formData.shippingFirstName}
                        onChange={(e) => handleInputChange('shippingFirstName', e.target.value)}
                        required={!formData.shippingSameAsBilling}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingLastName">Last Name *</Label>
                      <Input
                        id="shippingLastName"
                        value={formData.shippingLastName}
                        onChange={(e) => handleInputChange('shippingLastName', e.target.value)}
                        required={!formData.shippingSameAsBilling}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="shippingAddress">Address *</Label>
                    <Input
                      id="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={(e) => handleInputChange('shippingAddress', e.target.value)}
                      required={!formData.shippingSameAsBilling}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="shippingCity">City *</Label>
                      <Input
                        id="shippingCity"
                        value={formData.shippingCity}
                        onChange={(e) => handleInputChange('shippingCity', e.target.value)}
                        required={!formData.shippingSameAsBilling}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shippingState">State *</Label>
                      <Select value={formData.shippingState} onValueChange={(value) => handleInputChange('shippingState', value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MN">Minnesota</SelectItem>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="shippingZip">ZIP Code *</Label>
                      <Input
                        id="shippingZip"
                        value={formData.shippingZip}
                        onChange={(e) => handleInputChange('shippingZip', e.target.value)}
                        required={!formData.shippingSameAsBilling}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="specialInstructions">Special Delivery Instructions (Optional)</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  placeholder="Any special instructions for delivery..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              {currentStep === 2 && (
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back to Billing
                  </Button>
                  <Button type="button" onClick={() => setCurrentStep(3)}>
                    Continue to Review
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review & Terms */}
        {currentStep >= 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Review & Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-2">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.title} (×{item.quantity})</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 font-semibold">
                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Newsletter */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                    I agree to the Terms of Service and Privacy Policy. I understand that all sales are final
                    and each artwork comes with a certificate of authenticity.
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="subscribeNewsletter"
                    checked={formData.subscribeNewsletter}
                    onCheckedChange={(checked) => handleInputChange('subscribeNewsletter', checked as boolean)}
                    className="mt-1"
                  />
                  <Label htmlFor="subscribeNewsletter" className="text-sm leading-relaxed">
                    Subscribe to our newsletter for updates on new artwork and special events (optional)
                  </Label>
                </div>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setCurrentStep(2)}>
                  Back to Shipping
                </Button>
                <Button
                  type="submit"
                  disabled={!formData.agreeToTerms || isSubmitting}
                  className="min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Preparing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock className="h-4 w-4" />
                <span>Your information is secure and encrypted</span>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
