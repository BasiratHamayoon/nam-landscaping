// components/services/ServicesGrid.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Leaf, Droplets, Trees, Flower2, Sun, Shovel, CheckCircle2, ArrowRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/shared/SectionHeading"

const iconMap = { leaf: Leaf, droplets: Droplets, trees: Trees, flower: Flower2, sun: Sun, shovel: Shovel }

export default function ServicesGrid({ filtered, categories, activeCategory, setActiveCategory }) {
  const gridRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".service-card")
      cards.forEach((card, i) => {
        gsap.fromTo(card, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: (i % 3) * 0.1, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 85%", once: true } })
      })
      gsap.fromTo(".filter-pill", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out", scrollTrigger: { trigger: ".filter-bar", start: "top 90%", once: true } })
    }, gridRef)
    return () => ctx.revert()
  }, [filtered])

  return (
    <section ref={gridRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading badge="What We Offer" title="Signature Services" subtitle="Explore our full range of professional landscaping solutions tailored to UAE villas, hotels, and commercial projects." size="large" alignment="center" />
        <div className="filter-bar flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 mb-16">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`filter-pill px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all hover:scale-105 ${activeCategory === cat ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30" : "bg-card border border-border text-foreground hover:border-primary-500"}`}>
              {cat}
            </button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((service, i) => {
              const Icon = iconMap[service.icon?.toLowerCase()] || Leaf
              return (
                <Link key={service.id || i} href={`/services/${service.slug || service.id}`} className="service-card group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-600/10 cursor-pointer flex flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={`${service.image}?w=800&q=75`} alt={service.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/95 dark:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    {service.category && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-foreground">{service.category}</span>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-heading text-2xl sm:text-3xl text-white leading-tight">{service.title}</h3>
                    </div>
                  </div>
                  <div className="flex-1 p-6 flex flex-col">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5">{service.description}</p>
                    {service.features?.length > 0 && (
                      <ul className="space-y-2 mb-6">
                        {service.features.slice(0, 3).map((f, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">Learn More</span>
                      <div className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
                        <ArrowRight className="w-4 h-4 text-primary-600 dark:text-primary-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-heading text-2xl text-muted-foreground">No services found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  )
}