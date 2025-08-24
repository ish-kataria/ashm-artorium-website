"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to contact page after a brief delay
    const timer = setTimeout(() => {
      router.push('/contact?subject=General%20Inquiry%20about%20Artwork');
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
              <MessageCircle className="h-16 w-16 mx-auto mb-6 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Let's Talk About Your Art Interest!
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                I'd love to discuss your artwork preferences personally. Each piece is unique,
                and I can provide detailed information about availability, viewing options,
                and create a custom experience for you.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-blue-900 mb-3">Why Contact Directly?</h3>
                <div className="text-sm text-blue-800 space-y-2">
                  <p>• Personalized artwork recommendations</p>
                  <p>• Flexible viewing appointments at my studio</p>
                  <p>• Discussion of payment plans and options</p>
                  <p>• Information about commission work</p>
                  <p>• Direct communication with the artist</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Contact Me Now
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/shop">
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Continue Browsing
                  </Link>
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
