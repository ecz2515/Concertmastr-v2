"use client";
import Image from "next/image";
import Link from "next/link";
import concertData from "@/data/concert.json";
import { useAppContext } from "@/lib/AppStateProvider"; // Import global state hook

export default function Home() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();

  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white overflow-hidden">
      {/* Logo at the top-left corner */}
      <div className="absolute top-4 left-4 p-2 bg-black hover:bg-black text-white rounded-full transition-all shadow-md z-30">
        <Image 
          src="/assets/images/CM_logo.png"
          width={32}
          height={32}
          alt="CM Logo"
        />
      </div>

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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" style={{ background: 'linear-gradient(to bottom, transparent 30%, black 100%)' }} />
      </div>

      {/* Push Main Content to Bottom */}
      <div className="flex flex-col justify-end flex-grow relative z-20 w-full max-w-2xl mx-auto px-6 pb-4">
        <div className="text-center mb-4">
          <h1 className={`font-extrabold tracking-wide ${enhancedContrast ? 'underline' : ''}`} style={{ fontSize: fontSize * 1.8 }}>
            {concertData.concertName}
          </h1>
          <p className="text-gray-300 text-base mt-2" style={{ fontSize }}>
            {concertData.date} | {concertData.venue} | {concertData.time}
          </p>
        </div>

        {/* Buttons in One Column */}
        <div className="flex flex-col space-y-3">
          {[
            { href: "/repertoire", label: "Repertoire" },
            { href: "/biographies", label: "Biographies" },
            { href: "/meet-orchestra", label: "Meet the Orchestra" },
            { href: "/acknowledgements", label: "Acknowledgements" }
          ].map(({ href, label }) => (
            <Link 
              key={href}
              href={href}
              className={`group relative block rounded-xl shadow-lg overflow-hidden transition-all text-center ${
                enhancedContrast ? "bg-gray-700 border border-white" : "bg-gray-800"
              } hover:bg-gray-700 hover:scale-[1.03] hover:shadow-xl duration-300`}
            >
              <div className="p-3">
                <span className={`text-base font-medium text-white ${enhancedContrast ? "text-indigo-400 font-bold" : ""}`} style={{ fontSize }}>
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* True Tone and Blue Light Overlays */}
      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />}
    </div>
  );
}
