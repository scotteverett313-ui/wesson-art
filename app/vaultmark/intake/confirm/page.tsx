import StepIndicator from "@/components/vaultmark/StepIndicator";
import ScaffoldScreen from "@/components/vaultmark/internal/ScaffoldScreen";
import { INTAKE_STEPS } from "@/lib/vaultmark/intakeSteps";

export default function ConfirmPage() {
  return (
    <>
      <StepIndicator steps={INTAKE_STEPS} currentStep={3} />
      <ScaffoldScreen
        screenNumber="05"
        screenName="Confirm & Sign"
        route="/vaultmark/intake/confirm"
        buildStep="Step 8 — Confirm screen"
        description="Full record review, legal attestation, and the non-reversible seal action that triggers key issuance."
      />
    </>
  );
}
