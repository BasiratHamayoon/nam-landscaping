"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "350+", label: "Projects Completed" },
  { value: "40+", label: "Expert Horticulturists" },
  { value: "100%", label: "Client Satisfaction" },
]

export function AboutStats() {
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        }
      )
    }, statsRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={statsRef} className="py-20 bg-[#0a0f0c] text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item flex flex-col items-center text-center px-4">
              <span className="text-4xl md:text-6xl font-heading text-primary-400 mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base font-sans text-white/70 tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}