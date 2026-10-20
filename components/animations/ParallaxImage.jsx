"use client"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function ParallaxImage({ src, alt, className, speed = 0.3, overlay = true }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current) return

      const img = containerRef.current.querySelector("img")
      if (!img) return

      gsap.fromTo(
        img,
        { yPercent: -10 * speed },
        {
          yPercent: 10 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
    }

    loadGSAP()
  }, [speed])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover scale-125"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      )}
    </div>
  )
}