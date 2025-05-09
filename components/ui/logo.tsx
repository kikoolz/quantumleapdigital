"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Logo({
  className,
  size = "default",
}: {
  className?: string
  size?: "small" | "default" | "large"
}) {
  const sizeClasses = {
    small: "text-sm",
    default: "text-xl",
    large: "text-2xl",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image 
        src="/images/logo1.png"
        alt="Quantum Leap Digital Logo"
        width={32}
        height={32}
        className="w-8 h-8"
      />
      <div
        className={cn(
          "font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
          sizeClasses[size],
        )}
      >
        Quantum Leap Digital
      </div>
    </div>
  )
}
