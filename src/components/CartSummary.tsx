"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Truck,
  Shield,
  Gift,
  CreditCard,
  Tag,
  Info
} from "lucide-react";

export default function CartSummary() {
  const { state } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const subtotal = state.total;
  const shipping = subtotal >= 500 ? 0 : 25;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax - discount;

  const applyPromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "welcome10") {
      setDiscount(subtotal * 0.1);
      setPromoApplied(true);
    } else if (promoCode.toLowerCase() === "artist20") {
      setDiscount(subtotal * 0.2);
      setPromoApplied(true);
    } else {
      setDiscount(0);
      setPromoApplied(false);
    }
  };

  if (state.items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 sticky top-24">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal ({state.itemCount} items)</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          {/* Shipping */}
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

          {/* Tax */}
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          {/* Discount */}
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({promoCode.toUpperCase()})</span>
              <span className="font-medium">-${discount.toFixed(2)}</span>
            </div>
          )}

          <Separator />

          {/* Total */}
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Free Shipping Notice */}
          {shipping > 0 && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Almost there!</p>
                  <p>Add ${(500 - subtotal).toFixed(2)} more for free shipping</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Promo Code */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Promo Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <Label htmlFor="promoCode">Enter promo code</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="promoCode"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g., WELCOME10"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  onClick={applyPromoCode}
                  disabled={!promoCode}
                >
                  Apply
                </Button>
              </div>
            </div>

            {promoApplied && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">
                  ✓ Promo code applied successfully!
                </p>
              </div>
            )}

            <div className="text-xs text-gray-500">
              <p>Available codes: WELCOME10 (10% off), ARTIST20 (20% off)</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checkout Button */}
      <Card>
        <CardContent className="p-6">
          <Button asChild size="lg" className="w-full mb-4">
            <Link href="/checkout">
              <CreditCard className="h-5 w-5 mr-2" />
              Proceed to Checkout
            </Link>
          </Button>

          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Secure checkout with SSL encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-600" />
              <span>Free shipping on orders over $500</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-purple-600" />
              <span>Certificate of authenticity included</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">We Accept</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 border border-gray-200 rounded text-center text-xs font-medium">
              Visa
            </div>
            <div className="p-2 border border-gray-200 rounded text-center text-xs font-medium">
              Mastercard
            </div>
            <div className="p-2 border border-gray-200 rounded text-center text-xs font-medium">
              Amex
            </div>
            <div className="p-2 border border-gray-200 rounded text-center text-xs font-medium">
              PayPal
            </div>
            <div className="p-2 border border-gray-200 rounded text-center text-xs font-medium">
              Apple Pay
            </div>
            <div className="p-2 border border-gray-200 rounded text-center text-xs font-medium">
              Google Pay
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
