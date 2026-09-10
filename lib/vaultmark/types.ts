export type SessionType = "gallery" | "private";

export type PieceStatus = "Vaulted" | "Listed" | "Sold" | "On Loan";

export type QRSymbolId = "VM-A" | "VM-B" | "VM-C" | "VM-D";

// The issued .vmk credential: enough to reconstruct the QR mask and the
// exact region of the original image it was drawn over, so a candidate
// image can be re-checked against it without Vaultmark storing anything.
export interface VaultKeyCredential {
  version: string;
  vaultId: string;
  qrSymbol: QRSymbolId;
  regionX: number;
  regionY: number;
  zoomLevel: number;
  qrSize: number;
  maskedCount: number;
  pixelHash: string;
  vaultFingerprint: string;
  issuedAt: string;
}

export interface VaultPiece {
  id: string;
  certificateNumber: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  dimensions: string;
  edition: string;
  status: PieceStatus;
  value: string;
  appraiser: string;
  provenance: string;
  notes: string;
  qrSymbol: QRSymbolId;
  maskedPixelCount: number;
  imageFingerprint: string;
  pixelHash: string;
  vaultedAt: string;
  key: string;
  thumbColors: { bg: string; fg: string };
}
