// components/projects/ProjectsFeatured.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Sparkles, ArrowRight, MapPin, Calendar, Ruler } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProjectsFeatured({ project }) {
  const featuredRef = useRef(null)

  useEffect(() => {
    if (!project) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".feat-image",
        { scale: 1.15, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: featuredRef.current, start: "top 80%", once: true },
        }
      )

      gsap.fromTo(
        ".feat-anim",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: featuredRef.current, start: "top 80%", once: true },
        }
      )
    }, featuredRef)
    return () => ctx.revert()
  }, [project])

  if (!project) return null

  return (
    <section ref={featuredRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="feat-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Project</span>
            </div>
            <h2 className="feat-anim font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
              Signature <span className="italic text-primary-600 dark:text-primary-400">spotlight</span>
            </h2>
          </div>
        </div>

        <Link
          href={`/projects/${project.slug || project.id}`}
          className="group relative block rounded-3xl overflow-hidden border border-border bg-card cursor-pointer hover:border-primary-500/50 transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <div className="relative lg:col-span-3 aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={`${project.image}?w=1400&q=85`}
                alt={project.title}
                className="feat-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
            </div>

            <div className="lg:col-span-2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
              {project.category && (
                <span className="feat-anim inline-block w-fit px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 text-primary-600 dark:text-primary-400 text-[10px] font-bold uppercase tracking-wider mb-4">
                  {project.category}
                </span>
              )}

              <h3 className="feat-anim font-heading text-3xl sm:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
                {project.title}
              </h3>

              <p className="feat-anim text-muted-foreground leading-relaxed mb-8 line-clamp-4">
                {project.description}
              </p>

              <div className="feat-anim grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-border">
                <div>
                  <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400 mb-2" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Location</div>
                  <div className="text-sm font-semibold text-foreground truncate">
                    {project.location || "Dubai"}
                  </div>
                </div>
                <div>
                  <Calendar className="w-4 h-4 text-primary-600 dark:text-primary-400 mb-2" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Year</div>
                  <div className="text-sm font-semibold text-foreground">{project.year || "2024"}</div>
                </div>
                <div>
                  <Ruler className="w-4 h-4 text-primary-600 dark:text-primary-400 mb-2" />
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Area</div>
                  <div className="text-sm font-semibold text-foreground">{project.area || "2500m²"}</div>
                </div>
              </div>

              <div className="feat-anim inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-4 transition-all">
                View Case Study
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}