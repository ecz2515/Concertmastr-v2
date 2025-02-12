import Image from "next/image";
import Link from "next/link";
import concertData from "@/data/concert.json";

export default function Biographies() {
  return (
    <div className="min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <h1 className="text-3xl font-extrabold text-center mb-6">Biographies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {concertData.artists.map((artist, index) => {
          // Check if image exists
          const imageSrc = artist.image?.startsWith("/") 
            ? artist.image 
            : "/assets/images/default_musician.jpg"; 

          return (
            <Link 
              key={index} 
              href={`/biographies/${index}`} 
              className="group relative flex bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all 
                        hover:bg-gray-700 hover:scale-[1.03] hover:shadow-xl duration-300"
            >
              <Image
                src={imageSrc}
                width={150}
                height={150}
                alt={artist.imageAlt || `Photo of ${artist.name}`}
                className="object-cover"
                priority
              />
              <div className="p-4 flex flex-col justify-center">
                <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {artist.name}
                </h2>
                {artist.role && (
                  <p className="text-gray-400">{artist.role}</p>
                )}
              </div>
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-indigo-500 transition-colors"></div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
