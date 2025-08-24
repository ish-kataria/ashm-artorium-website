import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ArtworkGallery from "@/components/ArtworkGallery";
import ClassesSection from "@/components/ClassesSection";
import BirthdayParties from "@/components/BirthdayParties";
import SipAndPaint from "@/components/SipAndPaint";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <HeroSection />
      <ArtworkGallery />
      <ClassesSection />
      <BirthdayParties />
      <SipAndPaint />
      <Footer />
    </div>
  );
}
