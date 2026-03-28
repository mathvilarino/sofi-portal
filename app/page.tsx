import dynamic from "next/dynamic";
import { NavBar } from "@/components/sections/NavBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";

// Lazy-load below-the-fold sections
const EcosystemFeaturesSection = dynamic(
  () => import("@/components/sections/EcosystemFeaturesSection").then((m) => m.EcosystemFeaturesSection),
  { ssr: true }
);

const ArchitectureSection = dynamic(
  () => import("@/components/sections/ArchitectureSection").then((m) => m.ArchitectureSection),
  { ssr: true }
);

const ComparisonSection = dynamic(
  () => import("@/components/sections/ComparisonSection").then((m) => m.ComparisonSection),
  { ssr: true }
);

const CtaSection = dynamic(
  () => import("@/components/sections/CtaSection").then((m) => m.CtaSection),
  { ssr: true }
);

const Footer = dynamic(
  () => import("@/components/sections/Footer").then((m) => m.Footer),
  { ssr: true }
);

export default function Portal() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative transition-colors duration-300">
      <NavBar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <PlatformsSection />
        <HowItWorksSection />
        <EcosystemFeaturesSection />
        <ArchitectureSection />
        <ComparisonSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}
