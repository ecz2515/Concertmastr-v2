"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { useAppContext } from "@/lib/AppStateProvider"; // Import accessibility settings
import { useCache } from "@/lib/CacheContext";

export default function ProgramNote() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const { orchestraId, concertId, pieceId } = useParams();
  const { getRepertoireFromCache, preloadAllData } = useCache();
  const [piece, setPiece] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Loading program note for:", { orchestraId, concertId, pieceId });

    if (!orchestraId || !concertId || !pieceId) {
      setErrorMessage("Invalid URL parameters.");
      setIsLoading(false);
      return;
    }

    const loadPiece = async () => {
      try {
        // Get repertoire from cache
        const cachedRepertoire = getRepertoireFromCache(orchestraId, concertId);
        console.log("Cached repertoire:", cachedRepertoire);

        if (cachedRepertoire) {
          // Convert pieceId to number for comparison
          const numericPieceId = parseInt(pieceId as string, 10);
          const foundPiece = cachedRepertoire.find((p: any) => p.id === numericPieceId);
          if (foundPiece) {
            console.log("Found piece in cache:", foundPiece);
            setPiece(foundPiece);
            setIsLoading(false);
            return;
          }
        }

        // If not in cache, try to preload the data
        console.log("Piece not found in cache, attempting to preload data...");
        await preloadAllData(orchestraId, concertId);
        
        // Check cache again after preload
        const updatedRepertoire = getRepertoireFromCache(orchestraId, concertId);
        console.log("Updated repertoire after preload:", updatedRepertoire);
        
        if (updatedRepertoire) {
          // Convert pieceId to number for comparison
          const numericPieceId = parseInt(pieceId as string, 10);
          const foundPiece = updatedRepertoire.find((p: any) => p.id === numericPieceId);
          if (foundPiece) {
            console.log("Found piece after preload:", foundPiece);
            setPiece(foundPiece);
            setIsLoading(false);
            return;
          }
        }

        setErrorMessage("Program note not found. Please check your internet connection and try again.");
      } catch (error) {
        console.error("Error loading program note:", error);
        setErrorMessage("Error loading program note. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadPiece();
  }, [orchestraId, concertId, pieceId, getRepertoireFromCache, preloadAllData]);

  if (errorMessage) {
    return (
      <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-white text-center">{errorMessage}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-white text-center">Loading program note...</p>
        </div>
      </div>
    );
  }

  if (!piece) {
    return (
      <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-white text-center">Program note not found.</p>
        </div>
      </div>
    );
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
