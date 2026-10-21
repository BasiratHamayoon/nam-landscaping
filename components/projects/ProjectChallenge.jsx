// components/projects/ProjectChallenge.jsx
"use client"

import { useEffect, useRef } from "react"
import { Target, Lightbulb, TrendingUp } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProjectChallenge({ project }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".chall-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
        }
      )
      gsap.fromTo(
        ".chall-card",
        { y: 60, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".chall-grid", start: "top 85%", once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const items = [
    {
      icon: Target,
      label: "The Challenge",
      title: "Harsh desert climate",
      description:
        project.challenge ||
        "Creating a lush, thriving landscape in the demanding UAE climate required innovative solutions for water efficiency and plant selection.",
    },
    {
      icon: Lightbulb,
      label: "Our Solution",
      title: "Smart adaptive design",
      description:
        project.solution ||
        "We implemented a drip irrigation system paired with native and drought-resistant plants, creating a self-sustaining ecosystem.",
    },
    {
      icon: TrendingUp,
      label: "The Result",
      title: "Thriving outdoor sanctuary",
      description:
        project.result ||
        "A stunning, low-maintenance landscape that reduces water consumption by 60% while providing year-round beauty.",
    },
  ]

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <div className="chall-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Target className="w-3.5 h-3.5" />
            <span>Case Study</span>
          </div>
          <h2 className="chall-anim font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight max-w-3xl mx-auto">
            From vision to <span className="italic text-primary-600 dark:text-primary-400">reality</span>
          </h2>
        </div>

        <div className="chall-grid grid grid-cols-1 md:grid-cols-3 gap-6" style={{ perspective: "1200px" }}>
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="chall-card group relative p-8 rounded-3xl bg-card border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary-600/10"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
                  <Icon className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>

                <div className="text-[10px] uppercase tracking-wider text-primary-600 dark:text-primary-400 font-bold mb-3">
                  {item.label}
                </div>

                <h3 className="font-heading text-2xl text-foreground leading-tight mb-4">{item.title}</h3>

                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}