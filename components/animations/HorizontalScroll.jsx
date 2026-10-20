"use client"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function HorizontalScroll({ children, className }) {
  const containerRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current || !scrollRef.current) return

      const scrollWidth = scrollRef.current.scrollWidth
      const viewportWidth = containerRef.current.offsetWidth

      gsap.to(scrollRef.current, {
        x: -(scrollWidth - viewportWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth - viewportWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })
    }

    loadGSAP()
  }, [])

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={scrollRef} className="flex gap-6 w-max">
        {children}
      </div>
    </div>
  )
}