"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CheckCircle,
  Mail,
  Truck,
  Calendar,
  Download,
  MessageCircle,
  ArrowLeft
} from "lucide-react";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order') || 'ART-000000';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Thank you for your purchase! Your order has been successfully placed and we're excited to share Ashm's beautiful artwork with you.
            </p>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Order Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number</span>
                    <span className="font-mono font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="font-medium">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">**** **** **** 3456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Status</span>
                    <span className="font-medium text-green-600">Confirmed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery</span>
                    <span className="font-medium">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Method</span>
                    <span className="font-medium">Standard Shipping</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Available</span>
                    <span className="font-medium text-blue-600">Within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What Happens Next */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">What Happens Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Confirmation Email</h4>
                  <p className="text-sm text-gray-600">
                    You'll receive a detailed confirmation email within the next few minutes
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Order Preparation</h4>
                  <p className="text-sm text-gray-600">
                    Your artwork will be carefully prepared and packaged within 1-2 business days
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Truck className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-2">Shipment & Delivery</h4>
                  <p className="text-sm text-gray-600">
                    You'll receive tracking information and your artwork will arrive in 5-7 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/account/orders">
                <Download className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">View Order Details</p>
                  <p className="text-sm opacity-80">Track your order status</p>
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/contact">
                <MessageCircle className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Contact Support</p>
                  <p className="text-sm opacity-80">Questions about your order?</p>
                </div>
              </Link>
            </Button>

            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/shop">
                <ArrowLeft className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Continue Shopping</p>
                  <p className="text-sm opacity-80">Explore more artwork</p>
                </div>
              </Link>
            </Button>
          </div>

          {/* Customer Care */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Questions or Concerns?
              </h3>
              <p className="text-gray-600 mb-4">
                I personally handle every order and I'm here to help! Don't hesitate to reach out if you have any questions about your purchase or need assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/contact">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact Ashm
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="tel:+17636077480">
                    Call (763) 607-7480
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Thank You Message */}
          <div className="text-center mt-12 p-8 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Thank You for Supporting Independent Art!
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your purchase directly supports Ashm's artistic journey and helps bring more creative
              opportunities to our community. Each piece you've chosen will bring joy and inspiration
              to your space for years to come.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
