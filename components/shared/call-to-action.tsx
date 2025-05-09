import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CallToAction({
  title,
  description,
  buttonText,
  buttonLink,
}: {
  title: string
  description: string
  buttonText: string
  buttonLink: string
}) {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-rose-600/20" />
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/placeholder.png" alt="placeholder" width={1920} height={1080} />
        </div>

        <div className="relative z-10 py-16 md:py-24 px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            {title}
          </h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">{description}</p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white"
          >
            <Link href={buttonLink}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
