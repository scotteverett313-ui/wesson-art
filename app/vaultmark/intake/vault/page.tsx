import StepIndicator from "@/components/vaultmark/StepIndicator";
import ScaffoldScreen from "@/components/vaultmark/internal/ScaffoldScreen";
import { INTAKE_STEPS } from "@/lib/vaultmark/intakeSteps";

export default function VaultPage() {
  return (
    <>
      <StepIndicator steps={INTAKE_STEPS} currentStep={1} />
      <ScaffoldScreen
        screenNumber="03"
        screenName="Vault"
        route="/vaultmark/intake/vault"
        buildStep="Step 6 — Vault screen"
        description="The core encryption engine: QR symbol selection, region controls, the 6-frame pipeline visualization, and pixel key generation."
      />
    </>
  );
}
