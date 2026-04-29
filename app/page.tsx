import { Hero } from "@/components/marketing/Hero";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { FeaturesGrid } from "@/components/marketing/FeaturesGrid";
import { SocialProof } from "@/components/marketing/SocialProof";
import { PricingTeaser } from "@/components/marketing/PricingTeaser";
import { FAQ } from "@/components/marketing/FAQ";
import { ClosingCTA } from "@/components/marketing/ClosingCTA";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <HowItWorks />
      <FeaturesGrid />
      <SocialProof />
      <PricingTeaser />
      <FAQ />
      <ClosingCTA />
    </div>
  );
}
