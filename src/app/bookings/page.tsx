import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BookingManager from "@/components/BookingManager";

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              My Bookings
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              View and manage your upcoming art classes, events, and reservations
            </p>
          </div>

          <BookingManager />
        </div>
      </div>

      <Footer />
    </div>
  );
}
