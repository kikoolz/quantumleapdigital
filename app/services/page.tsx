import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/page-header";
import ServiceCard from "@/components/services/service-card";
import { services } from "@/lib/services-data";
import CallToAction from "@/components/shared/call-to-action";

export const metadata = {
  title: "Services | Quantum Leap Digital",
  description:
    "Explore our comprehensive digital marketing services designed to elevate your brand.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        title="Our Services"
        subtitle="Comprehensive digital marketing solutions tailored to your business needs"
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link href={`/services/${service.slug}`} key={service.slug}>
              <ServiceCard
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
                gradient={service.gradient}
              >
                <div className="flex items-center mt-4 text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </ServiceCard>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24 bg-white/2 rounded-3xl my-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-white/90 to-rose-300">
            Our Approach
          </h2>
          <p className="text-white/70 mb-12 leading-relaxed">
            We believe in a strategic, data-driven approach to digital
            marketing. Every campaign begins with thorough research and ends
            with comprehensive analysis, ensuring continuous improvement and
            optimal results.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Research & Discovery",
              "Strategy & Execution",
              "Analysis & Optimization",
            ].map((step, index) => (
              <div
                key={index}
                className="bg-white/3 border border-white/8 rounded-xl p-6"
              >
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500/30 to-rose-500/30 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step}</h3>
                <p className="text-white/60 text-sm">
                  {index === 0 &&
                    "We dive deep into your business, audience, and competitors to identify opportunities."}
                  {index === 1 &&
                    "We develop and implement tailored strategies designed to achieve your specific goals."}
                  {index === 2 &&
                    "We continuously monitor, analyze, and refine our approach to maximize your ROI."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Need a custom solution?"
        description="Contact us to discuss your specific requirements and how we can help."
        buttonText="Contact Us"
        buttonLink="/contact"
      />
    </main>
  );
}
