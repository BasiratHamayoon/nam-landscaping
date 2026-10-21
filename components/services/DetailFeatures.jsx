// components/services/DetailFeatures.jsx
"use client"

import { useEffect, useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function DetailFeatures({ features }) {
  const featuresRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(".feature-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: featuresRef.current, start: "top 80%", once: true } })
    }, featuresRef)
    return () => ctx.revert()
  }, [])

  const defaultFeatures = ["Expert design consultation", "Premium quality materials", "Climate-adapted solutions", "Professional installation", "Ongoing maintenance support", "Satisfaction guaranteed"]
  const items = features || defaultFeatures

  return (
    <section ref={featuresRef} className="relative py-20 sm:py-28 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>What&apos;s Included</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
            Everything you need, <span className="italic text-primary-600 dark:text-primary-400">nothing you don&apos;t</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((feature, i) => (
            <div key={i} className="feature-card group relative p-7 rounded-3xl bg-card border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary-600/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center shrink-0 group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
                  <CheckCircle2 className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="font-heading text-xl text-foreground mb-2">{typeof feature === "string" ? feature : feature.title}</h3>
                  {typeof feature !== "string" && feature.description && <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}