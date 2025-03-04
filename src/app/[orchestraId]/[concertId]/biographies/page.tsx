"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/lib/AppStateProvider";

export default function Biographies() {
  const { orchestraId, concertId } = useParams();
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const [artists, setArtists] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching biographies for:", { orchestraId, concertId });

    if (!orchestraId || !concertId) {
      setErrorMessage("Invalid URL parameters.");
      return;
    }

    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("concert_id", concertId)
        .eq("orchestra_id", orchestraId)
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching artist biographies:", error);
        setErrorMessage("Could not load artist biographies.");
      } else {
        setArtists(data || []);
      }
    };

    fetchArtists();
  }, [orchestraId, concertId]);

  if (errorMessage) {
    return <p className="text-white text-center">{errorMessage}</p>;
  }

  if (!artists.length) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <h1 className={`font-extrabold text-center mb-6 ${enhancedContrast ? "underline" : ""}`} 
          style={{ fontSize: fontSize * 1.8 }}>
        Biographies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {artists.map((artist, index) => {
          const imageSrc = artist.image && artist.image.trim() !== ""
            ? `https://concertmastr-assets.s3.amazonaws.com/${orchestraId}/artists-images/${concertId}.${artist.artist_id}.jpg`
            : "/assets/images/default_musician.jpg";

          console.log("Image source for artist:", artist.name, imageSrc); // Debug log for image path

          return (
            <Link 
              key={artist.id ?? `artist-${index}`}  // Fallback to index if id is missing
              href={`/${orchestraId}/${concertId}/biographies/${artist.name}`}  
              className={`group relative flex items-stretch rounded-xl shadow-lg overflow-hidden transition-all 
                          hover:scale-[1.03] hover:shadow-xl duration-300
                          ${enhancedContrast ? "bg-gray-700 border border-white" : "bg-gray-800 hover:bg-gray-700"}`}
              style={{ minHeight: fontSize * 7 }} 
            >
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
