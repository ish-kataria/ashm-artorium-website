"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth, type RegisterData } from "@/contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus } from "lucide-react";
import Link from "next/link";

interface RegisterFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export default function RegisterForm({ onSuccess, redirectTo }: RegisterFormProps) {
  const { register, state } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    if (!formData.agreeToTerms) {
      return;
    }

    try {
      const registerData: RegisterData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone || undefined
      };

      await register(registerData);

      if (onSuccess) {
        onSuccess();
      } else if (redirectTo) {
        window.location.href = redirectTo;
      }
    } catch (error) {
      // Error is handled by the auth context
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isPasswordValid = formData.password.length >= 6;
  const doPasswordsMatch = formData.password === formData.confirmPassword;
  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    isPasswordValid &&
    doPasswordsMatch &&
    formData.agreeToTerms;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <UserPlus className="h-5 w-5" />
          Create Account
        </CardTitle>
        <p className="text-sm text-gray-600">
          Join the Ashm ARTorium community
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="First name"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email Address *</Label>
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

          {/* Phone */}
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative mt-1">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="(555) 123-4567"
                className="pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">Password *</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Create a password"
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
            {formData.password && !isPasswordValid && (
              <p className="text-xs text-red-600 mt-1">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword">Confirm Password *</Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {formData.confirmPassword && !doPasswordsMatch && (
              <p className="text-xs text-red-600 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Terms and Newsletter */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="subscribeNewsletter"
                checked={formData.subscribeNewsletter}
                onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="subscribeNewsletter" className="text-sm leading-relaxed">
                Subscribe to our newsletter for updates on new artwork, classes, and special events
              </Label>
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
            disabled={state.isLoading || !isFormValid}
          >
            {state.isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating Account...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Create Account
              </>
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
