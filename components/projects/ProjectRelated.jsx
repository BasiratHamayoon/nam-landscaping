// components/projects/ProjectRelated.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Leaf, ArrowUpRight, ArrowRight, MapPin } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProjectRelated({ related }) {
  const relatedRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".related-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: relatedRef.current, start: "top 85%", once: true },
        }
      )
      gsap.fromTo(
        ".related-proj-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: ".related-grid", start: "top 85%", once: true },
        }
      )
    }, relatedRef)
    return () => ctx.revert()
  }, [])

  if (!related || related.length === 0) return null

  return (
    <section ref={relatedRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <div className="related-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <Leaf className="w-3.5 h-3.5" />
              <span>Explore More</span>
            </div>
            <h2 className="related-anim font-heading text-4xl sm:text-5xl text-foreground leading-tight tracking-tight">
              Related projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="related-anim inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all cursor-pointer"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="related-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map((rel, i) => (
            <Link
              key={rel.id || i}
              href={`/projects/${rel.slug || rel.id}`}
              className="related-proj-card group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-xl cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={`${rel.image}?w=800&q=75`}
                  alt={rel.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
                  <ArrowUpRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>

                {rel.category && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-foreground">
                      {rel.category}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-2xl text-white leading-tight mb-2 line-clamp-2">{rel.title}</h3>
                  <div className="flex items-center gap-1.5 text-white/80 text-xs">
                    <MapPin className="w-3 h-3" />
                    <span>{rel.location || "Dubai"}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}