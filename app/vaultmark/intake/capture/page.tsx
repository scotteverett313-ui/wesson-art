import StepIndicator from "@/components/vaultmark/StepIndicator";
import ScaffoldScreen from "@/components/vaultmark/internal/ScaffoldScreen";
import { INTAKE_STEPS } from "@/lib/vaultmark/intakeSteps";

export default function CapturePage() {
  return (
    <>
      <StepIndicator steps={INTAKE_STEPS} currentStep={0} />
      <ScaffoldScreen
        screenNumber="02"
        screenName="Capture"
        route="/vaultmark/intake/capture"
        buildStep="Step 5 — Capture screen"
        description="Image upload and quality verification: format check, resolution check, lossless confirmation, and SHA-256 fingerprint generation."
      />
    </>
  );
}
