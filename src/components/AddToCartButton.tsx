"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface AddToCartButtonProps {
  artwork: {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    size: string;
    medium: string;
  };
  className?: string;
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

export default function AddToCartButton({
  artwork,
  className = "",
  size = "default",
  showText = true
}: AddToCartButtonProps) {
  const { dispatch } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: artwork.id,
        title: artwork.title,
        price: artwork.price,
        image: artwork.image,
        category: artwork.category,
        size: artwork.size,
        medium: artwork.medium
      }
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      className={`bg-gray-900 hover:bg-gray-800 transition-all duration-200 ${className}`}
      size={size}
      onClick={addToCart}
    >
      {isAdded ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          {showText && "Added!"}
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {showText && "Add to Cart"}
        </>
      )}
    </Button>
  );
}
