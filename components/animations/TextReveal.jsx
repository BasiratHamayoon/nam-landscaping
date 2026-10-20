"use client"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function TextReveal({ children, className, delay = 0, direction = "up" }) {
  const textRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!textRef.current) return

      const fromVars = {
        up: { y: 100, opacity: 0 },
        down: { y: -100, opacity: 0 },
        left: { x: -100, opacity: 0 },
        right: { x: 100, opacity: 0 },
      }

      gsap.fromTo(textRef.current, fromVars[direction], {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })
    }

    loadGSAP()
  }, [delay, direction])

  return (
    <div ref={textRef} className={cn("opacity-0", className)}>
      {children}
    </div>
  )
}