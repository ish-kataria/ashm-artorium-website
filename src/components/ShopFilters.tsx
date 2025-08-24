"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Abstract", "Landscape", "Mixed Media", "Acrylic", "Oil"];
const priceRanges = ["Under $300", "$300 - $500", "$500 - $750", "$750 - $1000", "Over $1000"];
const sizes = ["Small (under 16\")", "Medium (16\" - 24\")", "Large (24\" - 36\")", "Extra Large (36\"+)"];

export default function ShopFilters() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange("");
    setSelectedSize("");
  };

  const hasActiveFilters = selectedCategory !== "All" || selectedPriceRange || selectedSize;

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge className="ml-2 bg-gray-900">
              {[selectedCategory !== "All", selectedPriceRange, selectedSize].filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Panel */}
      <Card className={`${showMobileFilters ? 'block' : 'hidden'} lg:block sticky top-24`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Category</h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Price Range Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedPriceRange(selectedPriceRange === range ? "" : range)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedPriceRange === range
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Size Filter */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Size</h4>
            <div className="space-y-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-3">
              Looking for a specific piece or considering a commission?
            </p>
            <Button variant="outline" size="sm" className="w-full text-sm">
              Contact Artist
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
