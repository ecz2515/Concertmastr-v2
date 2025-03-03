import React from 'react';
import { useAppContext } from '@/lib/AppStateProvider';

export default function HKPhilAcknowledgment() {
  const { fontSize, enhancedContrast, trueTone, blueLight } = useAppContext();

  return (
    <div className="relative min-h-screen bg-black text-white pt-20 lg:pt-20 px-6 pb-8">
      <h1 
        className={`font-bold text-red-500 ${enhancedContrast ? "underline" : ""}`}
        style={{ fontSize: fontSize * 1.5 }}
      >
        Hong Kong Philharmonic Orchestra
      </h1>
      <h2 
        className={`mt-2 ${enhancedContrast ? "font-bold" : ""}`}
        style={{ fontSize: fontSize * 1.2 }}
      >
        With gratitude to our supporters
      </h2>
      
      <p 
        className={`mt-4 ${enhancedContrast ? "font-medium" : ""}`}
        style={{ fontSize }}
      >
        The Hong Kong Philharmonic Orchestra is deeply grateful to our patrons, supporters, and the
        vibrant community that makes our performances possible. Your passion keeps the music alive.
      </p>
      
      <h3 
        className={`font-semibold mt-6 ${enhancedContrast ? "underline" : ""}`}
        style={{ fontSize: fontSize * 1.3 }}
      >
        A Letter from the Music Director
      </h3>
      <p 
        className={`mt-2 ${enhancedContrast ? "font-medium" : ""}`}
        style={{ fontSize }}
      >
        "To our esteemed audience, thank you for your continued support of the Hong Kong Philharmonic.
        Your enthusiasm and love for music inspire us to reach new artistic heights. We are honored to
        share our journey with you."
      </p>
      
      <h3 
        className={`font-semibold mt-6 ${enhancedContrast ? "underline" : ""}`}
        style={{ fontSize: fontSize * 1.3 }}
      >
        Sponsors
      </h3>
      <p 
        className={`mt-2 ${enhancedContrast ? "font-medium" : ""}`}
        style={{ fontSize }}
      >
        • HK Arts Council<br/>• Lingnan Bank<br/>• Asia Cultural Fund
      </p>
      
      <h3 
        className={`font-semibold mt-6 ${enhancedContrast ? "underline" : ""}`}
        style={{ fontSize: fontSize * 1.3 }}
      >
        Major Benefactors
      </h3>
      <p 
        className={`mt-2 ${enhancedContrast ? "font-medium" : ""}`}
        style={{ fontSize }}
      >
        • Mr. and Mrs. Wong<br/>• The Chan Family Trust<br/>• Dr. Li Mei
      </p>
      
      <h3 
        className={`font-semibold mt-6 ${enhancedContrast ? "underline" : ""}`}
        style={{ fontSize: fontSize * 1.3 }}
      >
        Patron Circle
      </h3>
      <p 
        className={`mt-2 ${enhancedContrast ? "font-medium" : ""}`}
        style={{ fontSize }}
      >
        • Alex and Michelle Yuen<br/>• Kwok Holdings<br/>• Anonymous Contributors
      </p>

      {trueTone && (
        <div className="absolute inset-0 bg-amber-400 opacity-40 pointer-events-none" />
      )}
      {blueLight && (
        <div className="absolute inset-0 bg-orange-500 opacity-40 pointer-events-none" />
      )}
    </div>
  );
}
