// components/services/ServicesHero.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Sparkles, Search, Phone } from "lucide-react"
import gsap from "gsap"

export default function ServicesHero({ query, setQuery }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".bg-orb-1", { x: "10vw", y: "5vh", duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(".bg-orb-2", { x: "-10vw", y: "10vh", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(".bg-orb-3", { x: "5vw", y: "-10vh", duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" })

      const splitChars = (el) => {
        const text = el.textContent
        el.innerHTML = text
          .split("")
          .map((c) => (c === " " ? `<span class="inline-block">&nbsp;</span>` : `<span class="inline-block char">${c}</span>`))
          .join("")
        return el.querySelectorAll(".char")
      }

      const title = heroRef.current?.querySelector(".hero-title")
      if (title) {
        const chars = splitChars(title)
        gsap.from(chars, { yPercent: 120, opacity: 0, duration: 1, stagger: 0.02, ease: "power4.out", delay: 0.1 })
      }

      gsap.from(".hero-anim", { y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.5 })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="relative pt-36 sm:pt-48 pb-20 sm:pb-28 overflow-hidden bg-[#0a0f0c] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb-1 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/20 blur-[120px]" />
        <div className="bg-orb-2 absolute top-[30%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-500/20 blur-[100px]" />
        <div className="bg-orb-3 absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-emerald-400/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.05)_1px,_transparent_0)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col items-center text-center">
          <div className="hero-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Landscaping Services · UAE</span>
          </div>

          <h1 className="hero-title font-heading text-5xl sm:text-7xl lg:text-8xl leading-[0.95] tracking-tight max-w-5xl mb-6 overflow-hidden text-white">
            Craft Outdoor Spaces That Breathe
          </h1>

          <p className="hero-anim max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed mb-10">
            From lush gardens to resort-grade pools, every service is engineered for the UAE climate and sculpted by award-winning designers.
          </p>

          <div className="hero-anim w-full max-w-2xl flex flex-col sm:flex-row gap-3 mb-14">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a service..."
                className="w-full h-14 pl-12 pr-5 rounded-full bg-white border border-transparent text-sm text-black placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-xl shadow-black/20"
              />
            </div>
            <Link
              href="/contact"
              className="h-14 px-7 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-600/30 whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              Free Consultation
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6 sm:gap-14 w-full max-w-3xl border-t border-white/10 pt-10 mt-4">
            {[{ k: "150+", v: "Projects" }, { k: "12+", v: "Years" }, { k: "4.9★", v: "Rating" }].map((s, i) => (
              <div key={i} className="hero-anim text-center">
                <div className="font-heading text-3xl sm:text-5xl text-white mb-1">{s.k}</div>
                <div className="text-[11px] sm:text-xs text-emerald-400 uppercase tracking-widest">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}