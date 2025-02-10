"use client"; // Enables `useRouter` in Next.js App Router
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
  const router = useRouter();

  // Hide back button on home page
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center transition-all"
    >
      <ArrowLeftIcon className="h-6 w-6 mr-1" />
      <span className="hidden sm:inline">Back</span>
    </button>
  );
}
