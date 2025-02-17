"use client"; // Ensure this is a client component

import Image from "next/image";
import Link from "next/link";
import concertData from "@/data/concert.json";
import { useAppContext } from "@/lib/AppStateProvider"; // Corrected import path

export default function Biographies() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <h1 className={`font-extrabold text-center mb-6 ${enhancedContrast ? "underline" : ""}`} 
          style={{ fontSize: fontSize * 1.8 }}>
        Biographies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {concertData.artists.map((artist, index) => {
          // Check if image exists
          const imageSrc = artist.image?.startsWith("/") 
            ? artist.image 
            : "/assets/images/default_musician.jpg"; 

          return (
            <Link 
              key={index} 
              href={`/biographies/${index}`} 
              className={`group relative flex items-stretch rounded-xl shadow-lg overflow-hidden transition-all 
                          hover:scale-[1.03] hover:shadow-xl duration-300
                          ${enhancedContrast ? "bg-gray-700 border border-white" : "bg-gray-800 hover:bg-gray-700"}`}
              style={{ minHeight: fontSize * 7 }} // Allow the card to expand dynamically
            >
              {/* Square Image that fills the height of the card */}
              <div className="flex-shrink-0 w-[150px] sm:w-[180px] h-full">
                <Image
                  src={imageSrc}
                  width={180} 
                  height={180} 
                  alt={artist.imageAlt || `Photo of ${artist.name}`}
                  className="object-cover w-full h-full rounded-lg"
                  priority
                />
              </div>

              {/* Text Section that expands dynamically */}
              <div className="p-4 flex flex-col justify-center flex-grow min-w-0">
                <h2 className="font-semibold text-white group-hover:text-indigo-400 transition-colors break-words" 
                    style={{ fontSize: fontSize * 1.2 }}>
                  {artist.name}
                </h2>
                {artist.role && (
                  <p className="text-gray-400 break-words" style={{ fontSize }}>
                    {artist.role}
                  </p>
                )}
              </div>

              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-indigo-500 transition-colors"></div>
            </Link>
          );
        })}
      </div>

      {/* True Tone & Blue Light Overlays */}
      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />}
    </div>
  );
}
