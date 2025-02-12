import { notFound } from "next/navigation";
import { useRouter } from "next/router";
import Image from "next/image";
import concertData from "@/data/concert.json";

export default function Biography({ params }: { params: { id: string } }) {
  const artist = concertData.artists[parseInt(params.id)];

  if (!artist) return notFound(); // Handle invalid artist ID

  // Check if image exists and starts with "/"
  const imageSrc = artist.image?.startsWith("/") 
    ? artist.image 
    : "/assets/images/default_musician.jpg";

  return (
    <div className="min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <div className="max-w-3xl mx-auto">
        <Image
          src={imageSrc}
          width={400}
          height={400}
          alt={artist.imageAlt || artist.name}
          className="w-60 h-60 object-cover rounded-lg mx-auto"
        />
        <h1 className="text-3xl font-bold mt-4 text-center">{artist.name}</h1>
        {artist.role && (
          <h2 className="text-lg text-gray-300 text-center">{artist.role}</h2>
        )}
        <p className="mt-8 text-gray-200">{artist.bio}</p>
      </div>
    </div>
  );
}
