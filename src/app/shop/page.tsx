import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ShopHeader from "@/components/ShopHeader";
import ProductGrid from "@/components/ProductGrid";
import ShopFilters from "@/components/ShopFilters";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <ShopHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ShopFilters />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
