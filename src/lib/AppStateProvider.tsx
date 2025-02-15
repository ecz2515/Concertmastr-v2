// File: AppStateProvider.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context data
interface AppStateContextValue {
  enhancedContrast: boolean;
  setEnhancedContrast: (val: boolean) => void;
  fontSize: number;
  setFontSize: (val: number) => void;
  trueTone: boolean;
  setTrueTone: (val: boolean) => void;
  blueLight: boolean;
  setBlueLight: (val: boolean) => void;
}

// Create the context
const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

// Create a custom hook to easily access the context
export function useAppContext() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppStateProvider');
  }
  return context;
}

// Define the provider component
interface AppStateProviderProps {
  children: ReactNode;
}

export function AppStateProvider({ children }: AppStateProviderProps) {
  // Add as many states as needed for your global settings
  const [enhancedContrast, setEnhancedContrast] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(16); // default to 16
  const [trueTone, setTrueTone] = useState<boolean>(false);
  const [blueLight, setBlueLight] = useState<boolean>(false);

  // Memoize your value if you want to optimize re-renders, but simple object is often fine
  const value: AppStateContextValue = {
    enhancedContrast,
    setEnhancedContrast,
    fontSize,
    setFontSize,
    trueTone,
    setTrueTone,
    blueLight,
    setBlueLight,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}
