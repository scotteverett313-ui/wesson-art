import ScaffoldScreen from "@/components/vaultmark/internal/ScaffoldScreen";

export default function SessionSelectPage() {
  return (
    <ScaffoldScreen
      screenNumber="01"
      screenName="Session Select"
      route="/vaultmark"
      buildStep="Step 4 — Session Select screen"
      description="Entry point for every session: Gallery / Institution vs Private Collector / Artist. Sets label language and key routing for the whole workflow."
    />
  );
}
