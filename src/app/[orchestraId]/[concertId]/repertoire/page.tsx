"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/lib/AppStateProvider"; // Import accessibility settings

export default function Repertoire() {
  const { orchestraId, concertId } = useParams();
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const [program, setProgram] = useState<{ pieces: any[]; intermissionAfter: number | null; intermissionDuration: number | null }>({ pieces: [], intermissionAfter: null, intermissionDuration: null });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("Fetching repertoire for:", orchestraId, concertId);

    const fetchProgram = async () => {
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("*")
        .eq("concert_id", concertId) // Match by concert_id
        .eq("orchestra_id", orchestraId)
        .order("id", { ascending: true }); // Ensure correct order

      const { data: concertData, error: concertError } = await supabase
        .from("concerts")
        .select("intermission_after, intermission_duration")
        .eq("id", concertId)
        .single(); // Fetch intermission details

      if (programError || concertError) {
        console.error("Error fetching program or concert details:", programError || concertError);
        setErrorMessage("Could not load program.");
      } else {
        setProgram({
          pieces: programData || [],
          intermissionAfter: concertData?.intermission_after ?? null,
          intermissionDuration: concertData?.intermission_duration ?? null,
        });
      }
    };

    fetchProgram();
  }, [orchestraId, concertId]);

  if (!program.pieces.length) {
    return <div className="text-center text-white">Loading... {errorMessage && `Error: ${errorMessage}`}</div>;
  }

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-12">
      <h1 className={`font-extrabold text-center mb-3 tracking-wide ${enhancedContrast ? "underline" : ""}`} 
          style={{ fontSize: fontSize * 1.8 }}>
        Repertoire
      </h1>
      <h2 className="text-lg text-center text-gray-400 mb-8" style={{ fontSize }}>
        Tap to see program notes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {program.pieces.map((piece, index) => (
          <div key={piece.id}>
            {program.intermissionAfter !== null && program.intermissionAfter === index && (
              <div key={`intermission-${index}`} className="text-center text-gray-300 italic w-full mb-4" style={{ fontSize }}>
                ~ {program.intermissionDuration} minute intermission ~
              </div>
            )}
            <Link 
              href={`/${orchestraId}/${concertId}/repertoire/${piece.id}`} 
              className={`group relative block rounded-xl shadow-lg overflow-hidden transition-all 
                          hover:bg-gray-700 hover:scale-[1.03] hover:shadow-xl duration-300
                          ${enhancedContrast ? "bg-gray-700 border border-white" : "bg-gray-800"}`}
            >
              <div className="p-6">
                <p className="text-gray-300 mt-1 text-lg" style={{ fontSize: fontSize * 1.4, lineHeight: fontSize > 16 ? 1.6 : 1.4 }}>
                  {piece.composer}
                </p>
                <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors"
                    style={{ fontSize: fontSize * 1.4, lineHeight: fontSize > 16 ? 1.6 : 1.4 }}>
                  {piece.piece_name}
                </h2>
                {piece.movements && piece.movements.length > 0 && (
                  <ul className="text-gray-400 text-base mt-1 list-none" style={{ fontSize, lineHeight: fontSize > 16 ? 1.6 : 1.4 }}>
                    {piece.movements.map((movement: string, i: number) => (
                      <li key={`${piece.id}-movement-${i}`} className="mb-2 mt-2">{movement}</li>
                    ))}
                  </ul>
                )}
                {piece.soloists && piece.soloists.length > 0 && (
                  <p className="text-gray-300 text-base mt-1 font-bold" style={{ fontSize, lineHeight: fontSize > 16 ? 1.6 : 1.4 }}>
                    {piece.soloists.join(", ")}
                  </p>
                )}
              </div>
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-indigo-500 transition-colors"></div>
            </Link>
          </div>
        ))}
      </div>

      {/* True Tone & Blue Light Overlays */}
      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />}
    </div>
  );
}
