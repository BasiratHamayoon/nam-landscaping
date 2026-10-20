"use client"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function FadeIn({
  children,
  className,
  delay = 0,
  duration = 1,
  direction = "up",
  distance = 60,
  threshold = 0.1,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return

      const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: -distance },
        right: { x: distance },
        none: {},
      }

      gsap.fromTo(
        ref.current,
        { opacity: 0, ...directions[direction] },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    loadGSAP()
  }, [delay, duration, direction, distance])

  return (
    <div ref={ref} className={cn("opacity-0", className)}>
      {children}
    </div>
  )
}