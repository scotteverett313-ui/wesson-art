export type SessionType = "gallery" | "private";

export type PieceStatus = "Vaulted" | "Listed" | "Sold" | "On Loan";

export type QRSymbolId = "VM-A" | "VM-B" | "VM-C" | "VM-D";

export interface KeyTileRecord {
  dest: number;
  src: number;
  checksum: string;
}

export interface VaultKeyCredential {
  version: string;
  seed: number;
  grid: number;
  keyCount: number;
  imageSize: number;
  tileSize: number;
  vaultFingerprint: string;
  mapChecksum: string;
  keyTiles: KeyTileRecord[];
  qrSymbol: QRSymbolId;
  edition?: number;
  totalEditions?: number;
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
  vaultedAt: string;
  key: string;
  thumbColors: { bg: string; fg: string };
}
