"use client";

import { createContext, useContext } from "react";
import type { SessionType, VaultPiece } from "@/lib/vaultmark/types";

export interface SessionContextValue {
  sessionType: SessionType | null;
  pieces: VaultPiece[];
  selectSession: (type: SessionType) => void;
  addPiece: (piece: VaultPiece) => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  // Persisted session state and the piece library land in build-order Step 3.
  const value: SessionContextValue = {
    sessionType: null,
    pieces: [],
    selectSession: () => {},
    addPiece: () => {},
  };
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
