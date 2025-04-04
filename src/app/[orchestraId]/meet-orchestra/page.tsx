"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { useAppContext } from "@/lib/AppStateProvider"; // Import accessibility settings
import { useParams } from "next/navigation"; // Import useParams for accessing route parameters
import { useCache } from "@/lib/CacheContext";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Musician {
  id: number;
  instrument: string;
  image: string | null; // Changed from photo to image
  name: string;
  position?: string;
}

export default function MeetOrchestra() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const [musicians, setMusicians] = useState<Musician[]>([]);
  const params = useParams();
  const { getMusicianFromCache, setMusicianCache } = useCache();

  useEffect(() => {
    const fetchMusicians = async () => {
      if (!params?.orchestraId) {
        console.error("Error: Orchestra ID is missing!");
        return;
      }

      // Try to get from cache first
      const cachedMusicians = getMusicianFromCache(params.orchestraId as string);
      if (cachedMusicians) {
        console.log("Using cached musicians");
        setMusicians(cachedMusicians);
        return;
      }

      // If not in cache, fetch from Supabase
      console.log("Fetching musicians for orchestraId:", params.orchestraId);
      
      const { data, error } = await supabase
        .from("orchestra_musicians")
        .select("*")
        .eq("orchestra_id", params.orchestraId)
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching musicians:", error);
        return;
      }

      // Sort musicians by ID to ensure correct order
      const sortedMusicians = (data as Musician[]).sort((a, b) => a.id - b.id);

      // Cache the musicians
      setMusicianCache(params.orchestraId as string, sortedMusicians);
      setMusicians(sortedMusicians);
    };

    fetchMusicians();
  }, [params?.orchestraId, getMusicianFromCache, setMusicianCache]);

  // Group musicians by instrument while preserving ID order
  const groupedMusicians = musicians.reduce((acc, musician) => {
    const existingGroup = acc.find(group => group.instrument === musician.instrument);
    if (existingGroup) {
      existingGroup.musicians.push(musician);
    } else {
      acc.push({
        instrument: musician.instrument,
        musicians: [musician]
      });
    }
    return acc;
  }, [] as Array<{ instrument: string; musicians: Musician[] }>);

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <h1
        className={`font-extrabold text-center mb-6 ${
          enhancedContrast ? "underline" : ""
        }`}
        style={{ fontSize: fontSize * 1.8 }}
      >
        Meet the Orchestra
      </h1>

      <div className="max-w-5xl mx-auto space-y-8">
        {groupedMusicians.length > 0 ? (
          groupedMusicians.map(({ instrument, musicians }) => (
            <div key={instrument} className="mb-8">
              <h2 className="font-bold mb-4" style={{ fontSize: fontSize * 1.4 }}>
                {instrument}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {musicians.map((musician) => {
                  const orchestraId = params.orchestraId || "default_orchestra";
                  const imageUrl = musician.image && musician.image.trim() !== ""
                    ? `https://concertmastr-assets.s3.amazonaws.com/${orchestraId}/musicians/${musician.image}`
                    : "/assets/images/default_musician.jpg";

                  return (
                    <div
                      key={musician.id}
                      className={`group relative rounded-xl shadow-lg overflow-hidden transition-all 
                                  hover:scale-[1.03] hover:shadow-xl duration-300
                                  ${
                                    enhancedContrast
                                      ? "bg-gray-700 border border-white"
                                      : "bg-gray-800 hover:bg-gray-700"
                                  }`}
                      style={{ minHeight: fontSize * 7 }}
                    >
                      <div className="w-full h-auto aspect-square relative">
                        <Image
                          src={imageUrl}
                          alt={musician.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          onError={() => {
                            const imgElement = document.querySelector(`[alt="${musician.name}"]`) as HTMLImageElement;
                            if (imgElement) {
                              imgElement.src = "/assets/images/default_musician.jpg";
                            }
                            return true;
                          }}
                          unoptimized={true}
                        />
                      </div>

                      <div className="p-4 flex flex-col justify-center">
                        <h3
                          className="font-semibold text-white group-hover:text-indigo-400 transition-colors break-words"
                          style={{ fontSize: fontSize * 1.2 }}
                        >
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
          ))
        ) : (
          <p className="text-gray-400 text-center">Loading musicians...</p>
        )}
      </div>

      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />}
    </div>
  );
}
