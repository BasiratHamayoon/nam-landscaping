// components/projects/ProjectInfo.jsx
"use client"

import { useEffect, useRef } from "react"
import { Sparkles, CheckCircle2 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProjectInfo({ project }) {
  const infoRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".info-anim",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 75%", once: true },
        }
      )
      gsap.fromTo(
        ".info-feature",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".info-features-list", start: "top 85%", once: true },
        }
      )
    }, infoRef)
    return () => ctx.revert()
  }, [])

  const highlights = project.highlights || [
    "Custom irrigation system",
    "Native plant selection",
    "Energy-efficient lighting",
    "Sustainable hardscaping",
    "Water feature installation",
    "Smart garden technology",
  ]

  return (
    <section ref={infoRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <div className="info-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Overview</span>
            </div>

            <h2 className="info-anim font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight mb-8">
              A story of <span className="italic text-primary-600 dark:text-primary-400">transformation</span>
            </h2>

            <div className="info-anim space-y-5 text-muted-foreground leading-relaxed text-base sm:text-lg">
              <p>
                {project.longDescription ||
                  `This ${project.title.toLowerCase()} project represents our commitment to creating outdoor spaces that are not just beautiful, but functional and sustainable. Every detail was carefully considered to harmonize with the UAE's unique climate.`}
              </p>
              <p>
                From the initial consultation to the final touches, our team collaborated closely with the client to bring their vision to life, combining world-class design with local expertise.
              </p>
            </div>
          </div>

          <div>
            <div className="info-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-6">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Key Highlights</span>
            </div>

            <h3 className="info-anim font-heading text-3xl sm:text-4xl text-foreground leading-tight mb-8">
              Project features
            </h3>

            <ul className="info-features-list space-y-4">
              {highlights.map((item, i) => (
                <li
                  key={i}
                  className="info-feature flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary-500/50 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="text-sm sm:text-base font-medium text-foreground pt-2">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}