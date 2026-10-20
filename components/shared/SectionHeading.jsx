"use client"
import { useRef, useEffect } from "react"
import Badge from "@/components/ui/Badge"
import { cn } from "@/lib/utils"

export default function SectionHeading({
  badge,
  title,
  subtitle,
  center = true,
  className,
  light = false,
}) {
  const headingRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!headingRef.current) return

      const elements = headingRef.current.children

      gsap.fromTo(
        elements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    loadGSAP()
  }, [])

  return (
    <div
      ref={headingRef}
      className={cn(
        "mb-16 md:mb-20",
        center && "text-center",
        className
      )}
    >
      {badge && (
        <Badge
          className={cn(
            "mb-4",
            light && "bg-white/10 text-white/80 border-white/20"
          )}
        >
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight mb-4",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg max-w-2xl font-body leading-relaxed",
            center && "mx-auto",
            light ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-primary-600 via-emerald-500 to-primary-700",
          center && "mx-auto"
        )}
      />
    </div>
  )
}