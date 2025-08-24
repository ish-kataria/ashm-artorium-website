"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

interface ClassBookButtonProps {
  classInfo: {
    id?: string;
    name: string;
    type: string;
    price: number;
    duration?: string;
    ageGroup?: string;
    date?: string;
    time?: string;
  };
  className?: string;
  size?: "sm" | "default" | "lg";
  showText?: boolean;
}

export default function ClassBookButton({
  classInfo,
  className = "",
  size = "default",
  showText = true
}: ClassBookButtonProps) {
  const router = useRouter();

  const handleBooking = () => {
    // Create subject line for the contact form
    const subject = encodeURIComponent(`Class Booking Request - ${classInfo.name}`);
    const message = encodeURIComponent(
      `Hello Ashm,\n\nI'm interested in booking the "${classInfo.name}" class.\n\nClass Details:\n- Type: ${classInfo.type}\n- Price: $${classInfo.price}${classInfo.duration ? `\n- Duration: ${classInfo.duration}` : ''}${classInfo.ageGroup ? `\n- Age Group: ${classInfo.ageGroup}` : ''}${classInfo.date ? `\n- Preferred Date: ${classInfo.date}` : ''}${classInfo.time ? `\n- Time: ${classInfo.time}` : ''}\n\nCould you please let me know:\n- Available dates and times\n- What to bring/expect\n- Cancellation policy\n- Payment options\n\nThank you!\n\nBest regards`
    );

    // Navigate to contact page with pre-filled subject and message
    router.push(`/contact?subject=${subject}&message=${message}&class=${classInfo.id || classInfo.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <Button
      className={`bg-gray-900 hover:bg-gray-800 transition-all duration-200 ${className}`}
      size={size}
      onClick={handleBooking}
    >
      <Calendar className="h-4 w-4 mr-2" />
      {showText && "Book Now"}
    </Button>
  );
}
