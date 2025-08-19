"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page since admin functionality is no longer available
    router.push("/");
  }, [router]);

  return null;
}
