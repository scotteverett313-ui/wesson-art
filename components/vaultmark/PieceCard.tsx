import ScaffoldNotice from "@/components/vaultmark/internal/ScaffoldNotice";
import type { VaultPiece } from "@/lib/vaultmark/types";

interface PieceCardProps {
  piece: VaultPiece;
  onOpen?: (piece: VaultPiece) => void;
}

export default function PieceCard(_props: PieceCardProps) {
  return <ScaffoldNotice component="PieceCard" buildStep="Step 11 — Dashboard screen" />;
}
