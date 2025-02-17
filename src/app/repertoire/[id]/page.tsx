"use client";

import { notFound } from "next/navigation";
import { useParams } from "next/navigation"; // Fix: Use useParams for dynamic routing
import concertData from "@/data/concert.json";
import { useAppContext } from "@/lib/AppStateProvider"; // Import accessibility settings

export default function ProgramNote() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const params = useParams(); // Get params in a client component

  if (!params?.id) return <p className="text-white text-center">Loading...</p>; // Handle undefined params

  const id = parseInt(params.id as string);
  const piece = concertData.program[id];

  if (!piece) return notFound(); // Handle invalid piece ID

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className={`font-extrabold text-center mb-3 tracking-wide ${enhancedContrast ? "underline" : ""}`} 
            style={{ fontSize: fontSize * 1.8 }}>
          {piece.pieceName}
        </h1>
        <h2 className="text-center text-gray-400" style={{ fontSize: fontSize * 1.2 }}>
          {piece.composer}
        </h2>
        {piece.born && piece.death && (
          <p className="text-center text-gray-500 mb-8" style={{ fontSize: fontSize * 0.9 }}>
            ({piece.born} - {piece.death})
          </p>
        )}
        <p className="text-center text-gray-500 mb-8" style={{ fontSize }}>
          {piece.duration}
        </p>
        <p className="text-gray-200" style={{ fontSize }}>{piece.notes}</p>
      </div>

      {/* True Tone & Blue Light Overlays */}
      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />}
    </div>
  );
}
