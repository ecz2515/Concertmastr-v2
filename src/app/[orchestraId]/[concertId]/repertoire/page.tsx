"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useAppContext } from "@/lib/AppStateProvider"
import { ChevronRight } from "lucide-react"

export default function Repertoire() {
  const { orchestraId, concertId } = useParams()
  const { trueTone, blueLight, fontSize } = useAppContext()
  const [program, setProgram] = useState<{
    pieces: any[]
    intermissionAfter: number | null
    intermissionDuration: number | null
  }>({ pieces: [], intermissionAfter: null, intermissionDuration: null })
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    console.log("Fetching repertoire for:", orchestraId, concertId)

    const fetchProgram = async () => {
      const { data: programData, error: programError } = await supabase
        .from("programs")
        .select("*")
        .eq("concert_id", concertId)
        .eq("orchestra_id", orchestraId)
        .order("id", { ascending: true })

      const { data: concertData, error: concertError } = await supabase
        .from("concerts")
        .select("intermission_after, intermission_duration")
        .eq("id", concertId)
        .single()

      if (programError || concertError) {
        console.error("Error fetching program or concert details:", programError || concertError)
        setErrorMessage("Could not load program.")
      } else {
        setProgram({
          pieces: programData || [],
          intermissionAfter: concertData?.intermission_after ?? null,
          intermissionDuration: concertData?.intermission_duration ?? null,
        })
      }
    }

    fetchProgram()
  }, [orchestraId, concertId])

  if (!program.pieces.length) {
    return (
      <div className="text-center text-muted-foreground p-6">Loading... {errorMessage && `Error: ${errorMessage}`}</div>
    )
  }

  return (
    <div className="page-container">
      <h1 className="section-title" style={{ fontSize: `${fontSize + 8}px` }}>
        Repertoire
      </h1>
      <h2 className="text-center text-muted-foreground mb-8" style={{ fontSize: `${fontSize}px` }}>
        Tap to see program notes
      </h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {program.pieces.map((piece, index) => (
          <div key={piece.id} className="border-b border-border/50 pb-6 last:border-0">
            {program.intermissionAfter !== null && program.intermissionAfter === index && (
              <div className="text-center py-4 mb-6 bg-secondary/50 rounded-lg">
                <p className="text-muted-foreground italic" style={{ fontSize: `${fontSize}px` }}>
                  ~ {program.intermissionDuration} minute intermission ~
                </p>
              </div>
            )}
            <Link href={`/${orchestraId}/${concertId}/repertoire/${piece.id}`}>
              <div className="concert-card group p-5 relative">
                <div className="flex justify-between items-start">
                  <div>
                    <h2
                      className="text-xl font-semibold group-hover:text-primary transition-colors"
                      style={{ fontSize: `${fontSize + 2}px` }}
                    >
                      {piece.piece_name}{" "}
                      <span className="text-sm text-muted-foreground ml-1">{`(${piece.duration})`}</span>
                    </h2>
                    <p className="text-muted-foreground" style={{ fontSize: `${fontSize}px` }}>
                      {piece.composer}
                      {piece.born && piece.death ? (
                        <span className="text-sm text-muted-foreground">{` (${piece.born}-${piece.death})`}</span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                {piece.movements && piece.movements.length > 0 && (
                  <ul className="mt-3 space-y-1 text-muted-foreground" style={{ fontSize: `${fontSize - 1}px` }}>
                    {piece.movements.map((movement: string, i: number) => (
                      <li key={`${piece.id}-movement-${i}`} className="pl-4 border-l border-border">
                        {movement}
                      </li>
                    ))}
                  </ul>
                )}

                {piece.soloists && piece.soloists.length > 0 && (
                  <p className="mt-3 text-muted-foreground" style={{ fontSize: `${fontSize - 1}px` }}>
                    Soloists: {piece.soloists.join(", ")}
                  </p>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>

      {trueTone && <div className="true-tone-overlay" />}
      {blueLight && <div className="blue-light-overlay" />}
    </div>
  )
}

