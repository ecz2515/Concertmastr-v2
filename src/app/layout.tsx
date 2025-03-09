"use client"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

import { AppStateProvider } from "@/lib/AppStateProvider"
import BackButton from "@/components/BackButton"
import SettingsModal from "@/components/SettingsModal"
import SilencePhonesModal from "@/components/SilencePhonesModal"

import { FiSettings } from "react-icons/fi"
import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isSilencePhonesModalVisible, setIsSilencePhonesModalVisible] = useState(true)
  const pathname = usePathname()

  const isHomePage = pathname === "/"
  const isAcksPage = /\/acks$/.test(pathname)
  const isOrchestraPage = /\/meet-orchestra$/.test(pathname)
  const isConcertPage = /^\/[^/]+\/[^/]+$/.test(pathname)

  useEffect(() => {
    setIsSilencePhonesModalVisible(true)
  }, [])

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground">
        <AppStateProvider>
          {!isHomePage && (
            <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex h-14 items-center justify-between px-4">
                <div className="flex items-center justify-center w-10 h-10">
                  {isConcertPage && !isAcksPage && !isOrchestraPage ? (
                    <Image
                      src="/assets/images/CM_logo.png"
                      width={32}
                      height={32}
                      alt="CM Logo"
                      className="rounded-full"
                    />
                  ) : (
                    <BackButton />
                  )}
                </div>

                <div className="flex items-center justify-center">
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    aria-label="Open Settings"
                    className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary transition-colors"
                  >
                    <FiSettings className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </header>
          )}

          <main className="flex-1">{children}</main>

          <SilencePhonesModal
            visible={isSilencePhonesModalVisible}
            onClose={() => setIsSilencePhonesModalVisible(false)}
          />

          <SettingsModal visible={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </AppStateProvider>
      </body>
    </html>
  )
}

