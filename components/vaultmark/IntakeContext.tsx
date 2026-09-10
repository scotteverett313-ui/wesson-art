"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export interface CapturedImage {
  pixels: ImageData;
  size: number;
  fingerprint: string;
  fileName: string;
  format: string;
  previewUrl: string;
  sourceWidth: number;
  sourceHeight: number;
}

interface IntakeContextValue {
  captured: CapturedImage | null;
  setCaptured: (image: CapturedImage | null) => void;
  resetIntake: () => void;
}

const IntakeContext = createContext<IntakeContextValue | null>(null);

// Holds the piece currently being vaulted while the user moves through the
// five intake routes. Deliberately in-memory only: the raw pixel buffer is
// megabytes and cannot go in sessionStorage, and it is only meaningful for
// the duration of one intake. Leaving /vaultmark/intake drops it.
export function IntakeProvider({ children }: { children: React.ReactNode }) {
  const [captured, setCaptured] = useState<CapturedImage | null>(null);

  const resetIntake = useCallback(() => setCaptured(null), []);

  const value = useMemo<IntakeContextValue>(
    () => ({ captured, setCaptured, resetIntake }),
    [captured, resetIntake],
  );

  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>;
}

export function useIntake() {
  const ctx = useContext(IntakeContext);
  if (!ctx) throw new Error("useIntake must be used within an IntakeProvider");
  return ctx;
}
