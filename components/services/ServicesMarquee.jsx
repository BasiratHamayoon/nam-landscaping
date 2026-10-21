// components/services/ServicesMarquee.jsx
"use client"

import { useEffect, useRef } from "react"
import { Leaf } from "lucide-react"
import gsap from "gsap"

export default function ServicesMarquee() {
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 25, ease: "none", repeat: -1 })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-6 border-b border-border bg-card/50 overflow-hidden">
      <div ref={marqueeRef} className="flex gap-16 whitespace-nowrap w-max">
        {[...Array(2)].flatMap((_, k) =>
          ["Garden Design", "Pool Construction", "Irrigation Systems", "Soft Landscaping", "Hardscaping", "Maintenance", "Lighting", "Water Features"].map((t, i) => (
            <div key={`${k}-${i}`} className="flex items-center gap-16 text-2xl sm:text-4xl font-heading text-muted-foreground/60">
              <span>{t}</span>
              <Leaf className="w-5 h-5 text-primary-500 shrink-0" />
            </div>
          ))
        )}
      </div>
    </section>
  )
}