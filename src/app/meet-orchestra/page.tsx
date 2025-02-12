"use client";

import { useState } from "react";
import Image from "next/image";
import musiciansData from "@/data/musicians.json";

export default function MeetOrchestra() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <h1 className="text-3xl font-extrabold text-center mb-6">Meet the Orchestra</h1>

      <div className="max-w-5xl mx-auto space-y-8">
        {musiciansData.sections.map((section) => (
          <div key={section.section}>
            <h2 className="text-2xl font-bold mb-4">{section.section}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {section.musicians.map((musician, index) => {
                const [imageSrc, setImageSrc] = useState(
                  musician.photo
                    ? `/assets/orchestra_headshots/${musician.photo}`
                    : "/assets/images/default_musician.jpg"
                );

                return (
                  <div
                    key={index}
                    className="group relative bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all 
                               hover:bg-gray-700 hover:scale-[1.03] hover:shadow-xl duration-300"
                  >
                    <Image
                      src={imageSrc}
                      width={200}
                      height={200}
                      alt={musician.name}
                      className="object-cover w-full h-40"
                      priority
                      onError={() => setImageSrc("/assets/images/default_musician.jpg")}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {musician.name}
                      </h3>
                      {musician.position && (
                        <p className="text-gray-400 text-sm">{musician.position}</p>
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
    </div>
  );
}