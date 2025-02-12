import Image from "next/image";
import Link from "next/link";
import concertData from "@/data/concert.json";

export default function Repertoire() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-12">
      <h1 className="text-4xl font-extrabold text-center mb-3 tracking-wide">Repertoire</h1>
      <h2 className="text-lg text-center text-gray-400 mb-8">
        Tap to see program notes
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {concertData.program.map((piece, index) => (
          <Link 
            key={index} 
            href={`/repertoire/${index}`} 
            className="group relative block bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all 
                      hover:bg-gray-700 hover:scale-[1.03] hover:shadow-xl duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                {piece.pieceName} <span className="text-gray-500">({piece.duration})</span>
              </h2>
              <p className="text-gray-300 mt-1 text-lg">
                {piece.composer} 
                {piece.born && piece.death ? (
                  <span className="text-gray-500"> ({piece.born}-{piece.death})</span>
                ) : ""}
              </p>
              {piece.movements && (
                <ul className="text-gray-400 text-base mt-1 list-decimal list-inside">
                  {piece.movements.map((movement, i) => (
                    <li key={i}>{movement}</li>
                  ))}
                </ul>
              )}
              {piece.soloists && (
                <p className="text-gray-300 text-base mt-1 font-bold">
                  {piece.soloists.map(([name, instrument]) => `${name}, ${instrument}`).join(', ')}
                </p>
              )}
            </div>
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-indigo-500 transition-colors"></div>
          </Link>
        ))}
      </div>
    </div>
  );
}
