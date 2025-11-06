"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function ServiceFaq({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
          Frequently Asked Questions
        </h2>
        <p className="text-white/60 max-w-2xl mx-auto">
          Find answers to common questions about our services.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={cn(
              "border border-white/8 rounded-xl mb-4 overflow-hidden",
              openIndex === index ? "bg-white/3" : "bg-transparent"
            )}
          >
            <button
              onClick={() => {
                toggleFaq(index);
              }}
              className="w-full text-left p-6 flex justify-between items-center"
            >
              <h3 className="text-lg font-medium">{faq.question}</h3>
              <ChevronDown
                className={cn(
                  "h-5 w-5 text-white/60 transition-transform duration-300",
                  openIndex === index && "transform rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              )}
            >
              <div className="p-6 pt-0 text-white/70">{faq.answer}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
