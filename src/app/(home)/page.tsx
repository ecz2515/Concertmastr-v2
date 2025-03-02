"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      {/* Hero Section */}
      <div className="relative w-full max-w-5xl text-center">
        {/* Optional background image */}
        {/* 
          If you'd like a background image across the entire screen, you can
          place an <Image> component behind your content, or do a background
          pattern in Tailwind:
          <div className="absolute inset-0 bg-[url('/path/to/your/bg.jpg')] bg-cover bg-center" />
        */}

        {/* Concertmastr Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/assets/images/CM_logo.png"
            width={120}
            height={120}
            alt="Concertmastr Logo"
            className="relative"
            style={{ width: "auto", height: "auto" }} // helps avoid ratio warnings
            priority
          />
        </div>

        {/* Headline & Subheadline */}
        <h1 className="text-4xl font-bold mb-4 tracking-tight md:text-5xl">
          Welcome to <span className="text-indigo-500">Concertmastr</span>
        </h1>
        <p className="text-gray-300 max-w-xl mx-auto text-lg leading-relaxed">
          Elevate your concert experience with digital programs, artist bios, 
          and interactive features. Ready to explore?
        </p>

        {/* Call-to-Action */}
        <div className="mt-8">
          <Link
            href="/explore"
            className="inline-block px-6 py-3 text-lg font-semibold bg-indigo-600 rounded-md hover:bg-indigo-500 transition-all shadow-md"
          >
            Explore Concerts
          </Link>
        </div>
      </div>
    </main>
  );
}
