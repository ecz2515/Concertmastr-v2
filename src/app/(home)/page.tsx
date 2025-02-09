import Image from "next/image";
import Link from "next/link";
import concertData from "@/data/concert.json";

export default function Home() {
  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white overflow-hidden">
      {/* Background Image with Shadow Overlay */}
      <div className="absolute inset-0 h-2/3">
        <Image 
          src="/assets/images/default_event-image.jpg"
          layout="fill"
          objectFit="cover"
          className="object-center"
          alt="Concert Image"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      {/* Push Main Content to Bottom */}
      <div className="flex flex-col justify-end flex-grow relative z-20 w-full max-w-2xl mx-auto px-6 pb-4">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
            {concertData.concertName}
          </h1>
          <p className="text-gray-300 text-base mt-2">
            {concertData.date} | {concertData.venue} | {concertData.time}
          </p>
        </div>

        {/* Buttons in One Column */}
        <div className="flex flex-col space-y-3">
          <Link 
            href="/program"
            className="bg-white/20 backdrop-blur-lg px-4 py-2.5 rounded-xl shadow-lg hover:bg-white/30 transition-all text-base text-center font-medium"
          >
            Repertoire & Program Notes
          </Link>

          <Link 
            href="/biographies"
            className="bg-white/20 backdrop-blur-lg px-4 py-2.5 rounded-xl shadow-lg hover:bg-white/30 transition-all text-base text-center font-medium"
          >
            Biographies
          </Link>

          <Link 
            href="/program-notes"
            className="bg-white/20 backdrop-blur-lg px-4 py-2.5 rounded-xl shadow-lg hover:bg-white/30 transition-all text-base text-center font-medium"
          >
            Meet the Orchestra
          </Link>

          <Link
            href="/acknowledgements"
            className="bg-white/20 backdrop-blur-lg px-4 py-2.5 rounded-xl shadow-lg hover:bg-white/30 transition-all text-base text-center font-medium"
          >
            Acknowledgements
          </Link>
        </div>
      </div>
    </div>
  );
}
