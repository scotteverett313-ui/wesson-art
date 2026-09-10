import type { QRSymbolId, VaultKeyCredential } from "./types";

export interface VaultEngineConfig {
  gridSize: number;
  keyTileCount: number;
  seed: number;
  qrSymbol: QRSymbolId;
}

export interface VaultEngineResult {
  scrambleMap: number[];
  keyCredential: VaultKeyCredential;
}

// Pixel-mask extraction, SHA-256 checksums, and seeded scramble map — ported
// from the HTML prototypes in build-order Step 2. Scaffolded here so Capture,
// Vault, and Verify have a stable import path to build against.
export function runVaultEngine(
  _image: ImageData,
  _config: VaultEngineConfig,
): Promise<VaultEngineResult> {
  throw new Error("VaultEngine is scaffolded but not yet implemented — see build order Step 2.");
}
