import Image from "next/image";
import Link from "next/link";
import concertData from "@/data/concert.json";
export default function Biographies() {
  return (
    <div className="min-h-screen bg-black text-white pt-16 lg:pt-20 px-6 pb-8">
      <h1 className="text-3xl font-extrabold text-center mb-6">Biographies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {concertData.artists.map((artist, index) => {
          // Check if image exists
          const imageSrc = artist.image?.startsWith("/") 
            ? artist.image 
            : "/assets/images/default_musician.jpg"; 

          return (
            <Link 
              key={index} 
              href={`/biographies/${index}`} 
              className="block bg-white/10 rounded-lg shadow-lg overflow-hidden hover:bg-white/20 transition-all"
            >
              <Image
                src={imageSrc}
                width={300}
                height={300}
                alt={artist.imageAlt || `Photo of ${artist.name}`}
                className="w-full h-60 object-cover"
                priority
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{artist.name}</h2>
                <p className="text-gray-300">{artist.role || "Musician"}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
