"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/lib/AppStateProvider";
import { useCache } from "@/lib/CacheContext";

export default function ConcertPage() {
  const { orchestraId, concertId } = useParams();
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext();
  const { getConcertFromCache, setConcertCache, preloadAllData, concertCache } = useCache();
  const router = useRouter();
  const [concert, setConcert] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orchestraId || !concertId || typeof orchestraId !== "string" || typeof concertId !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(concertId)) {
      router.push("/");
      return;
    }

    const fetchConcert = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Starting fetchConcert:', { orchestraId, concertId });
        
        // Check cache first
        const cachedConcert = getConcertFromCache(orchestraId, concertId);
        console.log('Initial cache check result:', cachedConcert);
        
        if (cachedConcert) {
          console.log('Found concert in cache:', cachedConcert);
          setConcert(cachedConcert);
          setIsLoading(false);
          return;
        }

        console.log('Concert not in cache, starting preload...');
        
        // If not in cache, preload all data for this specific concert
        await preloadAllData(orchestraId, concertId);
        
        // Get the concert from the newly populated cache
        const concert = getConcertFromCache(orchestraId, concertId);
        console.log('Cache check after preloading:', concert);
        
        if (concert) {
          console.log('Found concert after preloading:', concert);
          setConcert(concert);
        } else {
          console.error('Concert not found in cache after preloading');
          throw new Error('Concert not found after preloading');
        }
      } catch (err: any) {
        console.error("Error fetching concert:", err);
        setError(err.message || 'Failed to load concert');
        setConcert(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConcert();
  }, [orchestraId, concertId, router, getConcertFromCache, preloadAllData]);

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-xl mb-4">Error Loading Concert</h2>
          <p className="text-gray-400">{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !concert) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const { id, concert_name, time, venue, image } = concert;

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
