"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AppStateProvider } from "@/lib/AppStateProvider";
import BackButton from "@/components/BackButton";
import SettingsModal from "@/components/SettingsModal";
import SilencePhonesModal from "@/components/SilencePhonesModal";

import { FiSettings } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSilencePhonesModalVisible, setIsSilencePhonesModalVisible] =
    useState(true);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isAcksPage = /\/acks$/.test(pathname);
  const isOrchestraPage = /\/meet-orchestra$/.test(pathname);
  const isConcertPage = /^\/[^/]+\/[^/]+$/.test(pathname);

  useEffect(() => {
    if (!isHomePage) {
      setIsSilencePhonesModalVisible(true);
    }
  }, [isHomePage]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppStateProvider>
          {!isHomePage && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: "1.5rem",
                  left: "1rem",
                  zIndex: 1000,
                }}
              >
                {isConcertPage && !isAcksPage && !isOrchestraPage ? (
                  <Image
                    src="/assets/images/CM_logo.png"
                    width={32}
                    height={32}
                    alt="CM Logo"
                  />
                ) : (
                  <BackButton />
                )}
              </div>

              <div
                style={{
                  position: "fixed",
                  top: "1.5rem",
                  right: "1rem",
                  zIndex: 1000,
                }}
              >
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                  }}
                  onClick={() => setIsSettingsOpen(true)}
                  aria-label="Open Settings"
                >
                  <FiSettings size={30} />
                </button>
              </div>
            </>
          )}

          {children}

          {!isHomePage && (
            <SilencePhonesModal
              visible={isSilencePhonesModalVisible}
              onClose={() => setIsSilencePhonesModalVisible(false)}
            />
          )}

          <SettingsModal
            visible={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          />

          <style jsx>{`
            .settingsIcon {
              background: none;
              border: none;
              cursor: pointer;
              color: white;
            }
            .settingsIcon:hover {
              color: #ccc;
            }
          `}</style>
        </AppStateProvider>
      </body>
    </html>
  );
}
