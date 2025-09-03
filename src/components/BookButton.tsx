"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookButtonProps {
  artwork: {
    id: number;
    title: string;
    price: number;
    category: string;
    size?: string;
    medium?: string;
  };
  className?: string;
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

export default function BookButton({
  artwork,
  className = "",
  size = "default",
  showText = true
}: BookButtonProps) {
  const router = useRouter();

  const handleBooking = () => {
    // Create subject line for the contact form
    const subject = encodeURIComponent(`Inquiry about "${artwork.title}" - ${artwork.category} Artwork`);
    const message = encodeURIComponent(
      `Hello Ashm,\n\nI'm interested in learning more about your artwork "${artwork.title}" (${artwork.category}${artwork.size ? `, ${artwork.size}` : ''}${artwork.medium ? `, ${artwork.medium}` : ''}).\n\nCould you please provide more information about:\n- Availability\n- Pricing details\n- Viewing options\n- Commission possibilities\n\nThank you!\n\nBest regards`
    );

    // Navigate to contact page with pre-filled subject and message
    router.push(`/contact?subject=${subject}&message=${message}&artwork=${artwork.id}`);
  };

  return (
    <Button
      className={`bg-gray-900 hover:bg-gray-800 transition-all duration-200 ${className}`}
      size={size}
      onClick={handleBooking}
    >
      <Calendar className="h-4 w-4 mr-2" />
      {showText && "Book Consultation"}
    </Button>
  );
}
