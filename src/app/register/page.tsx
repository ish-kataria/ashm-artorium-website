"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to contact page since authentication is no longer available
    router.push("/contact");
  }, [router]);

  return null;
}
