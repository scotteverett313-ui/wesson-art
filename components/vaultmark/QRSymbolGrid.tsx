import ScaffoldNotice from "@/components/vaultmark/internal/ScaffoldNotice";
import type { QRSymbolId } from "@/lib/vaultmark/types";

interface QRSymbolGridProps {
  selected?: QRSymbolId;
  onSelect?: (symbol: QRSymbolId) => void;
}

export default function QRSymbolGrid(_props: QRSymbolGridProps) {
  return <ScaffoldNotice component="QRSymbolGrid" buildStep="Step 6 — Vault screen" />;
}
