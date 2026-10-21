// components/projects/ProjectsStats.jsx
"use client"

import { useEffect, useRef } from "react"
import { Award, Users, MapPin, Clock } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const stats = [
  { icon: Award, value: 150, suffix: "+", label: "Completed Projects" },
  { icon: Users, value: 500, suffix: "+", label: "Happy Clients" },
  { icon: MapPin, value: 7, suffix: "", label: "Emirates Covered" },
  { icon: Clock, value: 12, suffix: "+", label: "Years Experience" },
]

export default function ProjectsStats() {
  const statsRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            once: true,
          },
        }
      )

      gsap.utils.toArray(".stat-number").forEach((el) => {
        const target = Number(el.dataset.value) || 0
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val)
          },
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        })
      })
    }, statsRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={statsRef} className="relative py-16 sm:py-20 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={i}
                className="stat-item group relative p-6 lg:p-8 rounded-3xl bg-card border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="stat-number font-heading text-4xl lg:text-5xl text-foreground" data-value={stat.value}>
                    0
                  </span>
                  <span className="font-heading text-2xl lg:text-3xl text-primary-600 dark:text-primary-400">
                    {stat.suffix}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}