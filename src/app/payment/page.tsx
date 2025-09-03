"use client";

import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function PaymentPage() {
  useEffect(() => {
    // Redirect to contact for payment inquiries
    window.location.href = '/contact?subject=Payment%20Inquiry';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <div className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-16 w-16 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Redirecting for Payment</h3>
              <p className="text-gray-600 mb-6">
                Please contact us directly for payment arrangements and purchase inquiries.
              </p>
              <Button onClick={() => window.location.href = '/contact?subject=Payment%20Inquiry'}>
                Contact for Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
