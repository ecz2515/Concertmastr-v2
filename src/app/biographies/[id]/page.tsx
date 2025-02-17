"use client"; // Ensure this is a client component

import { notFound } from "next/navigation";
import { useParams } from "next/navigation"; // Use useParams for client-side routing
import Image from "next/image";
import concertData from "@/data/concert.json";
import { useAppContext } from "@/lib/AppStateProvider"; // Corrected import path

export default function Biography() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const params = useParams(); // Get params in a client component

  if (!params?.id) return <p className="text-white text-center">Loading...</p>; // Handle undefined params

  const id = parseInt(params.id as string); // Ensure id is parsed safely
  const artist = concertData.artists[id];

  if (!artist) return notFound(); // Handle invalid artist ID

  // Check if image exists and starts with "/"
  const imageSrc = artist.image?.startsWith("/") 
    ? artist.image 
    : "/assets/images/default_musician.jpg";

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <div className="max-w-3xl mx-auto">
        <Image
          src={imageSrc}
          width={400}
          height={400}
          alt={artist.imageAlt || artist.name}
          className="w-60 h-60 object-cover rounded-lg mx-auto"
        />
        <h1 className={`font-bold mt-4 text-center ${enhancedContrast ? 'underline' : ''}`} 
            style={{ fontSize: fontSize * 1.8 }}>
          {artist.name}
        </h1>
        {artist.role && (
          <h2 className="text-lg text-gray-300 text-center" style={{ fontSize }}>
            {artist.role}
          </h2>
        )}
        <p className="mt-8 text-gray-200" style={{ fontSize }}>
          {artist.bio}
        </p>
      </div>

      {/* True Tone & Blue Light Overlays */}
      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />}
    </div>
  );
}
