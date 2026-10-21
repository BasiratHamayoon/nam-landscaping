// components/projects/ProjectHero.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Ruler, Users } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProjectHero({ project }) {
  const heroRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const splitWords = (el) => {
        if (!el) return []
        const text = el.textContent
        el.innerHTML = text
          .split(" ")
          .map((w) => `<span class="inline-block overflow-hidden pb-2"><span class="inline-block word">${w}</span></span>`)
          .join(" ")
        return el.querySelectorAll(".word")
      }

      const title = heroRef.current?.querySelector(".proj-detail-title")
      if (title) {
        const words = splitWords(title)
        gsap.from(words, { yPercent: 120, duration: 1.1, stagger: 0.1, ease: "power4.out", delay: 0.2 })
      }

      gsap.from(".proj-detail-anim", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.5 })
      gsap.fromTo(".proj-hero-img", { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out" })
      gsap.to(".proj-hero-img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
      })

      gsap.from(".proj-meta-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        delay: 1,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [project])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-end pt-36 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f0c]">
        <img
          src={`${project.image}?w=1920&q=85`}
          alt={project.title}
          className="proj-hero-img w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0c] via-[#0a0f0c]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0c]/70 to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <Link
          href="/projects"
          className="proj-detail-anim inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 cursor-pointer transition-colors group mt-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All Projects
        </Link>

        <div className="max-w-4xl">
          {project.category && (
            <div className="proj-detail-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-6">
              <span>{project.category}</span>
            </div>
          )}

          <h1 className="proj-detail-title font-heading text-5xl sm:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-8">
            {project.title}
          </h1>

          <p className="proj-detail-anim text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-10">
            {project.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-8 border-t border-white/20">
            {[
              { icon: MapPin, label: "Location", value: project.location || "Dubai, UAE" },
              { icon: Calendar, label: "Year", value: project.year || "2024" },
              { icon: Ruler, label: "Area", value: project.area || "2500m²" },
              { icon: Users, label: "Client", value: project.client || "Private" },
            ].map((meta, i) => {
              const Icon = meta.icon
              return (
                <div key={i} className="proj-meta-item">
                  <Icon className="w-5 h-5 text-emerald-400 mb-3" />
                  <div className="text-[10px] uppercase tracking-wider text-white/60 mb-1">{meta.label}</div>
                  <div className="text-sm sm:text-base font-semibold text-white truncate">{meta.value}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}