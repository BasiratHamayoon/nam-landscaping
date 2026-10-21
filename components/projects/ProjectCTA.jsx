// components/projects/ProjectCTA.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Leaf, Phone, MessageCircle } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProjectCTA() {
  const ctaRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pdetail-cta",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 85%", once: true },
        }
      )
    }, ctaRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ctaRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="pdetail-cta relative rounded-3xl overflow-hidden bg-card border border-border p-10 sm:p-16 lg:p-20 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-6">
              <Leaf className="w-3.5 h-3.5" />
              <span>Inspired?</span>
            </div>
            <h2 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-foreground leading-tight tracking-tight mb-6">
              Let&apos;s build <br />
              <span className="bg-gradient-to-r from-primary-600 to-emerald-500 bg-clip-text text-transparent italic">
                yours next
              </span>
            </h2>
            <p className="max-w-xl mx-auto text-muted-foreground mb-10">
              Every great project starts with a conversation. Reach out today and let&apos;s craft your dream space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="h-14 px-8 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary-600/30"
              >
                <Phone className="w-4 h-4" />
                Start a Project
              </Link>
              <a
                href="https://wa.me/971500000000"
                className="h-14 px-8 rounded-full bg-card border border-border hover:border-primary-500 text-foreground font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}