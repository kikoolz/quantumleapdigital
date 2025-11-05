"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { cn } from "@/lib/utils"


const testimonials = [
  {
    id: 1,
    content:
      "Quantum Leap Digital transformed our online presence completely. Their strategic approach to digital marketing helped us increase our leads by 150% in just three months.",
    author: "David Johnson",
    position: "Marketing Director, Furnico Furniture.",
    image: "/images/kenneth.jpg",
  },
  {
    id: 2,
    content:
      "Working with Quantum Leap Digital has been a game-changer for our business. Their team's expertise in SEO and content marketing has significantly improved our organic traffic and conversion rates.",
    author: "Michelle Owen",
    position: "CEO, GrowthWave",
    image: "/images/phiona.jpeg",
  },
  {
    id: 3,
    content:
      "The social media strategy developed by Quantum Leap Digital helped us connect with our audience in ways we never thought possible. Our engagement rates have skyrocketed!",
    author: "Costa Rodriguez",
    position: "Social Media Manager, Pulse Brands",
    image: "/images/kenneth.jpg",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="relative bg-white/2 border border-white/8 rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-indigo-500/5 to-rose-500/5 opacity-50" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <Quote className="h-16 w-16 text-indigo-300/30" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative h-[250px] md:h-[200px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: activeIndex === index ? 1 : 0,
                    x: activeIndex === index ? 0 : 20,
                    position: activeIndex === index ? "relative" : "absolute",
                  }}
                  transition={{ duration: 0.5 }}
                  className={cn("text-center", activeIndex !== index && "absolute inset-0")}
                >
                  <p className="text-xl md:text-2xl text-white/80 italic mb-8">&ldquo;{testimonial.content}&rdquo;</p>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-white/10">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-semibold">{testimonial.author}</h4>
                    <p className="text-white/60">{testimonial.position}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center mt-20 space-x-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white/3 border border-white/8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white/3 border border-white/8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
