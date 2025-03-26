"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useAppContext } from "@/lib/AppStateProvider"; // Import accessibility settings
import { useCache } from "@/lib/CacheContext";

export default function ProgramNote() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const { orchestraId, concertId, pieceId } = useParams();
  const { getRepertoireFromCache } = useCache();
  const [piece, setPiece] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("Loading program note for:", { orchestraId, concertId, pieceId });

    if (!orchestraId || !concertId || !pieceId) {
      setErrorMessage("Invalid URL parameters.");
      return;
    }

    // Get repertoire from cache
    const cachedRepertoire = getRepertoireFromCache(orchestraId, concertId);
    if (cachedRepertoire) {
      const foundPiece = cachedRepertoire.find((p: any) => p.id === pieceId);
      if (foundPiece) {
        console.log("Found piece in cache:", foundPiece);
        setPiece(foundPiece);
        return;
      }
    }

    setErrorMessage("Program note not found.");
  }, [orchestraId, concertId, pieceId, getRepertoireFromCache]);

  if (errorMessage) {
    return <p className="text-white text-center">{errorMessage}</p>;
  }

  if (!piece) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className={`font-extrabold text-center mb-3 tracking-wide ${enhancedContrast ? "underline" : ""}`} 
            style={{ fontSize: fontSize * 2.0 }}>
          {piece.piece_name}
        </h1>
        <h2 className="text-center text-gray-400" style={{ fontSize: fontSize * 1.4 }}>
          {piece.composer}
        </h2>
        {piece.born && piece.death && (
          <p className="text-center text-gray-500" style={{ fontSize: fontSize * 1.2 }}>
            ({piece.born} - {piece.death})
          </p>
        )}
        {piece.duration && (
          <p className="text-center text-gray-500 mb-8" style={{ fontSize: fontSize * 1.2 }}>
            {piece.duration}
          </p>
        )}
        <p className="text-gray-200" style={{ fontSize }}>{piece.program_notes}</p>
      </div>

      {/* True Tone & Blue Light Overlays */}
      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />}
    </div>
  );
}
