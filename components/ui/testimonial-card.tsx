import { cn } from "@/lib/utils"
import { User } from "lucide-react"

export interface TestimonialAuthor {
  name: string
  handle: string
  company?: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border border-nourx-gray-200/50",
        "bg-white shadow-sm",
        "p-4 text-start sm:p-6",
        "hover:shadow-md hover:border-nourx-gray-200",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-nourx-gray-100 flex items-center justify-center">
          <User className="h-6 w-6 text-nourx-gray-600" />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none text-nourx-black">
            {author.name}
          </h3>
          <p className="text-sm text-nourx-gray-600">
            {author.company || author.handle}
          </p>
        </div>
      </div>
      <p className="sm:text-md text-sm text-nourx-gray-700 leading-relaxed">
        "{text}"
      </p>
    </Card>
  )
}