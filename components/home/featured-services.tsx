"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { services } from "@/lib/services-data"

export default function FeaturedServices() {
  const featuredServices = services.slice(0, 3)

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-white/90 to-rose-300"
        >
          Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 max-w-2xl mx-auto"
        >
          We offer a comprehensive range of digital marketing services to help your business grow and succeed in the
          digital landscape.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featuredServices.map((service, index) => (
          <motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <Link href={`/services/${service.slug}`}>
              <div className="bg-white/3 border border-white/8 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white/5 hover:border-white/15 hover:shadow-lg hover:shadow-indigo-500/10">
                <div className={`w-14 h-14 rounded-xl ${service.gradient} mb-6 flex items-center justify-center`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-white/60 mb-6">{service.shortDescription}</p>
                <div className="flex items-center text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/services"
          className="inline-flex items-center text-white/80 hover:text-white border-b border-white/20 hover:border-white/80 pb-1 transition-colors"
        >
          View all services <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
