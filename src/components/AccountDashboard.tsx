"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import {
  User,
  Package,
  Calendar,
  Settings,
  Mail,
  Phone,
  MapPin,
  Edit,
  Download,
  Eye,
  Heart,
  ShoppingBag
} from "lucide-react";

// Mock order data - will be replaced with real orders later

const mockOrders = [
  {
    id: "ART-2024-001",
    date: "2024-12-15",
    status: "delivered",
    total: 750,
    items: [
      { title: "Venetian Sunset", price: 750, image: "https://ext.same-assets.com/445690581/2001909374.jpeg" }
    ]
  },
  {
    id: "ART-2024-002",
    date: "2024-12-10",
    status: "processing",
    total: 450,
    items: [
      { title: "Abstract Texture Study", price: 450, image: "https://ext.same-assets.com/445690581/869056892.jpeg" }
    ]
  }
];

const mockBookings = [
  {
    id: "BOOK-2024-001",
    type: "Kids Art Class",
    className: "Creative Canvas Adventures",
    date: "2024-12-21",
    time: "10:00 AM - 12:00 PM",
    status: "confirmed",
    participants: 2
  },
  {
    id: "BOOK-2024-002",
    type: "Sip & Paint",
    className: "Wine & Watercolors",
    date: "2024-12-22",
    time: "7:00 PM - 9:30 PM",
    status: "confirmed",
    participants: 4
  }
];

export default function AccountDashboard() {
  const { state: authState, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  // Use real user data with local state for editing
  const [profile, setProfile] = useState({
    firstName: authState.user?.firstName || '',
    lastName: authState.user?.lastName || '',
    email: authState.user?.email || '',
    phone: authState.user?.phone || '',
    address: "825 Meander Ct", // Studio address
    city: "Medina",
    state: "MN",
    zip: "55446",
    joinDate: authState.user?.joinDate || new Date().toISOString()
  });

  // Save profile changes
  const handleSaveProfile = async () => {
    try {
      await updateProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        phone: profile.phone
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "Order History", icon: Package },
    { id: "bookings", label: "Class Bookings", icon: Calendar },
    { id: "profile", label: "Profile Settings", icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipping":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleProfileSave = handleSaveProfile;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>

            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-gray-900 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{mockOrders.length}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{mockBookings.length}</div>
                  <div className="text-sm text-gray-600">Class Bookings</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-sm text-gray-600">Favorite Artworks</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Package className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Order {mockOrders[0].id} delivered</p>
                      <p className="text-xs text-gray-600">December 18, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Class booking confirmed</p>
                      <p className="text-xs text-gray-600">December 16, 2024</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button asChild className="h-auto p-4 justify-start">
                    <Link href="/shop">
                      <ShoppingBag className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Continue Shopping</p>
                        <p className="text-sm opacity-80">Explore more artwork</p>
                      </div>
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="h-auto p-4 justify-start">
                    <Link href="/classes">
                      <Calendar className="h-5 w-5 mr-3" />
                      <div className="text-left">
                        <p className="font-medium">Book a Class</p>
                        <p className="text-sm opacity-80">Join upcoming sessions</p>
                      </div>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                {mockOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-600 mb-4">Start shopping to see your orders here</p>
                    <Button asChild>
                      <Link href="/shop">Browse Artwork</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <Card key={order.id} className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900">Order {order.id}</h4>
                              <p className="text-sm text-gray-600">
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                              <p className="text-lg font-semibold text-gray-900 mt-1">
                                ${order.total}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-4">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-gray-900">{item.title}</p>
                                  <p className="text-sm text-gray-600">${item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </Button>
                            {order.status === "delivered" && (
                              <Button size="sm" variant="outline">
                                <Package className="h-4 w-4 mr-2" />
                                Reorder
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {mockBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                    <p className="text-gray-600 mb-4">Book a class to see your reservations here</p>
                    <Button asChild>
                      <Link href="/classes">Browse Classes</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockBookings.map((booking) => (
                      <Card key={booking.id} className="border">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-900">{booking.className}</h4>
                              <p className="text-sm text-gray-600">{booking.type}</p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Date & Time</p>
                              <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
                              <p className="text-sm text-gray-600">{booking.time}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Participants</p>
                              <p className="font-medium">{booking.participants} people</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Calendar className="h-4 w-4 mr-2" />
                              Add to Calendar
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download Ticket
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-2" />
                              Modify Booking
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Profile Information</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? "Cancel" : "Edit"}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Address Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Address</h4>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={profile.address}
                          onChange={(e) => setProfile({...profile, address: e.target.value})}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={profile.city}
                            onChange={(e) => setProfile({...profile, city: e.target.value})}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={profile.state}
                            onChange={(e) => setProfile({...profile, state: e.target.value})}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input
                            id="zip"
                            value={profile.zip}
                            onChange={(e) => setProfile({...profile, zip: e.target.value})}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex gap-3">
                      <Button onClick={handleProfileSave}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Account Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium">
                      {new Date(profile.joinDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Account status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
