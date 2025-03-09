"use client"
import { useRouter } from "next/navigation"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.back()}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors"
      aria-label="Go back"
    >
      <ArrowLeftIcon className="h-5 w-5" />
    </button>
  )
}

