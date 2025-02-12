import { notFound } from "next/navigation";
import concertData from "@/data/concert.json";

export default function ProgramNote({ params }: { params: { id: string } }) {
  const piece = concertData.program[parseInt(params.id)];

  if (!piece) return notFound(); // Handle invalid piece ID

  return (
    <div className="min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-3 tracking-wide">{piece.pieceName}</h1>
        <h2 className="text-lg text-center text-gray-400">{piece.composer}</h2>
        {piece.born && piece.death && (
          <p className="text-center text-gray-500 text-sm mb-8">
            ({piece.born} - {piece.death})
          </p>
        )}
        <p className="text-center text-gray-500 text-base mb-8">{piece.duration}</p>
        <p className="text-gray-200">{piece.notes}</p>
      </div>
    </div>
  );
}
