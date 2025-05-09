import Image from "next/image";
import PageHeader from "@/components/shared/page-header";
import TeamSection from "@/components/about/team-section";
import ValueProposition from "@/components/about/value-proposition";
import CallToAction from "@/components/shared/call-to-action";

export const metadata = {
  title: "About Us | Quantum Leap Digital",
  description:
    "Learn about our mission, values, and the team behind Quantum Leap Digital.",
};

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About Us"
        subtitle="Our story, mission, and the people behind Quantum Leap Digital"
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              Our Journey
            </h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              Founded in 2020, Quantum Leap Digital began with a simple mission:
              to help businesses navigate the complex digital landscape and
              achieve meaningful results.
            </p>
            <p className="text-white/70 mb-6 leading-relaxed">
              What started as a small team of passionate digital marketers has
              grown into a full-service agency with expertise across all digital
              channels. We have helped hundreds of businesses transform their
              online presence and achieve sustainable growth.
            </p>
            <p className="text-white/70 leading-relaxed">
              Our approach combines data-driven strategies with creative
              excellence, ensuring that every campaign we deliver not only looks
              great but also drives real business outcomes.
            </p>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <div className="absolute inset-0 z-10 rounded-2xl" />
            <Image
              src="/images/about.jpg?height=800&width=800"
              alt="Our team collaborating"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <ValueProposition />
      <TeamSection />
      <CallToAction
        title="Ready to work with us?"
        description="Let's create something amazing together."
        buttonText="Get in Touch"
        buttonLink="/contact"
      />
    </main>
  );
}
