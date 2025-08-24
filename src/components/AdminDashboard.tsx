"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Package,
  ShoppingCart,
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  Mail,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Search,
  Filter,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  AlertCircle,
  BarChart3,
  Star,
  MessageSquare,
  Image,
  Save
} from "lucide-react";

// Define interfaces for type safety
interface Artwork {
  id: number;
  title: string;
  price: number;
  category: string;
  size: string;
  medium: string;
  description: string;
  images: string[];
  dateCreated: string;
  status: string;
}

interface Class {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  ageGroup: string;
  maxStudents: number;
  schedule: string;
  materials: string;
  dateCreated: string;
  status: string;
}

interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  time: string;
  price: number;
  capacity: number;
  type: string;
  dateCreated: string;
  status: string;
}

interface Order {
  id: number;
  total: number;
}

interface Customer {
  id: number;
  name: string;
}

interface AdminData {
  artwork: Artwork[];
  classes: Class[];
  events: Event[];
  orders: Order[];
  customers: Customer[];
  bookings: any[];
}

// Real data state - starts empty, will be populated by admin
const initialData: AdminData = {
  artwork: [],
  classes: [],
  events: [],
  orders: [],
  customers: [],
  bookings: []
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{type: string, item: any} | null>(null);
  const [adminData, setAdminData] = useState<AdminData>(initialData);
  const [imageUploadError, setImageUploadError] = useState("");

  // Form states for adding/editing
  const [artworkForm, setArtworkForm] = useState<{
    title: string;
    price: string;
    category: string;
    size: string;
    medium: string;
    description: string;
    images: string[];
  }>({
    title: "",
    price: "",
    category: "",
    size: "",
    medium: "",
    description: "",
    images: []
  });

  const [classForm, setClassForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    ageGroup: "",
    maxStudents: "",
    schedule: "",
    materials: ""
  });

  const [eventForm, setEventForm] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    price: "",
    capacity: "",
    type: ""
  });

  // Image upload handler with proper typing and error handling
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setImageUploadError("");
    const fileArray = Array.from(files);

    // Validate file types and sizes
    const validFiles = fileArray.filter(file => {
      if (!file.type.startsWith('image/')) {
        setImageUploadError("Please select only image files");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setImageUploadError("Image files must be smaller than 5MB");
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setArtworkForm(prev => ({
            ...prev,
            images: [...prev.images, e.target!.result as string]
          }));
        }
      };
      reader.onerror = () => {
        setImageUploadError("Failed to read image file");
      };
      reader.readAsDataURL(file);
    });
  };

  // CRUD Operations
  const handleAddArtwork = () => {
    if (artworkForm.title && artworkForm.price) {
      const newArtwork = {
        id: Date.now(),
        ...artworkForm,
        price: parseFloat(artworkForm.price),
        dateCreated: new Date().toISOString(),
        status: "available"
      };
      setAdminData(prev => ({
        ...prev,
        artwork: [...prev.artwork, newArtwork]
      }));
      setArtworkForm({ title: "", price: "", category: "", size: "", medium: "", description: "", images: [] });
      setIsAddingItem(false);
    }
  };

  const handleAddClass = () => {
    if (classForm.name && classForm.price) {
      const newClass = {
        id: Date.now(),
        ...classForm,
        price: parseFloat(classForm.price),
        maxStudents: parseInt(classForm.maxStudents),
        dateCreated: new Date().toISOString(),
        status: "active"
      };
      setAdminData(prev => ({
        ...prev,
        classes: [...prev.classes, newClass]
      }));
      setClassForm({ name: "", description: "", price: "", duration: "", ageGroup: "", maxStudents: "", schedule: "", materials: "" });
      setIsAddingItem(false);
    }
  };

  const handleAddEvent = () => {
    if (eventForm.name && eventForm.date) {
      const newEvent = {
        id: Date.now(),
        ...eventForm,
        price: parseFloat(eventForm.price),
        capacity: parseInt(eventForm.capacity),
        dateCreated: new Date().toISOString(),
        status: "upcoming"
      };
      setAdminData(prev => ({
        ...prev,
        events: [...prev.events, newEvent]
      }));
      setEventForm({ name: "", description: "", date: "", time: "", price: "", capacity: "", type: "" });
      setIsAddingItem(false);
    }
  };

  const handleDeleteItem = (type: keyof AdminData, id: number) => {
    setAdminData(prev => ({
      ...prev,
      [type]: (prev[type] as any[]).filter((item: any) => item.id !== id)
    }));
  };

  const handleEditItem = (type: string, item: any) => {
    setSelectedItem({ type, item });
    if (type === 'artwork') setArtworkForm(item);
    if (type === 'classes') setClassForm(item);
    if (type === 'events') setEventForm(item);
    setIsEditingItem(true);
  };

  const handleUpdateItem = () => {
    if (!selectedItem) return;
    const { type, item } = selectedItem;
    let updatedItem: any;

    if (type === 'artwork') updatedItem = { ...item, ...artworkForm, price: parseFloat(artworkForm.price) };
    if (type === 'classes') updatedItem = { ...item, ...classForm, price: parseFloat(classForm.price) };
    if (type === 'events') updatedItem = { ...item, ...eventForm, price: parseFloat(eventForm.price) };

    setAdminData(prev => ({
      ...prev,
      [type]: (prev[type as keyof AdminData] as any[]).map((i: any) => i.id === item.id ? updatedItem : i)
    }));
    setIsEditingItem(false);
    setSelectedItem(null);
  };

  // Calculate real stats
  const totalRevenue = adminData.orders.reduce((sum, order) => sum + order.total, 0);
  const totalArtwork = adminData.artwork.length;
  const totalClasses = adminData.classes.length;
  const totalCustomers = adminData.customers.length;

  return (
    <div className="space-y-8">
      {/* Real Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">From {adminData.orders.length} completed orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Artwork Listed</p>
                <p className="text-2xl font-bold text-gray-900">{totalArtwork}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Available for viewing/purchase</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Classes</p>
                <p className="text-2xl font-bold text-gray-900">{totalClasses}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Classes available for booking</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">Registered users</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Content Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="artwork">Artwork</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  <Button className="h-auto p-4 justify-start" onClick={() => { setActiveTab("artwork"); setIsAddingItem(true); }}>
                    <Plus className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Add New Artwork</p>
                      <p className="text-sm opacity-80">Upload and list new pieces</p>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start" onClick={() => { setActiveTab("classes"); setIsAddingItem(true); }}>
                    <Calendar className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Create New Class</p>
                      <p className="text-sm opacity-80">Add art classes or workshops</p>
                    </div>
                  </Button>

                  <Button variant="outline" className="h-auto p-4 justify-start" onClick={() => { setActiveTab("events"); setIsAddingItem(true); }}>
                    <Star className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Schedule Event</p>
                      <p className="text-sm opacity-80">Add sip & paint or special events</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                {adminData.artwork.length === 0 && adminData.classes.length === 0 ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-3" />
                      <p className="text-gray-700 font-medium">Clean Dashboard Ready!</p>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>✅ All demo/fake data removed</p>
                      <p>✅ Only admin access remains</p>
                      <p>✅ Ready for your real content</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-gray-700 mb-2">Start by:</p>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Adding your first artwork with photos</li>
                        <li>• Creating art classes and schedules</li>
                        <li>• Setting up special events</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Recent Activity:</p>
                    {[...adminData.artwork.slice(-2), ...adminData.classes.slice(-2)].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                        <Package className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{(item as any).title || (item as any).name} added</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Artwork Management Tab */}
        <TabsContent value="artwork" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Artwork Management</CardTitle>
                <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Artwork
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Artwork</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Title *</Label>
                          <Input
                            value={artworkForm.title}
                            onChange={(e) => setArtworkForm(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Artwork title"
                          />
                        </div>
                        <div>
                          <Label>Price ($) *</Label>
                          <Input
                            type="number"
                            value={artworkForm.price}
                            onChange={(e) => setArtworkForm(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Category</Label>
                          <Select value={artworkForm.category} onValueChange={(value) => setArtworkForm(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="abstract">Abstract</SelectItem>
                              <SelectItem value="landscape">Landscape</SelectItem>
                              <SelectItem value="portrait">Portrait</SelectItem>
                              <SelectItem value="mixed-media">Mixed Media</SelectItem>
                              <SelectItem value="sculpture">Sculpture</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Size</Label>
                          <Input
                            value={artworkForm.size}
                            onChange={(e) => setArtworkForm(prev => ({ ...prev, size: e.target.value }))}
                            placeholder="e.g., 16x20 inches"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Medium</Label>
                        <Input
                          value={artworkForm.medium}
                          onChange={(e) => setArtworkForm(prev => ({ ...prev, medium: e.target.value }))}
                          placeholder="e.g., Acrylic on Canvas"
                        />
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={artworkForm.description}
                          onChange={(e) => setArtworkForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe the artwork..."
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Images *</Label>
                        <div className="mt-2">
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="mb-3"
                          />
                          {artworkForm.images.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                              {artworkForm.images.map((img, index) => (
                                <div key={index} className="relative">
                                  <img src={img} alt={`Preview ${index + 1}`} className="w-full h-20 object-cover rounded" />
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    className="absolute top-1 right-1 h-6 w-6 p-0"
                                    onClick={() => setArtworkForm(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))}
                                  >
                                    ×
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddingItem(false)}>Cancel</Button>
                        <Button onClick={handleAddArtwork} disabled={!artworkForm.title || !artworkForm.price}>
                          <Save className="h-4 w-4 mr-2" />
                          Add Artwork
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {adminData.artwork.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Artwork Yet</h3>
                  <p className="text-gray-500 mb-4">Start showcasing your art by adding your first piece.</p>
                  <Button onClick={() => setIsAddingItem(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Artwork
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {adminData.artwork.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                            {item.images?.[0] ? (
                              <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Image className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-sm text-gray-600">{item.category} • {item.size}</p>
                            <p className="text-xs text-gray-500">{item.medium}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${item.price}</p>
                            <Badge className="bg-green-100 text-green-800">Available</Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem('artwork', item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteItem('artwork', item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Classes Management Tab */}
        <TabsContent value="classes" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Classes Management</CardTitle>
                <Dialog open={isAddingItem && activeTab === 'classes'} onOpenChange={setIsAddingItem}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Class</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Class Name *</Label>
                          <Input
                            value={classForm.name}
                            onChange={(e) => setClassForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Class name"
                          />
                        </div>
                        <div>
                          <Label>Price per Session ($) *</Label>
                          <Input
                            type="number"
                            value={classForm.price}
                            onChange={(e) => setClassForm(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="0.00"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Duration</Label>
                          <Input
                            value={classForm.duration}
                            onChange={(e) => setClassForm(prev => ({ ...prev, duration: e.target.value }))}
                            placeholder="e.g., 2 hours"
                          />
                        </div>
                        <div>
                          <Label>Age Group</Label>
                          <Input
                            value={classForm.ageGroup}
                            onChange={(e) => setClassForm(prev => ({ ...prev, ageGroup: e.target.value }))}
                            placeholder="e.g., Ages 6-10"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Max Students</Label>
                          <Input
                            type="number"
                            value={classForm.maxStudents}
                            onChange={(e) => setClassForm(prev => ({ ...prev, maxStudents: e.target.value }))}
                            placeholder="8"
                          />
                        </div>
                        <div>
                          <Label>Schedule</Label>
                          <Input
                            value={classForm.schedule}
                            onChange={(e) => setClassForm(prev => ({ ...prev, schedule: e.target.value }))}
                            placeholder="e.g., Saturdays 10:00 AM"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={classForm.description}
                          onChange={(e) => setClassForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe the class..."
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label>Materials Included</Label>
                        <Textarea
                          value={classForm.materials}
                          onChange={(e) => setClassForm(prev => ({ ...prev, materials: e.target.value }))}
                          placeholder="List materials and supplies included..."
                          rows={2}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddingItem(false)}>Cancel</Button>
                        <Button onClick={handleAddClass} disabled={!classForm.name || !classForm.price}>
                          <Save className="h-4 w-4 mr-2" />
                          Add Class
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {adminData.classes.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Classes Yet</h3>
                  <p className="text-gray-500 mb-4">Start teaching by creating your first art class.</p>
                  <Button onClick={() => setIsAddingItem(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Class
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {adminData.classes.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.ageGroup} • {item.duration}</p>
                          <p className="text-xs text-gray-500">{item.schedule}</p>
                          <p className="text-xs text-gray-500">Max {item.maxStudents} students</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${item.price}/session</p>
                            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem('classes', item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteItem('classes', item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Management Tab */}
        <TabsContent value="events" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Events Management</CardTitle>
                <Dialog open={isAddingItem && activeTab === 'events'} onOpenChange={setIsAddingItem}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Event</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Event Name *</Label>
                          <Input
                            value={eventForm.name}
                            onChange={(e) => setEventForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Event name"
                          />
                        </div>
                        <div>
                          <Label>Event Type</Label>
                          <Select value={eventForm.type} onValueChange={(value) => setEventForm(prev => ({ ...prev, type: value }))}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sip-paint">Sip & Paint</SelectItem>
                              <SelectItem value="workshop">Workshop</SelectItem>
                              <SelectItem value="exhibition">Exhibition</SelectItem>
                              <SelectItem value="private">Private Event</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Date *</Label>
                          <Input
                            type="date"
                            value={eventForm.date}
                            onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Time</Label>
                          <Input
                            type="time"
                            value={eventForm.time}
                            onChange={(e) => setEventForm(prev => ({ ...prev, time: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Price ($)</Label>
                          <Input
                            type="number"
                            value={eventForm.price}
                            onChange={(e) => setEventForm(prev => ({ ...prev, price: e.target.value }))}
                            placeholder="0.00"
                          />
                        </div>
                        <div>
                          <Label>Capacity</Label>
                          <Input
                            type="number"
                            value={eventForm.capacity}
                            onChange={(e) => setEventForm(prev => ({ ...prev, capacity: e.target.value }))}
                            placeholder="20"
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Description</Label>
                        <Textarea
                          value={eventForm.description}
                          onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe the event..."
                          rows={4}
                        />
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddingItem(false)}>Cancel</Button>
                        <Button onClick={handleAddEvent} disabled={!eventForm.name || !eventForm.date}>
                          <Save className="h-4 w-4 mr-2" />
                          Add Event
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {adminData.events.length === 0 ? (
                <div className="text-center py-12">
                  <Star className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Events Yet</h3>
                  <p className="text-gray-500 mb-4">Schedule your first sip & paint or special event.</p>
                  <Button onClick={() => setIsAddingItem(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Event
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {adminData.events.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.type} • {item.date} at {item.time}</p>
                          <p className="text-xs text-gray-500">Capacity: {item.capacity} people</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${item.price}</p>
                            <Badge className="bg-orange-100 text-orange-800">Upcoming</Badge>
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => handleEditItem('events', item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteItem('events', item.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Orders Tab */}
        <TabsContent value="orders" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-500">Orders will appear here when customers make purchases or bookings.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditingItem} onOpenChange={setIsEditingItem}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {selectedItem?.type === 'artwork' ? 'Artwork' : selectedItem?.type === 'classes' ? 'Class' : 'Event'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedItem?.type === 'artwork' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Title *</Label>
                    <Input
                      value={artworkForm.title}
                      onChange={(e) => setArtworkForm(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Artwork title"
                    />
                  </div>
                  <div>
                    <Label>Price ($) *</Label>
                    <Input
                      type="number"
                      value={artworkForm.price}
                      onChange={(e) => setArtworkForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={artworkForm.description}
                    onChange={(e) => setArtworkForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the artwork..."
                    rows={3}
                  />
                </div>
              </>
            )}

            {selectedItem?.type === 'classes' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Class Name *</Label>
                    <Input
                      value={classForm.name}
                      onChange={(e) => setClassForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Class name"
                    />
                  </div>
                  <div>
                    <Label>Price per Session ($) *</Label>
                    <Input
                      type="number"
                      value={classForm.price}
                      onChange={(e) => setClassForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={classForm.description}
                    onChange={(e) => setClassForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the class..."
                    rows={3}
                  />
                </div>
              </>
            )}

            {selectedItem?.type === 'events' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Event Name *</Label>
                    <Input
                      value={eventForm.name}
                      onChange={(e) => setEventForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Event name"
                    />
                  </div>
                  <div>
                    <Label>Date *</Label>
                    <Input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the event..."
                    rows={3}
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditingItem(false)}>Cancel</Button>
              <Button onClick={handleUpdateItem}>
                <Save className="h-4 w-4 mr-2" />
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
