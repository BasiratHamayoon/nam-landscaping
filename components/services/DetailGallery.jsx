// components/services/DetailGallery.jsx
"use client"

import { useEffect, useRef } from "react"
import { Sparkles } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function DetailGallery({ gallery, fallbackImage, title }) {
  const galleryRef = useRef(null)
  const images = gallery || [fallbackImage, "https://images.unsplash.com/photo-1558618666-fcd25c85cd64", "https://images.unsplash.com/photo-1416879595882-3373a0480b5b", "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(".gallery-item", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: galleryRef.current, start: "top 80%", once: true } })
    }, galleryRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={galleryRef} className="relative py-20 sm:py-28 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Work</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
            Project <span className="italic text-primary-600 dark:text-primary-400">gallery</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {images.slice(0, 4).map((img, i) => (
            <div key={i} className={`gallery-item relative aspect-square rounded-3xl overflow-hidden border border-border group cursor-pointer ${i === 0 ? "lg:col-span-2 lg:row-span-2 lg:aspect-auto" : ""}`}>
              <img src={`${img}?w=800&q=75`} alt={`${title} Work ${i + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}