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

  // Function to reset all settings to default values
  const resetAllSettings = () => {
    setEnhancedContrast(false);
    setFontSize(16); // Assuming 16 is the default font size
    setTrueTone(false);
    setBlueLight(false);
  };

  if (!visible) {
    return null;
  }

  return (
    // Outer overlay takes the full screen
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      onClick={onClose} // Clicking the overlay closes the modal
    >
      {/* Modal container */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent clicks in modal from closing it
        className={`
          bg-gray-800 text-white p-6 rounded-lg w-80 max-w-full relative
          ${enhancedContrast ? 'border-2 border-white' : ''}
        `}
      >
        {/* Circular Close Button in top-right corner, partially outside modal */}
        <button
          type="button"
          onClick={onClose}
          className="
            absolute
            bg-gray-600
            text-white
            text-xl
            rounded-full
            w-10
            h-10
            flex
            items-center
            justify-center
            shadow-md
            -top-4 
            -right-4
            hover:bg-gray-600
            active:bg-gray-500
            focus:outline-none
          "
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

        {/* 1) Enhanced Contrast */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg">Enhanced Contrast</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={enhancedContrast}
              onChange={(e) => setEnhancedContrast(e.target.checked)}
            />
            <div
              className="
                w-11
                h-6
                bg-gray-200
                rounded-full
                peer-checked:bg-blue-600
                dark:bg-gray-700
                peer-focus:outline-none
                peer-focus:ring-0
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:border-gray-300
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                dark:border-gray-600
              "
            />
          </label>
        </div>

        {/* 2) True Tone */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg">True Tone</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={trueTone}
              onChange={(e) => setTrueTone(e.target.checked)}
            />
            <div
              className="
                w-11
                h-6
                bg-gray-200
                rounded-full
                peer-checked:bg-blue-600
                dark:bg-gray-700
                peer-focus:outline-none
                peer-focus:ring-0
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:border-gray-300
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                dark:border-gray-600
              "
            />
          </label>
        </div>

        {/* 3) Blue Light Filter */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg">Blue Light Filter</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={blueLight}
              onChange={(e) => setBlueLight(e.target.checked)}
            />
            <div
              className="
                w-11
                h-6
                bg-gray-200
                rounded-full
                peer-checked:bg-blue-600
                dark:bg-gray-700
                peer-focus:outline-none
                peer-focus:ring-0
                peer-checked:after:translate-x-full
                peer-checked:after:border-white
                after:content-['']
                after:absolute
                after:top-[2px]
                after:left-[2px]
                after:bg-white
                after:border-gray-300
                after:border
                after:rounded-full
                after:h-5
                after:w-5
                after:transition-all
                dark:border-gray-600
              "
            />
          </label>
        </div>

        {/* 4) Font Size (bottom) */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg">Font Size</span>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={decreaseFontSize}
              className="
                w-14
                h-12
                bg-gray-700
                text-white
                rounded
                text-2xl
                flex
                items-center
                justify-center
                transition-colors
                hover:bg-gray-700
                active:bg-gray-500
                focus:outline-none
                focus:ring-0
              "
            >
              –
            </button>
            <button
              type="button"
              onClick={increaseFontSize}
              className="
                w-14
                h-12
                bg-gray-700
                text-white
                rounded
                text-2xl
                flex
                items-center
                justify-center
                transition-colors
                hover:bg-gray-700
                active:bg-gray-500
                focus:outline-none
                focus:ring-0
              "
            >
              +
            </button>
          </div>
        </div>

        {/* Reset All Button */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={resetAllSettings}
            className="
              bg-red-700
              text-white
              w-full
              py-2
              rounded
              shadow-md
              hover:bg-red-700
              active:bg-red-600
              focus:outline-none
              focus:ring-0
            "
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}
