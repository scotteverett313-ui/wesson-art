import ScaffoldNotice from "@/components/vaultmark/internal/ScaffoldNotice";
import type { VaultPiece } from "@/lib/vaultmark/types";

interface PieceModalProps {
  piece: VaultPiece | null;
  onClose: () => void;
}

export default function PieceModal(_props: PieceModalProps) {
  return <ScaffoldNotice component="PieceModal" buildStep="Step 12 — Piece Detail Modal" />;
}
