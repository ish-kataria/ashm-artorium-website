"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, LogIn } from "lucide-react";
import Link from "next/link";

interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function LoginForm({ onSuccess, redirectTo }: LoginFormProps) {
  const { login, state } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password);
      if (onSuccess) {
        onSuccess();
      } else if (redirectTo) {
        window.location.href = redirectTo;
      }
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <LogIn className="h-5 w-5" />
          Welcome Back
        </CardTitle>
        <p className="text-sm text-gray-600">
          Sign in to your account to continue
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {state.error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{state.error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={state.isLoading || !formData.email || !formData.password}
          >
            {state.isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </>
            )}
          </Button>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Account:</h4>
            <div className="space-y-2 text-xs text-blue-800">
              <div>
                <strong>Business Owner:</strong> ashmverma@gmail.com / admin123
              </div>
              <div className="text-gray-600">
                Regular customers can register for new accounts with customer access only
              </div>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Register Link */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
