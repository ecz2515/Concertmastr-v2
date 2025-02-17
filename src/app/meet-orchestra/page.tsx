"use client";

import { useState } from "react";
import Image from "next/image";
import musiciansData from "@/data/musicians.json";
import { useAppContext } from "@/lib/AppStateProvider"; // Import accessibility settings

export default function MeetOrchestra() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();

  // Initialize state for all musician images, ensuring no empty strings
  const initialImages = musiciansData.sections.flatMap((section) =>
    section.musicians.map((musician) =>
      musician.photo && musician.photo.trim() !== ""
        ? `/assets/orchestra_headshots/${musician.photo}`
        : "/assets/images/default_musician.jpg"
    )
  );
  const [imageSources, setImageSources] = useState(initialImages);

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <h1 className={`font-extrabold text-center mb-6 ${enhancedContrast ? "underline" : ""}`} 
          style={{ fontSize: fontSize * 1.8 }}>
        Meet the Orchestra
      </h1>

      <div className="max-w-5xl mx-auto space-y-8">
        {musiciansData.sections.map((section, sectionIndex) => (
          <div key={section.section}>
            <h2 className="font-bold mb-4" style={{ fontSize: fontSize * 1.4 }}>
              {section.section}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {section.musicians.map((musician, musicianIndex) => {
                const imageIndex = sectionIndex * 100 + musicianIndex; // Unique index for each musician

                return (
                  <div
                    key={musicianIndex}
                    className={`group relative rounded-xl shadow-lg overflow-hidden transition-all 
                                hover:scale-[1.03] hover:shadow-xl duration-300
                                ${enhancedContrast ? "bg-gray-700 border border-white" : "bg-gray-800 hover:bg-gray-700"}`}
                    style={{ minHeight: fontSize * 7 }}
                  >
                    {/* Square Image with Fallback Handling */}
                    <div className="w-full h-auto aspect-square">
                      <Image
                        src={imageSources[imageIndex] || "/assets/images/default_musician.jpg"}
                        width={200}
                        height={200}
                        alt={musician.name}
                        className="object-cover w-full h-full"
                        priority
                        onError={() => {
                          setImageSources((prev) => {
                            if (prev[imageIndex] !== "/assets/images/default_musician.jpg") {
                              const updatedImages = [...prev];
                              updatedImages[imageIndex] = "/assets/images/default_musician.jpg";
                              return updatedImages;
                            }
                            return prev;
                          });
                        }}
                      />
                    </div>

                    {/* Text Content */}
                    <div className="p-4 flex flex-col justify-center">
                      <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors break-words"
                          style={{ fontSize: fontSize * 1.2 }}>
                        {musician.name}
                      </h3>
                      {musician.position && (
                        <p className="text-gray-400 break-words" style={{ fontSize }}>
                          {musician.position}
                        </p>
                      )}
                    </div>

                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-indigo-500 transition-colors"></div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* True Tone & Blue Light Overlays */}
      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />}
    </div>
  );
}
