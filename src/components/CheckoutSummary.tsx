"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import {
  ShoppingCart,
  Truck,
  Shield,
  Award,
  Package
} from "lucide-react";

export default function CheckoutSummary() {
  const { state } = useCart();

  const subtotal = state.total;
  const shipping = subtotal >= 500 ? 0 : 25;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (state.items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 sticky top-24">
      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Summary ({state.itemCount} items)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                {item.quantity > 1 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {item.quantity}
                  </Badge>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.category}</p>
                <p className="text-sm text-gray-600">{item.size}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-600">
                    ${item.price} × {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Order Totals */}
      <Card>
        <CardHeader>
          <CardTitle>Order Total</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Shipping</span>
            </div>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Order Guarantees */}
      <Card>
        <CardHeader>
          <CardTitle>Your Order Includes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Certificate of Authenticity</p>
              <p className="text-sm text-gray-600">Official documentation for each artwork</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Package className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Professional Packaging</p>
              <p className="text-sm text-gray-600">Secure packaging for safe delivery</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">30-Day Return Policy</p>
              <p className="text-sm text-gray-600">Full refund if not completely satisfied</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900">Insured Shipping</p>
              <p className="text-sm text-gray-600">All orders are fully insured during transit</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Info */}
      {shipping === 0 ? (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-900">Free Shipping!</p>
                <p className="text-sm text-green-700">Your order qualifies for free shipping</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium text-blue-900">Standard Shipping</p>
                <p className="text-sm text-blue-700">
                  Add ${(500 - subtotal).toFixed(2)} more for free shipping
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estimated Delivery */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center">
            <p className="font-medium text-gray-900 mb-1">Estimated Delivery</p>
            <p className="text-sm text-gray-600">
              5-7 business days after order confirmation
            </p>
            <p className="text-xs text-gray-500 mt-1">
              You'll receive tracking information via email
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
