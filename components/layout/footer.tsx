import Link from "next/link";
import { Linkedin } from "lucide-react";
import {
  SiFacebook,
  SiInstagram,
  SiTiktok,
  SiX,
} from "@icons-pack/react-simple-icons";
import Logo from "@/components/ui/logo";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.08] pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <Logo size="large" />
            </div>
            <p className="text-white/60 mb-6 max-w-xs">
              Elevating businesses through innovative digital marketing
              strategies and solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <SiFacebook size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <SiX size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <SiInstagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <SiTiktok size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { name: "Digital Strategy", slug: "digital-strategy" },
                {
                  name: "Social Media Marketing",
                  slug: "social-media-marketing",
                },
                { name: "Content Creation", slug: "content-creation" },
                { name: "SEO Optimization", slug: "seo-optimization" },
                { name: "PPC Advertising", slug: "ppc-advertising" },
                { name: "Web Development", slug: "web-development" },
              ].map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 text-white/60">
              <li>Prime Cure Building</li>
              <li>Abu Dhabi, UAE</li>
              <li>info@quantumleapdigital.com</li>
              <li>+971-524419186</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] pt-8 mt-8 text-center text-white/40 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Quantum Leap Digital. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
