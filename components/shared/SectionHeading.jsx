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
  size = "default",
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
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
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
        "mb-20 md:mb-24",
        center && "text-center",
        className
      )}
    >
      {badge && (
        <Badge
          className={cn(
            "mb-5",
            light && "bg-white/10 text-white/70 border-white/15"
          )}
        >
          {badge}
        </Badge>
      )}
      <h2
        className={cn(
          "font-heading leading-[1.1] mb-5",
          size === "large"
            ? "text-4xl md:text-5xl lg:text-7xl"
            : "text-3xl md:text-4xl lg:text-6xl",
          light ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-base md:text-lg max-w-xl font-body leading-relaxed",
            center && "mx-auto",
            light ? "text-white/50" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}