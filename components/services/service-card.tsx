import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export default function ServiceCard({
  title,
  description,
  icon,
  gradient,
  children,
}: {
  title: string
  description: string
  icon: ReactNode
  gradient: string
  children?: ReactNode
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.15] hover:shadow-lg hover:shadow-indigo-500/10 group">
      <div className={`w-14 h-14 rounded-xl ${gradient} mb-6 flex items-center justify-center`}>{icon}</div>
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>
      <p className={cn("text-white/60 mb-6", children && "mb-2")}>{description}</p>
      {children}
    </div>
  )
}
