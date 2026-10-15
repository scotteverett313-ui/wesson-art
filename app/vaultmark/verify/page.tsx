import ScaffoldScreen from "@/components/vaultmark/internal/ScaffoldScreen";

export default function VerifyPage() {
  return (
    <ScaffoldScreen
      screenNumber="09"
      screenName="Public Verify"
      route="/vaultmark/verify"
      buildStep="Step 13 — Public Verify page"
      description="Standalone, stateless verification: paste a key and upload an image. Three-layer check — vault fingerprint, scramble map, pixel hash — no login required."
    />
  );
}
