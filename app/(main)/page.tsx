import { Pricing } from "@/components/landing/pricing";
import { BentoGridBlock } from "@/components/landing/Bento";
import { Hero } from "@/components/landing/Hero";
import { CTA } from "@/components/ui/call-to-action";
import { demoPlans } from "@/constants/landing";

export default function Home() {
  return (
      <div className="container mx-auto">
        <Hero/>
        <Pricing plans={demoPlans} title="Pricing" description="description"/>
        <BentoGridBlock />
        <CTA />
      </div>
  );
}
