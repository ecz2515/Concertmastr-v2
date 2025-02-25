"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/lib/AppStateProvider"; // Import global state hook

export default function ConcertPage() {
  const { orchestraId, concertId } = useParams();
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const [concert, setConcert] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    console.log("Orchestra ID:", orchestraId); // Debugging
    console.log("Concert ID:", concertId); // Debugging

    if (typeof orchestraId !== "string" || typeof concertId !== "string") {
      setErrorMessage("Invalid concert or orchestra ID.");
      return;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(concertId)) {
      setErrorMessage("Invalid concert date format.");
      return;
    }

    console.log("Fetching concert from Supabase:", concertId);

    const fetchConcert = async () => {
      const { data, error } = await supabase
        .from("concerts")
        .select("*")
        .eq("id", concertId) // Use concertId directly (no reformatting)
        .single();

      if (error) {
        console.error("Error fetching concert:", error);
        setErrorMessage(error.message);
      } else {
        setConcert(data);
      }
    };

    fetchConcert();
  }, [orchestraId, concertId]);

  if (!concert) {
    return <div className="text-center text-white">Loading... {errorMessage && `Error: ${errorMessage}`}</div>;
  }

  const { id, concert_name, date, venue, time } = concert;

  // Function to convert time from 24-hour format to 12-hour format
  const convertTimeTo12HourFormat = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12; // Convert 0 to 12 for 12-hour format
    return `${hour12}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const formattedTime = convertTimeTo12HourFormat(time);

  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white overflow-hidden">
      {/* Background Image with Shadow Overlay */}
      <div className="absolute inset-0 h-2/3">
        <Image 
          src="/assets/images/default_event-image.jpg"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          alt="Concert Image"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" 
          style={{ background: 'linear-gradient(to bottom, transparent 30%, black 100%)' }} 
        />
      </div>

      {/* Push Main Content to Bottom */}
      <div className="flex flex-col justify-end flex-grow relative z-20 w-full max-w-2xl mx-auto px-6 pb-4">
        <div className="text-center mb-4">
          <h1 className={`font-extrabold tracking-wide ${enhancedContrast ? 'underline' : ''}`} 
            style={{ fontSize: fontSize * 1.8, lineHeight: fontSize > 16 ? 1.4 : 1.2 }}>
            {concert_name}
          </h1>
          <p className="text-gray-300 text-base mt-2" 
            style={{ fontSize, lineHeight: fontSize > 16 ? 1.4 : 1.2 }}>
            {id} | {venue} | {formattedTime}
          </p>
        </div>

        {/* Buttons in One Column */}
        <div className="flex flex-col space-y-3">
          {[
            { href: `/${orchestraId}/${concertId}/repertoire`, label: "Repertoire" }, // Per concert
            { href: `/${orchestraId}/${concertId}/biographies`, label: "Biographies" }, // Per concert
            { href: `/${orchestraId}/meet-orchestra`, label: "Meet the Orchestra" }, // Per orchestra
            { href: `/${orchestraId}/acks`, label: "Acknowledgements" } // Per orchestra
          ].map(({ href, label }) => (
            <Link 
              key={href}
              href={href}
              className={`group relative block rounded-xl shadow-lg overflow-hidden transition-all text-center ${
                enhancedContrast ? "bg-gray-700 border border-white" : "bg-gray-800"
              } hover:bg-gray-700 hover:scale-[1.03] hover:shadow-xl duration-300`}
            >
              <div className="p-3">
                <span className={`text-lg font-medium text-white ${enhancedContrast ? "text-indigo-400 font-bold" : ""}`} 
                  style={{ fontSize: fontSize * 1.1 }}>
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
