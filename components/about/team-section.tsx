"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import { SiX } from "@icons-pack/react-simple-icons"

const team = [
  {
    name: "Kenneth Kikoole",
    position: "CEO & Co-Founder",
    bio: "With ample years of experience in digital marketing, Kenneth leads our team with vision and expertise.",
    image: "/images/kenneth.jpg?height=400&width=400",
  },
  {
    name: "Phiona Komukyeya",
    position: "COO & Co-Founder",
    bio: "Phiona brings creative excellence to every project, ensuring our clients' brands stand out.",
    image: "/images/phiona.jpeg?height=400&width=400",
  },
  {
    name: "Michelle Batanda",
    position: "Head of Strategy",
    bio: "Michelle develops data-driven strategies that deliver measurable results for our clients.",
    image: "/images/phiona.jpeg?height=400&width=400",
  },
  {
    name: "Jordan Smith",
    position: "Technical Lead",
    bio: "Jordan ensures our technical implementations are cutting-edge, scalable, and effective.",
    image: "/images/kenneth.jpg?height=400&width=400",
  },
]

export default function TeamSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
          Meet Our Team
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Our talented team of digital marketing experts is passionate about helping businesses succeed in the digital
          landscape.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden group">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-white/60">{member.position}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/70 mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <SiX className="h-4 w-4" />
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
