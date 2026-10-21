"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Leaf, Award, Users, Lightbulb } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description: "We prioritize native plants, water-efficient irrigation, and sustainable materials to ensure our gardens thrive in harmony with the environment.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "From the first sketch to the final stone laid, every detail is executed with precision and an unwavering commitment to excellence.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    description: "Your vision is our blueprint. We collaborate closely with you throughout the entire process to ensure the final result exceeds your expectations.",
  },
  {
    icon: Lightbulb,
    title: "Innovative Design",
    description: "We constantly push the boundaries of landscape architecture, blending modern aesthetics with timeless natural beauty.",
  },
]

export function AboutValues() {
  const valuesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
          },
        }
      )
    }, valuesRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={valuesRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
            Core Principles
          </span>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
            The Values We Grow By
          </h2>
          <p className="text-muted-foreground font-sans text-lg">
            Our success is rooted in a steadfast dedication to these four pillars, ensuring every project is a masterpiece of design and durability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {values.map((value, idx) => {
            const Icon = value.icon
            return (
              <div
                key={idx}
                className="value-card bg-card border border-border rounded-3xl p-8 hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground font-sans leading-relaxed">
                  {value.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}