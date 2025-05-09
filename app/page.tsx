import HeroGeometric from "@/components/kokonutui/hero-geometric";
import FeaturedServices from "@/components/home/featured-services";
import Testimonials from "@/components/home/testimonials";
import CallToAction from "@/components/shared/call-to-action";

export default function HomePage() {
  return (
    <main>
      <HeroGeometric
        badge="Quantum Leap Digital"
        title1="ELEVATE your"
        title2="Digital Presence"
      />
      <FeaturedServices />
      <Testimonials />
      <CallToAction
        title="Ready to elevate your brand?"
        description="Let's discuss how we can help you achieve your digital marketing goals."
        buttonText="Get Started"
        buttonLink="/contact"
      />
    </main>
  );
}
