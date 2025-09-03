import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PartiesHeader from "@/components/PartiesHeader";
import PartyPackageSelector from "@/components/PartyPackageSelector";

export default function PartiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navigation />
      <PartiesHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PartyPackageSelector />
      </div>

      <Footer />
    </div>
  );
}
