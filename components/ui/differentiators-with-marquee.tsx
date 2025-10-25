import { cn } from "@/lib/utils"
import { DifferentiatorCard, DifferentiatorProps } from "@/components/ui/differentiator-card"

interface DifferentiatorsSectionProps {
  title: string
  description: string
  differentiators: Array<DifferentiatorProps>
  className?: string
}

export function DifferentiatorsSection({ 
  title,
  description,
  differentiators,
  className 
}: DifferentiatorsSectionProps) {
  return (
    <section className={cn(
      "bg-muted text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight text-foreground">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:60s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(3)].map((_, setIndex) => (
                differentiators.map((differentiator, i) => (
                  <DifferentiatorCard 
                    key={`${setIndex}-${i}`}
                    {...differentiator}
                  />
                ))
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-muted sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-muted sm:block" />
        </div>
      </div>
    </section>
  )
}