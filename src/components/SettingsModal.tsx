import React from 'react';
import { useAppContext } from '@/lib/AppStateProvider'; // or wherever you store the context

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SettingsModal({ visible, onClose }: SettingsModalProps) {
  const {
    enhancedContrast,
    setEnhancedContrast,
    fontSize,
    setFontSize,
    trueTone,
    setTrueTone,
    blueLight,
    setBlueLight,
  } = useAppContext();
  // Increase or decrease font size within a min/max range
  const increaseFontSize = () => setFontSize(Math.min(fontSize + 2, 40));
  const decreaseFontSize = () => setFontSize(Math.max(fontSize - 2, 10));

  // If not visible, don't render anything at all
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div
        className={`bg-gray-800 text-white p-6 rounded-lg w-80 max-w-full ${
          enhancedContrast ? 'border-2 border-white' : ''
        }`}
      >
        <h2 className="text-xl mb-4" style={{ fontSize: fontSize * 1.2 }}>Settings</h2>

        {/* Enhanced Contrast */}
        <div className="mb-4">
          <label className="flex items-center" style={{ fontSize }}>
            <input
              type="checkbox"
              checked={enhancedContrast}
              onChange={(e) => setEnhancedContrast(e.target.checked)}
              className="mr-2"
            />
            Enhanced Contrast
          </label>
        </div>

        {/* True Tone */}
        <div className="mb-4">
          <label className="flex items-center" style={{ fontSize }}>
            <input
              type="checkbox"
              checked={trueTone}
              onChange={(e) => setTrueTone(e.target.checked)}
              className="mr-2"
            />
            True Tone
          </label>
        </div>

        {/* Blue Light Filter */}
        <div className="mb-4">
          <label className="flex items-center" style={{ fontSize }}>
            <input
              type="checkbox"
              checked={blueLight}
              onChange={(e) => setBlueLight(e.target.checked)}
              className="mr-2"
            />
            Blue Light Filter
          </label>
        </div>

        {/* Font Size */}
        <div className="flex items-center mb-4">
          <span className="mr-2" style={{ fontSize }}>Font Size: {fontSize}</span>
          <button
            type="button"
            onClick={decreaseFontSize}
            className="bg-gray-700 text-white px-2 py-1 rounded mr-2"
          >
            A-
          </button>
          <button
            type="button"
            onClick={increaseFontSize}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            A+
          </button>
        </div>

        {/* Done / Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-700 text-white px-4 py-2 rounded w-full mt-4 hover:bg-gray-600"
          style={{ fontSize }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
