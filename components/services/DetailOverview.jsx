// components/services/DetailOverview.jsx
"use client"

import { useEffect, useRef } from "react"
import { Sparkles, Award, Users, Calendar, Shield, Leaf, Droplets, Trees, Flower2, Sun, Shovel } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const iconMap = { leaf: Leaf, droplets: Droplets, trees: Trees, flower: Flower2, sun: Sun, shovel: Shovel }

export default function DetailOverview({ service }) {
  const overviewRef = useRef(null)
  const Icon = iconMap[service.icon?.toLowerCase()] || Leaf
  const galleryImages = service.gallery || [service.image]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(".overview-anim", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", scrollTrigger: { trigger: overviewRef.current, start: "top 75%", once: true } })
      gsap.fromTo(".overview-image", { x: 50, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: overviewRef.current, start: "top 75%", once: true } })
    }, overviewRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={overviewRef} className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <div className="overview-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About This Service</span>
            </div>
            <h2 className="overview-anim font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
              Crafted with care, <span className="italic text-primary-600 dark:text-primary-400">built to last</span>
            </h2>
            <p className="overview-anim text-muted-foreground leading-relaxed text-base sm:text-lg">
              {service.longDescription || `Our ${service.title.toLowerCase()} service combines decades of expertise with modern techniques to create outdoor spaces that thrive in the UAE climate. From initial design to final installation, every detail is thoughtfully executed to exceed your expectations.`}
            </p>
            <div className="overview-anim grid grid-cols-2 gap-4 pt-4">
              {[{ icon: Award, label: "Award Winning" }, { icon: Users, label: "Expert Team" }, { icon: Calendar, label: "On-Time Delivery" }, { icon: Shield, label: "100% Guaranteed" }].map((item, i) => {
                const ItemIcon = item.icon
                return (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center shrink-0">
                      <ItemIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="overview-image relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-2xl">
            <img src={`${galleryImages[1] || service.image}?w=1000&q=80`} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 dark:bg-black/80 backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-heading text-lg text-foreground">Premium Quality</div>
                  <div className="text-xs text-muted-foreground">Delivered across the UAE</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}