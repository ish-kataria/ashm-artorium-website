"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to contact page since account management is no longer available
    router.push("/contact");
  }, [router]);

  return null;
}
