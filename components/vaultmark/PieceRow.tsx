import ScaffoldNotice from "@/components/vaultmark/internal/ScaffoldNotice";
import type { VaultPiece } from "@/lib/vaultmark/types";

interface PieceRowProps {
  piece: VaultPiece;
  onOpen?: (piece: VaultPiece) => void;
}

export default function PieceRow(_props: PieceRowProps) {
  return <ScaffoldNotice component="PieceRow" buildStep="Step 11 — Dashboard screen" />;
}
