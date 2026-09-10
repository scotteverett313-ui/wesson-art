import ScaffoldNotice from "@/components/vaultmark/internal/ScaffoldNotice";
import type { VaultPiece } from "@/lib/vaultmark/types";

interface LabelFormProps {
  initialValues?: Partial<VaultPiece>;
  onSubmit?: (values: Partial<VaultPiece>) => void;
}

export default function LabelForm(_props: LabelFormProps) {
  return <ScaffoldNotice component="LabelForm" buildStep="Step 7 — Label screen" />;
}
