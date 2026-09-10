import ScaffoldNotice from "@/components/vaultmark/internal/ScaffoldNotice";

interface PipelineStripProps {
  originalCanvas?: HTMLCanvasElement | null;
}

export default function PipelineStrip(_props: PipelineStripProps) {
  return <ScaffoldNotice component="PipelineStrip" buildStep="Step 6 — Vault screen" />;
}
