import React from 'react';

export default function DefaultAcknowledgment() {
  return (
    <div className="p-6 bg-gray-900 text-center text-white">
      <h1 className="text-3xl font-bold text-blue-400">Concert Acknowledgments</h1>
      <h2 className="text-xl mt-2">With gratitude to all our supporters</h2>
      
      <p className="mt-4 text-lg">
        We extend our deepest thanks to the musicians, sponsors, and audience members who make
        these performances possible. Your unwavering support keeps the music alive and thriving.
      </p>
      
      <h3 className="text-2xl font-semibold mt-6">Sponsors</h3>
      <p className="mt-2 text-lg">• Global Music Foundation<br/>• Harmony Enterprises<br/>• Crescendo Bank</p>
      
      <h3 className="text-2xl font-semibold mt-6">Major Benefactors</h3>
      <p className="mt-2 text-lg">• The Anderson Family<br/>• The Williams Cultural Fund<br/>• Dr. Emily Carter</p>
      
      <h3 className="text-2xl font-semibold mt-6">Community Patrons</h3>
      <p className="mt-2 text-lg">• Alex and Michelle Lee<br/>• Roberts Foundation<br/>• Anonymous Contributors</p>
    </div>
  );
}
