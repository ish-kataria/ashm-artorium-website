"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Lock, Eye, EyeOff } from "lucide-react";

interface AdminAuthProps {
  children: React.ReactNode;
}

export default function AdminAuth({ children }: AdminAuthProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Admin access key - in production, this should be more secure
  const ADMIN_ACCESS_KEY = "ArtStudio2024!";

  useEffect(() => {
    // Check if already authenticated
    const savedAuth = localStorage.getItem("ashm-admin-auth");
    if (savedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password === ADMIN_ACCESS_KEY) {
      localStorage.setItem("ashm-admin-auth", "authenticated");
      setIsAuthenticated(true);
    } else {
      setError("Invalid access code. Please contact Ashm for admin access.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ashm-admin-auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4 w-48"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-gray-600">Enter your access code to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password">Access Code</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin access code"
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800">
                Access Admin Panel
              </Button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Admin Access Required</strong><br />
                This area is restricted to authorized personnel only.
                Contact Ashm Verma for access credentials.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header with Logout */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Lock className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">Admin Panel</h1>
              <p className="text-xs text-gray-500">Ashm ARTorium Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Admin Content */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}
