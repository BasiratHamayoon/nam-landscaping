"use client"
import Image from "next/image"
import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TestimonialCard({ testimonial, isActive = false }) {
  return (
    <div
      className={cn(
        "relative p-8 rounded-3xl transition-all duration-500",
        isActive
          ? "bg-primary text-white scale-105 shadow-2xl shadow-primary/30"
          : "bg-card border border-border hover-lift"
      )}
    >
      <Quote
        className={cn(
          "w-10 h-10 mb-4",
          isActive ? "text-white/30" : "text-primary/20"
        )}
      />
      <p
        className={cn(
          "text-base leading-relaxed mb-6 font-body",
          isActive ? "text-white/90" : "text-muted-foreground"
        )}
      >
        {testimonial.content}
      </p>
      <div className="flex items-center gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4
            className={cn(
              "font-semibold font-heading",
              isActive ? "text-white" : "text-foreground"
            )}
          >
            {testimonial.name}
          </h4>
          <p
            className={cn(
              "text-sm font-body",
              isActive ? "text-white/70" : "text-muted-foreground"
            )}
          >
            {testimonial.role} • {testimonial.location}
          </p>
        </div>
      </div>
      <div className="flex gap-1 mt-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-4 h-4 fill-current",
              isActive ? "text-yellow-300" : "text-yellow-500"
            )}
          />
        ))}
      </div>
    </div>
  )
}