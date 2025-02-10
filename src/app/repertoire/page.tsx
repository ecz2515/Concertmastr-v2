import Image from "next/image";
import Link from "next/link";
import concertData from "@/data/concert.json";

export default function Repertoire() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-3xl font-extrabold text-center mb-6">Repertoire & Program Notes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {concertData.program.map((piece, index) => (
          <Link 
            key={index} 
            href={`/repertoire/${index}`} 
            className="block bg-white/10 rounded-lg shadow-lg overflow-hidden hover:bg-white/20 transition-all"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold">{piece.pieceName}</h2>
              <p className="text-gray-300">{piece.composer}</p>
              <p className="text-gray-400 text-sm">{piece.duration}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
