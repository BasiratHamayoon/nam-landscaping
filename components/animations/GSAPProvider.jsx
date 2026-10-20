"use client"
import { useEffect } from "react"

export default function GSAPProvider({ children }) {
  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      gsap.defaults({
        ease: "power3.out",
        duration: 1,
      })
    }

    initGSAP()
  }, [])

  return <>{children}</>
}