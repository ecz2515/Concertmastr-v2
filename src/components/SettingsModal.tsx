"use client"
import { useAppContext } from "@/lib/AppStateProvider"
import { X } from "lucide-react"

interface SettingsModalProps {
  visible: boolean
  onClose: () => void
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
  } = useAppContext()

  // Define min and max font size
  const minFontSize = 16
  const maxFontSize = 24

  // Increase or decrease font size within a min/max range
  const increaseFontSize = () => setFontSize(Math.min(fontSize + 2, maxFontSize))
  const decreaseFontSize = () => setFontSize(Math.max(fontSize - 2, minFontSize))

  // Function to reset all settings to default values
  const resetAllSettings = () => {
    setEnhancedContrast(false)
    setFontSize(16)
    setTrueTone(false)
    setBlueLight(false)
  }

  if (!visible) {
    return null
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-card text-card-foreground p-6 rounded-lg w-80 max-w-full relative
          ${enhancedContrast ? "border-2 border-primary" : "border border-border"}
          shadow-lg
        `}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md hover:bg-secondary/80 focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Settings</h2>

        <div className="space-y-6">
          {/* Enhanced Contrast */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Enhanced Contrast</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={enhancedContrast}
                onChange={(e) => setEnhancedContrast(e.target.checked)}
              />
              <div
                className="
                  w-11 h-6 bg-secondary rounded-full peer 
                  peer-checked:bg-primary peer-focus:outline-none 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all
                "
              />
            </label>
          </div>

          {/* True Tone */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">True Tone</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={trueTone}
                onChange={(e) => setTrueTone(e.target.checked)}
              />
              <div
                className="
                  w-11 h-6 bg-secondary rounded-full peer 
                  peer-checked:bg-primary peer-focus:outline-none 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all
                "
              />
            </label>
          </div>

          {/* Blue Light Filter */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Blue Light Filter</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={blueLight}
                onChange={(e) => setBlueLight(e.target.checked)}
              />
              <div
                className="
                  w-11 h-6 bg-secondary rounded-full peer 
                  peer-checked:bg-primary peer-focus:outline-none 
                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                  after:h-5 after:w-5 after:transition-all
                "
              />
            </label>
          </div>

          {/* Font Size */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Font Size</span>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={decreaseFontSize}
                disabled={fontSize <= minFontSize}
                className={`
                  w-10 h-10 rounded flex items-center justify-center transition-colors focus:outline-none
                  ${
                    fontSize <= minFontSize
                      ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }
                `}
              >
                –
              </button>
              <button
                type="button"
                onClick={increaseFontSize}
                disabled={fontSize >= maxFontSize}
                className={`
                  w-10 h-10 rounded flex items-center justify-center transition-colors focus:outline-none
                  ${
                    fontSize >= maxFontSize
                      ? "bg-secondary/50 text-muted-foreground cursor-not-allowed"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }
                `}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Reset All Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={resetAllSettings}
            className="w-full py-2 rounded bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  )
}

