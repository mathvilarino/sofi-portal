import { NavBar } from "@/components/sections/NavBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedBySection } from "@/components/sections/TrustedBySection";
import { PlatformsSection } from "@/components/sections/PlatformsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { EcosystemFeaturesSection } from "@/components/sections/EcosystemFeaturesSection";
import { ArchitectureSection } from "@/components/sections/ArchitectureSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { Footer } from "@/components/sections/Footer";

export default function Portal() {
  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 relative">
      <NavBar />
      <HeroSection />
      <TrustedBySection />
      <PlatformsSection />
      <HowItWorksSection />
      <EcosystemFeaturesSection />
      <ArchitectureSection />
      <ComparisonSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
