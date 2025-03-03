"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/lib/AppStateProvider";

export default function ConcertPage() {
  const { orchestraId, concertId } = useParams();
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const router = useRouter();
  const [concert, setConcert] = useState<any>(null);

  useEffect(() => {
    if (!orchestraId || !concertId || typeof orchestraId !== "string" || typeof concertId !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(concertId)) {
      router.push("/");
      return;
    }

    const fetchConcert = async () => {
      try {
        const { data, error } = await supabase
          .from("concerts")
          .select("id, orchestra_id, concert_name, time, venue, image, qr_code, intermission_after, intermission_duration, created_at")
          .eq("id", concertId)
          .eq("orchestra_id", orchestraId)
          .single();

        if (error) {
          throw error;
        }

        setConcert(data);
      } catch (err: any) {
        console.error("Error fetching concert:", err);
        setConcert(null);
      }
    };

    fetchConcert();
  }, [orchestraId, concertId, router]);

  const { id, concert_name, time, venue, image } = concert || {};
  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white overflow-hidden">
      <div className="absolute inset-0 h-2/3">
        <Image
          src={image || "/assets/images/default_event-image.jpg"}
          fill
          style={{ objectFit: "cover" }}
          alt="Concert Image"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="flex flex-col justify-end flex-grow relative z-20 w-full max-w-2xl mx-auto px-6 pb-4">
        <div className="text-center mb-4">
          <h1 className="font-extrabold tracking-wide" style={{ fontSize: fontSize * 1.8 }}>
            {concert_name}
          </h1>
          <p className="text-gray-300 text-base mt-2">
            {id} | {venue} | {time}
          </p>
        </div>

        <div className="flex flex-col space-y-3">
          {[
            { href: `/${orchestraId}/${concertId}/repertoire`, label: "Repertoire" },
            { href: `/${orchestraId}/${concertId}/biographies`, label: "Biographies" },
            { href: `/${orchestraId}/meet-orchestra`, label: "Meet the Orchestra" },
            { href: `/${orchestraId}/acks`, label: "Acknowledgements" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="group block rounded-xl shadow-lg bg-gray-800 hover:bg-gray-700 hover:scale-[1.03] duration-300"
            >
              <div className="p-3 text-center text-lg font-medium text-white">
                {label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40" />}
    </div>
  );
}
