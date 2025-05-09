"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ServiceProcess({
  steps,
}: {
  steps: { title: string; description: string }[]
}) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 bg-white/[0.02] rounded-3xl my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
          Our Process
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          We follow a structured approach to ensure the best results for your business.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex flex-col md:flex-row items-start mb-12 md:mb-16 relative">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/30 to-rose-500/30 flex items-center justify-center z-10">
                <span className="text-xl font-bold">{index + 1}</span>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-6 top-12 w-px h-[calc(100%+64px)] bg-gradient-to-b from-indigo-500/20 to-rose-500/20 transform -translate-x-1/2 md:block hidden" />
              )}

              <div className={cn("md:ml-8 mt-4 md:mt-0", index < steps.length - 1 && "pb-12 md:pb-16")}>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
