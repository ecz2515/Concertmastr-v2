"use client"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useAppContext } from "@/lib/AppStateProvider"

export default function Biography() {
  const params = useParams()
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext()
  const [artist, setArtist] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    console.log("Params received:", params)

    if (!params?.name || typeof params.name !== "string") {
      console.error("Error: Name param is missing or invalid!")
      setErrorMessage("Loading...")
      return
    }

    const decodedName = decodeURIComponent(params.name)
    console.log("Decoded Name:", decodedName)

    const fetchArtist = async () => {
      const { data, error } = await supabase.from("artists").select("*").eq("name", decodedName).single()

      if (error) {
        console.error(`Error fetching artist for name "${decodedName}":`, error)
        setErrorMessage("Artist not found.")
      } else {
        setArtist(data)
      }
    }

    fetchArtist()
  }, [params])

  if (errorMessage) {
    return <p className="text-center text-destructive p-6">{errorMessage}</p>
  }

  if (!artist) {
    return <p className="text-center text-muted-foreground p-6">Loading...</p>
  }

  const orchestraId = params.orchestraId as string
  const concertId = params.concertId as string

  // Get the image URL from AWS S3 if available, otherwise use default
  const imageSrc =
    artist.image && artist.image.trim() !== ""
      ? `https://concertmastr-assets.s3.amazonaws.com/${orchestraId}/artists-images/${concertId}.${artist.artist_id}.jpg`
      : "/assets/images/default_musician.jpg"

  console.log("Image source for artist:", artist.name, imageSrc)

  return (
    <div className="page-container">
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-border/50">
        <div className="p-6 flex flex-col items-center">
          <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 rounded-full overflow-hidden border-4 border-secondary">
            <Image
              src={imageSrc || "/placeholder.svg"}
              fill
              sizes="(max-width: 768px) 12rem, 16rem"
              alt={artist.imageAlt || artist.name}
              className="object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold mb-2 text-center" style={{ fontSize: `${fontSize + 8}px` }}>
            {artist.name}
          </h1>

          {artist.role && (
            <h2 className="text-xl text-muted-foreground mb-6 text-center" style={{ fontSize: `${fontSize + 2}px` }}>
              {artist.role}
            </h2>
          )}

          <div className="prose prose-invert max-w-none">
            <p className="text-card-foreground leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
              {artist.bio}
            </p>
          </div>
        </div>
      </div>

      {trueTone && <div className="true-tone-overlay" />}
      {blueLight && <div className="blue-light-overlay" />}
    </div>
  )
}

