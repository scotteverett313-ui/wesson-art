import ScaffoldNotice from "@/components/vaultmark/internal/ScaffoldNotice";
import type { VaultKeyCredential } from "@/lib/vaultmark/types";

interface VerifyPanelProps {
  onVerify?: (image: File, key: string) => Promise<void>;
  result?: { pass: boolean; detail: string } | null;
  keyCredential?: VaultKeyCredential;
}

export default function VerifyPanel(_props: VerifyPanelProps) {
  return <ScaffoldNotice component="VerifyPanel" buildStep="Step 13 — Public Verify page" />;
}
