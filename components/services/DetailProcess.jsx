// components/services/DetailProcess.jsx
"use client"

import { useEffect, useRef } from "react"
import { Clock } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function DetailProcess({ process }) {
  const processRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(".process-step", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out", scrollTrigger: { trigger: processRef.current, start: "top 75%", once: true } })
    }, processRef)
    return () => ctx.revert()
  }, [])

  const steps = process || [
    { title: "Consultation", description: "We visit your site, understand your vision, and assess the space." },
    { title: "Design", description: "Our team creates a detailed 3D design plan tailored to your needs." },
    { title: "Execution", description: "Skilled craftsmen bring your landscape to life with precision." },
    { title: "Handover", description: "Final walkthrough and ongoing care guidance to keep it thriving." },
  ]

  return (
    <section ref={processRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Our Process</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
            Simple. Transparent. <span className="italic text-primary-600 dark:text-primary-400">Proven.</span>
          </h2>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-6 sm:left-8 top-6 bottom-6 w-px bg-gradient-to-b from-primary-600 via-primary-500 to-transparent" />
          {steps.map((step, i) => (
            <div key={i} className="process-step relative flex gap-6 sm:gap-10 pb-12 last:pb-0">
              <div className="relative shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-600 text-white font-heading text-xl sm:text-2xl flex items-center justify-center shadow-lg shadow-primary-600/30 relative z-10">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="flex-1 pt-2 sm:pt-4">
                <h3 className="font-heading text-2xl sm:text-3xl text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}