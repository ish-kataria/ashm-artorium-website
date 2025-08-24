import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import ArtistStory from "@/components/ArtistStory";
import StudioTour from "@/components/StudioTour";
import CallToAction from "@/components/CallToAction";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <AboutHero />
      <ArtistStory />
      <CallToAction />
      <Footer />
    </div>
  );
}
