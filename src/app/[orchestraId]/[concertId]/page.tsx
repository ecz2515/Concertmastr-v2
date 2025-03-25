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
          .select("id, orchestra_id, concert_name, time, venue, image, qr_code, intermission_after, intermission_duration, created_at, showOrchestra")
          .eq("id", concertId)
          .eq("orchestra_id", orchestraId)
          .single();

        if (error) {
          throw error;
        }

        console.log("Concert data from database:", data); // Debug log for concert data
        setConcert(data);
      } catch (err: any) {
        console.error("Error fetching concert:", err);
        setConcert(null);
      }
    };

    fetchConcert();
  }, [orchestraId, concertId, router]);

  const { id, concert_name, time, venue, image } = concert || {};

  // Function to convert time from 24-hour format to 12-hour format
  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const formattedHour = hourInt % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${formattedHour}:${minute} ${period}`;
  };

  // Get the image URL from AWS S3 if available, otherwise use default
  console.log("Image field from database:", image); // Debug log for image field
  const imageUrl = image && image.trim() !== ""
    ? `https://concertmastr-assets.s3.amazonaws.com/${orchestraId}/concert-images/${concertId}.jpg`
    : "/assets/images/default_event-image.jpg";

  console.log("Final image URL:", imageUrl); // Debug log for final URL

  return (
    <div className="fixed inset-0 flex flex-col bg-black text-white overflow-hidden">
      <div className="relative w-full h-3/4">
        <Image
          src={imageUrl}
          fill
          style={{ objectFit: "cover" }}
          alt="Concert Image"
          priority
          onError={() => {
            console.error("Error loading image, using default."); // Debug statement for image error
            const imgElement = document.querySelector('[alt="Concert Image"]') as HTMLImageElement;
            if (imgElement) {
              imgElement.src = "/assets/images/default_event-image.jpg";
            }
            return true;
          }}
          unoptimized={true}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-100"></div>
      </div>

      <div className="flex flex-col justify-end flex-grow relative z-20 w-full max-w-2xl mx-auto px-4 pb-2">
        <div className="text-center mb-2">
          <h1 className="font-extrabold tracking-wide" style={{ fontSize: fontSize * 1.8 }}>
            {concert_name}
          </h1>
          <p className="text-gray-300 mt-1 mb-2" style={{ fontSize: fontSize * 1 }}>
            {venue}
            <br />
            {id} | {time ? formatTime(time) : ""}
          </p>
        </div>

        <div className="grid grid-cols-1">
          {concert?.showOrchestra ? (
            <div className="grid grid-cols-2 gap-x-2">
              {[
                { href: `/${orchestraId}/${concertId}/repertoire`, label: "Program" },
                { href: `/${orchestraId}/${concertId}/biographies`, label: "Biographies" },
                { href: `/${orchestraId}/meet-orchestra`, label: "Orchestra" },
                { href: `/${orchestraId}/acks`, label: "Attributions" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="group block rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 hover:scale-[1.03] duration-300 mb-3"
                >
                  <div className="p-3 text-center font-medium text-white" style={{ fontSize: fontSize * 1.1 }}>
                    {label}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <>
              <Link
                href={`/${orchestraId}/${concertId}/repertoire`}
                className="group block rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 hover:scale-[1.03] duration-300 mb-2"
              >
                <div className="p-3 text-center font-medium text-white" style={{ fontSize: fontSize * 1.1 }}>
                  Works & Program Notes
                </div>
              </Link>

              <div className="grid grid-cols-2 gap-x-2">
                {[
                  { href: `/${orchestraId}/${concertId}/biographies`, label: "Biographies" },
                  { href: `/${orchestraId}/acks`, label: "Attributions" },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className="group block rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 hover:scale-[1.03] duration-300 mb-3"
                  >
                    <div className="p-3 text-center font-medium text-white" style={{ fontSize: fontSize * 1.1 }}>
                      {label}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {trueTone && <div className="absolute inset-0 bg-amber-400 opacity-40" />}
      {blueLight && <div className="absolute inset-0 bg-orange-500 opacity-40" />}
    </div>
  );
}
