import { notFound } from "next/navigation"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { services } from "@/lib/services-data"
import PageHeader from "@/components/shared/page-header"
import ServiceProcess from "@/components/services/service-process"
import ServiceFaq from "@/components/services/service-faq"
import CallToAction from "@/components/shared/call-to-action"

export async function generateStaticParams() {
  return services.map((service) => ({
    service: service.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }) {
  // Ensure params is properly awaited
  const { service: serviceSlug } = await params
  const service = services.find((s) => s.slug === serviceSlug)

  if (!service) {
    return {
      title: "Service Not Found | Quantum Leap Digital",
      description: "The requested service could not be found.",
    }
  }

  return {
    title: `${service.title} | Quantum Leap Digital`,
    description: service.shortDescription,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  // Make the component async and await params
  const { service: serviceSlug } = await params
  const service = services.find((s) => s.slug === serviceSlug)

  if (!service) {
    notFound()
  }

  return (
    <main>
      <PageHeader title={service.title} subtitle={service.shortDescription} />

      <div className="container mx-auto px-4 mb-16">
        <Link href="/services" className="inline-flex items-center text-white/60 hover:text-white transition-colors">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to all services
        </Link>
      </div>

      <section className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-white/90 to-rose-300">
              {service.title}
            </h2>
            <div className="prose prose-invert prose-lg max-w-none opacity-80">
              <p>{service.description}</p>
            </div>
          </div>
          <div className="order-1 md:order-2 relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
            
            <Image src={service.image} alt={service.title} fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="bg-white/3 border border-white/8 rounded-xl p-6">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500/30 to-rose-500/30 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-white/60">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceProcess steps={service.process} />

      {service.faq && service.faq.length > 0 && <ServiceFaq faqs={service.faq} />}

      <CallToAction
        title={`Ready to elevate your ${service.title.toLowerCase()}?`}
        description="Get in touch to discuss how we can help you achieve your goals."
        buttonText="Get Started"
        buttonLink="/contact"
      />
    </main>
  )
}
