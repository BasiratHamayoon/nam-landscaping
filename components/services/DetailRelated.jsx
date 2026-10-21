// components/services/DetailRelated.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Leaf, ArrowRight, Droplets, Trees, Flower2, Sun, Shovel } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const iconMap = { leaf: Leaf, droplets: Droplets, trees: Trees, flower: Flower2, sun: Sun, shovel: Shovel }

export default function DetailRelated({ relatedServices }) {
  const relatedRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(".related-card", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: relatedRef.current, start: "top 80%", once: true } })
    }, relatedRef)
    return () => ctx.revert()
  }, [])

  if (!relatedServices || relatedServices.length === 0) return null

  return (
    <section ref={relatedRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <Leaf className="w-3.5 h-3.5" />
              <span>Explore More</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground leading-tight tracking-tight">Related services</h2>
          </div>
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all cursor-pointer">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedServices.map((rel, i) => {
            const RelIcon = iconMap[rel.icon?.toLowerCase()] || Leaf
            return (
              <Link key={rel.id || i} href={`/services/${rel.slug || rel.id}`} className="related-card group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-xl cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={`${rel.image}?w=800&q=75`} alt={rel.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-11 h-11 rounded-xl bg-white/95 dark:bg-black/80 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <RelIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-heading text-2xl text-white">{rel.title}</h3>
                  </div>
                </div>
                <div className="p-5 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground line-clamp-1 flex-1">{rel.description}</p>
                  <ArrowRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}