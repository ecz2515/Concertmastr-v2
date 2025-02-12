"use client"; // Enables `useRouter` in Next.js App Router
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 p-2 bg-white/20 hover:bg-white/20 text-white rounded-full transition-all shadow-md"
    >
      <ArrowLeftIcon className="h-8 w-8" />
    </button>
  );
}
