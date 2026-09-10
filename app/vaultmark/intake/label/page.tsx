import StepIndicator from "@/components/vaultmark/StepIndicator";
import ScaffoldScreen from "@/components/vaultmark/internal/ScaffoldScreen";
import { INTAKE_STEPS } from "@/lib/vaultmark/intakeSteps";

export default function LabelPage() {
  return (
    <>
      <StepIndicator steps={INTAKE_STEPS} currentStep={2} />
      <ScaffoldScreen
        screenNumber="04"
        screenName="Label"
        route="/vaultmark/intake/label"
        buildStep="Step 7 — Label screen"
        description="Museum-quality metadata entry: artwork identification, physical details, edition and provenance, and the auto-filled vault record."
      />
    </>
  );
}
