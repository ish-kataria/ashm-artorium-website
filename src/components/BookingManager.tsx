"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  Mail,
  Phone,
  Edit3,
  Trash2,
  Download,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: "ART-2024-ABC123",
    type: "Kids Art Class",
    className: "Creative Canvas Adventures",
    date: "2024-12-21",
    time: "10:00 AM - 12:00 PM",
    participants: 2,
    status: "confirmed",
    totalAmount: 70,
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@email.com",
    customerPhone: "(555) 123-4567",
    specialRequests: "One child has a peanut allergy",
    bookingDate: "2024-12-15"
  },
  {
    id: "ART-2024-DEF456",
    type: "Birthday Party",
    className: "Canvas Celebration",
    date: "2024-12-28",
    time: "2:00 PM - 5:00 PM",
    participants: 8,
    status: "confirmed",
    totalAmount: 280,
    customerName: "Mike Chen",
    customerEmail: "mike.chen@email.com",
    customerPhone: "(555) 987-6543",
    specialRequests: "Birthday girl loves unicorns - can we incorporate that theme?",
    bookingDate: "2024-12-10"
  },
  {
    id: "ART-2024-GHI789",
    type: "Sip & Paint",
    className: "Wine & Watercolors",
    date: "2024-12-22",
    time: "7:00 PM - 9:30 PM",
    participants: 4,
    status: "pending",
    totalAmount: 220,
    customerName: "Emily Rodriguez",
    customerEmail: "emily.r@email.com",
    customerPhone: "(555) 456-7890",
    specialRequests: "",
    bookingDate: "2024-12-18"
  }
];

export default function BookingManager() {
  const [bookings, setBookings] = useState(mockBookings);
  const [filter, setFilter] = useState("all");

  const filteredBookings = bookings.filter(booking => {
    if (filter === "all") return true;
    return booking.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 border-b">
        {[
          { key: "all", label: "All Bookings" },
          { key: "confirmed", label: "Confirmed" },
          { key: "pending", label: "Pending" },
          { key: "cancelled", label: "Cancelled" }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              filter === tab.key
                ? "border-gray-900 text-gray-900"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <Badge className="ml-2" variant="secondary">
              {tab.key === "all" ? bookings.length : bookings.filter(b => b.status === tab.key).length}
            </Badge>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600 mb-4">
                {filter === "all"
                  ? "You haven't made any bookings yet."
                  : `No ${filter} bookings found.`}
              </p>
              <Button asChild>
                <a href="/classes">Book Your First Class</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredBookings.map((booking) => (
            <Card key={booking.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg">{booking.className}</CardTitle>
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{booking.status}</span>
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Booking #{booking.id}</p>
                    <p className="text-lg font-bold text-gray-900">${booking.totalAmount}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{booking.type}</p>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {/* Date & Time */}
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">{booking.time}</p>
                    </div>
                  </div>

                  {/* Participants */}
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.participants} {booking.participants === 1 ? 'participant' : 'participants'}
                      </p>
                      <p className="text-sm text-gray-600">Registered</p>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">{booking.customerName}</p>
                      <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Ashm ARTorium</p>
                      <p className="text-sm text-gray-600">825 Meander Ct, Medina</p>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                {booking.specialRequests && (
                  <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Special Requests:</p>
                        <p className="text-sm text-blue-800">{booking.specialRequests}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-4 border-t">
                  {booking.status === "confirmed" && (
                    <>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Ticket
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Modify Booking
                      </Button>
                    </>
                  )}

                  {booking.status !== "cancelled" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => cancelBooking(booking.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </Button>
                  )}

                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Studio
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 justify-start">
              <a href="/classes">
                <Calendar className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <p className="font-medium">Book New Class</p>
                  <p className="text-sm opacity-80">Schedule your next creative session</p>
                </div>
              </a>
            </Button>

            <Button variant="outline" className="h-auto p-4 justify-start">
              <MessageCircle className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Contact Support</p>
                <p className="text-sm opacity-80">Questions about your booking?</p>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 justify-start">
              <Download className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-medium">Download All Tickets</p>
                <p className="text-sm opacity-80">Get PDFs for upcoming events</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
