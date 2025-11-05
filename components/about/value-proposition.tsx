"use client"

import { motion } from "framer-motion"
import { Award, BarChart, Heart, Lightbulb, Target, Users } from "lucide-react"

const values = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Innovation",
    description: "We constantly explore new technologies and strategies to keep our clients ahead of the curve.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Results-Driven",
    description: "We focus on delivering measurable results that directly impact our clients' business objectives.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Client-Centric",
    description: "We build lasting partnerships with our clients, understanding their unique needs and goals.",
  },
  {
    icon: <BarChart className="h-6 w-6" />,
    title: "Data-Informed",
    description: "We leverage data analytics to make informed decisions and optimize campaign performance.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Passion",
    description: "We're passionate about digital marketing and dedicated to helping our clients succeed.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Excellence",
    description: "We strive for excellence in everything we do, from strategy development to execution.",
  },
]

export default function ValueProposition() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 bg-white/2 rounded-3xl my-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-white/90 to-rose-300">
          Our Core Values
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          These principles guide our approach and define who we are as a company.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="bg-white/3 border border-white/8 rounded-xl p-6 h-full">
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500/30 to-rose-500/30 flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-white/60">{value.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
