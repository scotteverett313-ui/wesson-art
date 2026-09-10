import { IntakeProvider } from "@/components/vaultmark/IntakeContext";

export default function IntakeLayout({ children }: { children: React.ReactNode }) {
  return <IntakeProvider>{children}</IntakeProvider>;
}
