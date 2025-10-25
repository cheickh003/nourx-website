import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export interface DifferentiatorProps {
  icon: ReactNode
  title: string
  description: string
  color?: string
  className?: string
}

export function DifferentiatorCard({ 
  icon,
  title,
  description,
  color = "from-nourx-blue to-blue-600",
  className
}: DifferentiatorProps) {
  
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-border",
        "bg-card shadow-sm",
        "p-6 text-center",
        "hover:shadow-md",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-all duration-300",
        className
      )}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} opacity-20 absolute inset-0`}
          />
          <div className="relative z-10 w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-lg border border-border">
            <div className="text-foreground">{icon}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  )
}