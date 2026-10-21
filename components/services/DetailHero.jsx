// components/services/DetailHero.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock, Shield, MessageCircle, Star, Leaf, Droplets, Trees, Flower2, Sun, Shovel } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const iconMap = { leaf: Leaf, droplets: Droplets, trees: Trees, flower: Flower2, sun: Sun, shovel: Shovel }

export default function DetailHero({ service }) {
  const heroRef = useRef(null)
  const Icon = iconMap[service.icon?.toLowerCase()] || Leaf

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const splitChars = (el) => {
        if (!el) return []
        const text = el.textContent
        el.innerHTML = text
          .split(" ")
          .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block word">${w}</span></span>`)
          .join(" ")
        return el.querySelectorAll(".word")
      }

      const title = heroRef.current?.querySelector(".detail-title")
      if (title) {
        const words = splitChars(title)
        gsap.from(words, { yPercent: 120, duration: 1, stagger: 0.08, ease: "power4.out", delay: 0.1 })
      }

      gsap.from(".detail-anim", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", delay: 0.4 })
      gsap.fromTo(".detail-hero-image", { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" })
      gsap.to(".detail-hero-image", { yPercent: 15, ease: "none", scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true } })
    }, heroRef)
    return () => ctx.revert()
  }, [service])

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-end pt-36 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f0c]">
        <img src={`${service.image}?w=1920&q=85`} alt={service.title} className="detail-hero-image w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0c] via-[#0a0f0c]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f0c]/80 to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <Link href="/services" className="detail-anim inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium mb-8 cursor-pointer transition-colors group mt-10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          All Services
        </Link>

        <div className="max-w-3xl">
          <div className="detail-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-6">
            <Icon className="w-3.5 h-3.5" />
            <span>{service.category || "Landscaping"}</span>
          </div>

          <h1 className="detail-title font-heading text-5xl sm:text-7xl lg:text-8xl text-white leading-[0.95] tracking-tight mb-6">{service.title}</h1>

          <p className="detail-anim text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-8">{service.description}</p>

          <div className="detail-anim flex flex-wrap items-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-white/90">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm">4.9 · 150+ Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Clock className="w-4 h-4" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-white/90 text-sm">
              <Shield className="w-4 h-4" />
              <span>Warranty Included</span>
            </div>
          </div>

          <div className="detail-anim flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-600/40">
              Get Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://wa.me/971500000000" className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105">
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}