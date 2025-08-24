"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to contact page after a brief delay
    const timer = setTimeout(() => {
      router.push('/contact?subject=Purchase%20Inquiry&inquiryType=artwork');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-16 w-16 mx-auto mb-6 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Let's Discuss Your Purchase
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                I handle all artwork sales personally to ensure you have the best experience.
                Let's connect to discuss your interest, arrange a viewing, and finalize the details.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-green-900 mb-3">Personal Art Consultation</h3>
                <div className="text-sm text-green-800 space-y-2">
                  <p>• View artwork in person at my studio</p>
                  <p>• Discuss the story and inspiration behind each piece</p>
                  <p>• Flexible payment options and delivery arrangements</p>
                  <p>• Certificate of authenticity included</p>
                  <p>• Post-purchase support and care instructions</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h4 className="font-medium">Send Message</h4>
                    <p className="text-sm text-gray-600">Detailed inquiry form</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Phone className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h4 className="font-medium">Call Direct</h4>
                    <p className="text-sm text-gray-600">(763) 607-7480</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Mail className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h4 className="font-medium">Email</h4>
                    <p className="text-sm text-gray-600">ashmverma@gmail.com</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Start Conversation
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="tel:+17636077480">
                    <Phone className="h-5 w-5 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Redirecting to contact form in a few seconds...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
