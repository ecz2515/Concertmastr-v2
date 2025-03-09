"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useAppContext } from "@/lib/AppStateProvider"

export default function Biographies() {
  const { orchestraId, concertId } = useParams()
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext()
  const [artists, setArtists] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    console.log("Fetching biographies for:", { orchestraId, concertId })

    if (!orchestraId || !concertId) {
      setErrorMessage("Invalid URL parameters.")
      return
    }

    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from("artists")
        .select("*")
        .eq("concert_id", concertId)
        .eq("orchestra_id", orchestraId)
        .order("name", { ascending: true })

      if (error) {
        console.error("Error fetching artist biographies:", error)
        setErrorMessage("Could not load artist biographies.")
      } else {
        setArtists(data || [])
      }
    }

    fetchArtists()
  }, [orchestraId, concertId])

  if (errorMessage) {
    return <p className="text-center text-destructive p-6">{errorMessage}</p>
  }

  if (!artists.length) {
    return <p className="text-center text-muted-foreground p-6">Loading...</p>
  }

  return (
    <div className="page-container">
      <h1 className="section-title" style={{ fontSize: `${fontSize + 8}px` }}>
        Biographies
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artists.map((artist, index) => {
          const imageSrc =
            artist.image && artist.image.trim() !== ""
              ? `https://concertmastr-assets.s3.amazonaws.com/${orchestraId}/artists-images/${concertId}.${artist.artist_id}.jpg`
              : "/assets/images/default_musician.jpg"

          console.log("Image source for artist:", artist.name, imageSrc)

          return (
            <Link key={artist.id ?? `artist-${index}`} href={`/${orchestraId}/${concertId}/biographies/${artist.name}`}>
              <div className="artist-card h-full group">
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={imageSrc || "/placeholder.svg"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    alt={artist.imageAlt || `Photo of ${artist.name}`}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold" style={{ fontSize: `${fontSize + 2}px` }}>
                    {artist.name}
                  </h2>
                  {artist.role && (
                    <p className="text-muted-foreground" style={{ fontSize: `${fontSize}px` }}>
                      {artist.role}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {trueTone && <div className="true-tone-overlay" />}
      {blueLight && <div className="blue-light-overlay" />}
    </div>
  )
}

