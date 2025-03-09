"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useAppContext } from "@/lib/AppStateProvider"

export default function ConcertPage() {
  const { orchestraId, concertId } = useParams()
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext()
  const router = useRouter()
  const [concert, setConcert] = useState<any>(null)

  useEffect(() => {
    if (
      !orchestraId ||
      !concertId ||
      typeof orchestraId !== "string" ||
      typeof concertId !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(concertId)
    ) {
      router.push("/")
      return
    }

    const fetchConcert = async () => {
      try {
        const { data, error } = await supabase
          .from("concerts")
          .select(
            "id, orchestra_id, concert_name, time, venue, image, qr_code, intermission_after, intermission_duration, created_at",
          )
          .eq("id", concertId)
          .eq("orchestra_id", orchestraId)
          .single()

        if (error) {
          throw error
        }

        console.log("Concert data from database:", data)
        setConcert(data)
      } catch (err: any) {
        console.error("Error fetching concert:", err)
        setConcert(null)
      }
    }

    fetchConcert()
  }, [orchestraId, concertId, router])

  const { id, concert_name, time, venue, image } = concert || {}

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(":")
    const hourInt = Number.parseInt(hour, 10)
    const period = hourInt >= 12 ? "PM" : "AM"
    const formattedHour = hourInt % 12 || 12
    return `${formattedHour}:${minute} ${period}`
  }

  const imageUrl =
    image && image.trim() !== ""
      ? `https://concertmastr-assets.s3.amazonaws.com/${orchestraId}/concert-images/${concertId}.jpg`
      : "/assets/images/default_event-image.jpg"

  console.log("Final image URL:", imageUrl)

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg mb-6 border border-border/50">
          <Image
            src={imageUrl || "/placeholder.svg"}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            alt="Concert Image"
            className="object-cover"
            priority
            onError={() => {
              console.error("Error loading image, using default.")
              const imgElement = document.querySelector('[alt="Concert Image"]') as HTMLImageElement
              if (imgElement) {
                imgElement.src = "/assets/images/default_event-image.jpg"
              }
              return true
            }}
            unoptimized={true}
          />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ fontSize: `${fontSize + 8}px` }}>
            {concert_name}
          </h1>
          <p className="text-muted-foreground" style={{ fontSize: `${fontSize}px` }}>
            {id} | {venue} | {time ? formatTime(time) : ""}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: `/${orchestraId}/${concertId}/repertoire`, label: "Repertoire" },
            { href: `/${orchestraId}/${concertId}/biographies`, label: "Biographies" },
            { href: `/${orchestraId}/meet-orchestra`, label: "Meet the Orchestra" },
            { href: `/${orchestraId}/acks`, label: "Acknowledgements" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </div>
      </div>

      {trueTone && <div className="true-tone-overlay" />}
      {blueLight && <div className="blue-light-overlay" />}
    </div>
  )
}

