"use client"
import { useEffect, useRef } from "react"

export function useScrollAnimation(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const loadAndAnimate = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return

      const {
        y = 60,
        x = 0,
        opacity = 0,
        duration = 1,
        delay = 0,
        ease = "power3.out",
        start = "top 85%",
        scale = 1,
        rotation = 0,
      } = options

      gsap.fromTo(
        ref.current,
        { y, x, opacity, scale, rotation },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    loadAndAnimate()
  }, [])

  return ref
}

export function useStaggerAnimation(options = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const loadAndAnimate = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current) return

      const {
        selector = ".stagger-item",
        y = 80,
        opacity = 0,
        duration = 0.8,
        stagger = 0.15,
        ease = "back.out(1.7)",
        start = "top 85%",
      } = options

      const items = containerRef.current.querySelectorAll(selector)

      gsap.fromTo(
        items,
        { y, opacity },
        {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    loadAndAnimate()
  }, [])

  return containerRef
}