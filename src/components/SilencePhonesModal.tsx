import React from "react";

interface SilencePhonesModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SilencePhonesModal({ visible, onClose }: SilencePhonesModalProps) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-gray-800 text-white p-6 rounded-xl w-80 text-center shadow-lg">
        <h2 className="text-xl font-bold mb-3">Shh... Phones on Silent!</h2>
        <p className="text-m mb-5">
          To let the music play uninterrupted, please kindly set your mobile phone to silent mode.
        </p>
        <button
          onClick={onClose}
          className="bg-gray-700 hover:bg-gray-600 transition px-4 py-2 rounded-lg text-white font-semibold"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
