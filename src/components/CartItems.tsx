"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Heart
} from "lucide-react";

export default function CartItems() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id, quantity }
    });
  };

  const removeItem = (id: number) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.items.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added any artwork to your cart yet.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/shop">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/classes">
                Book a Class
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Cart Items ({state.itemCount})
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearCart}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          Clear Cart
        </Button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {state.items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <Link href={`/artwork/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full md:w-32 h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                    />
                  </Link>
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-3">
                  <div>
                    <Link href={`/artwork/${item.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{item.category}</Badge>
                      <span className="text-sm text-gray-600">{item.medium}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{item.size}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-100 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[60px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Action Buttons */}
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-lg font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${item.price} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Continue Shopping */}
      <div className="pt-6 border-t">
        <Button asChild variant="outline">
          <Link href="/shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
