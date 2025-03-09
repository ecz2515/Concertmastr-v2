"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"
import { useAppContext } from "@/lib/AppStateProvider"
import { useParams } from "next/navigation"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

interface Musician {
  id: number
  instrument: string
  image: string | null
  name: string
  position?: string
}

export default function MeetOrchestra() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext()
  const [musicians, setMusicians] = useState<Musician[]>([])
  const params = useParams()

  useEffect(() => {
    const fetchMusicians = async () => {
      if (!params?.orchestraId) {
        console.error("Error: Orchestra ID is missing!")
        return
      }

      console.log("Fetching musicians for orchestraId:", params.orchestraId)

      const { data, error } = await supabase
        .from("orchestra_musicians")
        .select("*")
        .eq("orchestra_id", params.orchestraId)

      if (error) {
        console.error("Error fetching musicians:", error)
        return
      }

      console.log("Fetched musicians:", data)
      setMusicians(data as Musician[])
    }

    fetchMusicians()
  }, [params.orchestraId])

  const groupedMusicians = musicians.reduce(
    (acc, musician) => {
      if (!acc[musician.instrument]) {
        acc[musician.instrument] = []
      }
      acc[musician.instrument].push(musician)
      return acc
    },
    {} as Record<string, Musician[]>,
  )

  return (
    <div className="page-container">
      <h1 className="section-title" style={{ fontSize: `${fontSize + 8}px` }}>
        Meet the Orchestra
      </h1>

      <div>
        {Object.keys(groupedMusicians).length > 0 ? (
          Object.entries(groupedMusicians).map(([instrument, musicians]) => (
            <div key={instrument} className="mb-10">
              <h2
                className="text-2xl font-semibold mb-4 pb-2 border-b border-border"
                style={{ fontSize: `${fontSize + 4}px` }}
              >
                {instrument}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {musicians.map((musician) => {
                  const orchestraId = params.orchestraId || "default_orchestra"
                  const imageUrl =
                    musician.image && musician.image.trim() !== ""
                      ? `https://concertmastr-assets.s3.amazonaws.com/${orchestraId}/musicians/${musician.image}`
                      : "/assets/images/default_musician.jpg"

                  return (
                    <div key={musician.id} className="artist-card group">
                      <div className="aspect-square overflow-hidden relative">
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          alt={musician.name}
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={() => {
                            const imgElement = document.querySelector(`[alt="${musician.name}"]`) as HTMLImageElement
                            if (imgElement) {
                              imgElement.src = "/assets/images/default_musician.jpg"
                            }
                            return true
                          }}
                          unoptimized={true}
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="text-xl font-semibold" style={{ fontSize: `${fontSize + 2}px` }}>
                          {musician.name}
                        </h3>
                        {musician.position && (
                          <p className="text-muted-foreground" style={{ fontSize: `${fontSize}px` }}>
                            {musician.position}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground">Loading musicians...</p>
        )}
      </div>

      {trueTone && <div className="true-tone-overlay" />}
      {blueLight && <div className="blue-light-overlay" />}
    </div>
  )
}

