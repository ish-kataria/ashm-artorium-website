import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClassesHeader from "@/components/ClassesHeader";
import ClassTypeSelector from "@/components/ClassTypeSelector";

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      <ClassesHeader />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ClassTypeSelector />
      </div>

      <Footer />
    </div>
  );
}
