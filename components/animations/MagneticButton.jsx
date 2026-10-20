"use client"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function MagneticButton({ children, className, strength = 0.3 }) {
  const buttonRef = useRef(null)

  useEffect(() => {
    const button = buttonRef.current
    if (!button) return

    let gsapInstance = null

    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      gsapInstance = gsap

      const handleMouseMove = (e) => {
        const rect = button.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2

        gsap.to(button, {
          x: x * strength,
          y: y * strength,
          duration: 0.4,
          ease: "power2.out",
        })
      }

      const handleMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        })
      }

      button.addEventListener("mousemove", handleMouseMove)
      button.addEventListener("mouseleave", handleMouseLeave)

      button._cleanup = () => {
        button.removeEventListener("mousemove", handleMouseMove)
        button.removeEventListener("mouseleave", handleMouseLeave)
      }
    }

    loadGSAP()

    return () => {
      if (button._cleanup) button._cleanup()
    }
  }, [strength])

  return (
    <div ref={buttonRef} className={cn("inline-block", className)}>
      {children}
    </div>
  )
}