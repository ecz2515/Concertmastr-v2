"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { useAppContext } from "@/lib/AppStateProvider"

export default function ProgramNote() {
  const { enhancedContrast, fontSize, trueTone, blueLight } = useAppContext()
  const { orchestraId, concertId, pieceId } = useParams()

  const [piece, setPiece] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    console.log("Fetching program note for:", { orchestraId, concertId, pieceId })

    if (!orchestraId || !concertId || !pieceId) {
      setErrorMessage("Invalid URL parameters.")
      return
    }

    const fetchPiece = async () => {
      const { data, error } = await supabase
        .from("programs")
        .select("*")
        .eq("id", pieceId)
        .eq("concert_id", concertId)
        .eq("orchestra_id", orchestraId)
        .single()

      if (error) {
        console.error("Error fetching program note:", error)
        setErrorMessage("Program note not found.")
      } else {
        setPiece(data)
      }
    }

    fetchPiece()
  }, [orchestraId, concertId, pieceId])

  if (errorMessage) {
    return <div className="text-center text-destructive p-6">{errorMessage}</div>
  }

  if (!piece) {
    return <div className="text-center text-muted-foreground p-6">Loading...</div>
  }

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-border/50 p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2" style={{ fontSize: `${fontSize + 8}px` }}>
            {piece.piece_name}
          </h1>
          <h2 className="text-xl text-muted-foreground" style={{ fontSize: `${fontSize + 2}px` }}>
            {piece.composer}
          </h2>
          {piece.born && piece.death && (
            <p className="text-sm text-muted-foreground" style={{ fontSize: `${fontSize - 2}px` }}>
              ({piece.born} - {piece.death})
            </p>
          )}
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-card-foreground leading-relaxed" style={{ fontSize: `${fontSize}px` }}>
            {piece.program_notes}
          </p>
        </div>
      </div>

      {trueTone && <div className="true-tone-overlay" />}
      {blueLight && <div className="blue-light-overlay" />}
    </div>
  )
}

