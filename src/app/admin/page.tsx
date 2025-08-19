"use client";

import AdminAuth from "@/components/AdminAuth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Image as ImageIcon,
  Users,
  Calendar,
  Settings,
  BarChart3,
  ArrowRight
} from "lucide-react";

export default function AdminPage() {
  return (
    <AdminAuth>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your art studio and gallery</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Artwork Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-5 w-5 text-purple-600" />
                </div>
                Artwork Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Upload, edit, and manage your original artwork for the gallery
              </p>
              <Button asChild className="w-full bg-gray-900 hover:bg-gray-800">
                <Link href="/admin/artwork">
                  Manage Artwork
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Uploaded Artwork:</span>
                  <span className="font-semibold">Check Gallery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Storage Used:</span>
                  <span className="font-semibold">See Artwork Page</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Site Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Settings className="h-5 w-5 text-green-600" />
                </div>
                Site Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Access key features of your art studio website
              </p>
              <div className="space-y-2">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/shop">View Gallery</Link>
                </Button>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/contact">Contact Page</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Admin Panel Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Artwork Management:</h4>
              <ul className="space-y-1">
                <li>• Upload original artwork with images and videos</li>
                <li>• Set pricing and descriptions</li>
                <li>• Images auto-compressed for web performance</li>
                <li>• Monitor storage usage in real-time</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Security:</h4>
              <ul className="space-y-1">
                <li>• Admin access is password protected</li>
                <li>• Session expires when you logout</li>
                <li>• Access code: Keep it secure and private</li>
                <li>• Contact form handles all bookings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AdminAuth>
  );
}
