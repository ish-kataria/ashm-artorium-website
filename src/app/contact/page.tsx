import { Suspense } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <ContactHero />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>}>
          <ContactForm />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
