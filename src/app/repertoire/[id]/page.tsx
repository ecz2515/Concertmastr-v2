import { notFound } from "next/navigation";
import concertData from "@/data/concert.json";

export default function ProgramNote({ params }: { params: { id: string } }) {
  const piece = concertData.program[parseInt(params.id)];

  if (!piece) return notFound(); // Handle invalid piece ID

  return (
    <div className="min-h-screen bg-black text-white pt-16 lg:pt-20 px-6 pb-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">{piece.pieceName}</h1>
        <h2 className="text-lg text-gray-300">{piece.composer}</h2>
        <p className="text-gray-400">{piece.duration}</p>
        <p className="mt-4 text-gray-200">{piece.notes}</p>
      </div>
    </div>
  );
}
