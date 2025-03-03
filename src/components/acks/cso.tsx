import React from 'react';
import { useAppContext } from '@/lib/AppStateProvider';

export default function CSOAcknowledgment() {
  const { fontSize, enhancedContrast, trueTone, blueLight } = useAppContext();

  return (
    <div className="relative min-h-screen pt-20 lg:pt-20 px-6 pb-8 bg-black text-white">
      <h1
        className={`font-bold text-yellow-400 ${enhancedContrast ? "underline" : ""}`}
        style={{
          fontSize: fontSize * 1.5,
        }}
      >
        Chicago Symphony Orchestra
      </h1>
      <h2
        className={`mt-2 ${enhancedContrast ? "font-bold" : ""}`}
        style={{
          fontSize: fontSize * 1.2,
        }}
      >
        With gratitude to our supporters
      </h2>

      <p
        className={`mt-4 ${enhancedContrast ? "font-medium" : ""}`}
        style={{
          fontSize,
        }}
      >
        The Chicago Symphony Orchestra extends its heartfelt thanks to our patrons, donors, and
        community members for making this season possible. Your generosity fuels our music.
      </p>

      <h3
        className={`font-semibold mt-6 ${enhancedContrast ? "underline" : ""}`}
        style={{
          fontSize: fontSize * 1.3,
        }}
      >
        A Letter from the Music Director
      </h3>
      <p
        className={`mt-2 ${enhancedContrast ? "font-medium" : ""}`}
        style={{
          fontSize,
        }}
      >
        "Dear Friends, your unwavering support allows us to continue bringing world-class music to
        audiences around the world. On behalf of our musicians, thank you for your dedication to the
        arts. We look forward to sharing many more unforgettable performances with you."
      </p>

      <h3
        className={`font-semibold mt-6 ${enhancedContrast ? "underline" : ""}`}
        style={{
          fontSize: fontSize * 1.3,
        }}
      >
        Sponsors
      </h3>
      <p
        className={`mt-2 ${enhancedContrast ? "font-medium" : ""}`}
        style={{
          fontSize,
        }}
      >
        • Symphony Foundation<br />• Harmonic Enterprises<br />• Crescendo Bank
      </p>

      <h3
        className={`font-semibold mt-6 ${enhancedContrast ? "underline" : ""}`}
        style={{
          fontSize: fontSize * 1.3,
        }}
      >
        Major Benefactors
      </h3>
      <p
        className={`mt-2 ${enhancedContrast ? "font-medium" : ""}`}
        style={{
          fontSize,
        }}
      >
        • John &amp; Mary Smith<br />• The Williams Family Foundation<br />• Dr. Emily Chen
      </p>

      <h3
        className={`font-semibold mt-6 ${enhancedContrast ? "underline" : ""}`}
        style={{
          fontSize: fontSize * 1.3,
        }}
      >
        Patron Circle
      </h3>
      <p
        className={`mt-2 ${enhancedContrast ? "font-medium" : ""}`}
        style={{
          fontSize,
        }}
      >
        • David and Sarah Thompson<br />• Robert and Nancy Lee<br />• Anonymous Supporters
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
