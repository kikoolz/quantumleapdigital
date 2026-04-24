"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    name: "Kenneth Kikoole",
    position: "Software Engineer",
    bio: "With ample years of experience in software engineering, Kenneth leads our team with vision and expertise.",
    image: "/images/kenneth.JPG?height=400&width=400",
  },
  {
    name: "Anitah Awori",
    position: "Digital Marketing Specialist",
    bio: "Anitah brings creative excellence to every project, ensuring our clients' brands stand out.",
    image: "/images/anitah.JPG?height=400&width=400",
  },
  {
    name: "Ritah Nakabiito",
    position: "Head of Strategy",
    bio: "Ritah develops data-driven strategies that deliver measurable results for our clients.",
    image: "/images/rita.jpg?height=400&width=400",
  },
  {
    name: "Ivan Batanda",
    position: "Technical Lead",
    bio: "Ivan ensures our technical implementations are not only cutting-edge but also scalable and effective.",
    image: "/images/ivan.jpg?height=400&width=400",
  },
];

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
        <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-indigo-300 via-white/90 to-rose-300">
          Meet Our Team
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Our talented team of digital marketing experts is passionate about
          helping businesses succeed in the digital landscape.
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
            <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden group">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#030303] via-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-white/60">{member.position}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-white/70 mb-4">{member.bio}</p>
               
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
