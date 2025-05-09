import { Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/shared/page-header";
import ContactForm from "@/components/contact/contact-form";

export const metadata = {
  title: "Contact Us | Quantum Leap Digital",
  description:
    "Get in touch with our team to discuss your digital marketing needs.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team to discuss your digital marketing needs"
      />

      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
              Get in Touch
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Have a question or ready to start your next project? Fill out the
              form and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email Us</h3>
                  <p className="text-white/60">info@quantumleapdigital.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mr-4">
                  <Phone className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Call Us</h3>
                  <p className="text-white/60">+971-524419186</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mr-4">
                  <MapPin className="h-5 w-5 text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                  <p className="text-white/60">
                    Prime Cure Building
                    <br />
                    Abu Dhabi, UAE
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Office Hours</h3>
              <div className="space-y-2 text-white/60">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="w-full h-[400px] rounded-2xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent z-10" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7009.191008771028!2d54.36305922463661!3d24.478104662592493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e6717de61d957%3A0xde6de9495d65627f!2sPrima%20Cure%20Medical%20Center!5e1!3m2!1sen!2sae!4v1744414323962!5m2!1sen!2sae"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Quantum Leap Digital Office Location"
          />
        </div>
      </section>
    </main>
  );
}
