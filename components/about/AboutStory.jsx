"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Leaf, Target, ShieldCheck } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function AboutStory() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-content > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".story-content",
            start: "top 80%",
          },
        }
      )
      gsap.fromTo(
        ".story-image",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".story-image",
            start: "top 80%",
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="story-image relative h-[600px] rounded-3xl overflow-hidden border border-border">
            <img
              src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop"
              alt="Luxury Landscaping Dubai"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shrink-0">
                  <Leaf className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading text-xl">Rooted in Dubai</h4>
                  <p className="text-sm text-white/80 font-sans mt-1">Transforming spaces across the UAE</p>
                </div>
              </div>
            </div>
          </div>

          <div className="story-content flex flex-col justify-center">
            <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold tracking-wider uppercase mb-4 block">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-6">
              A Vision Sown in the Desert, Flourishing Worldwide.
            </h2>
            <p className="text-muted-foreground font-sans text-lg mb-6 leading-relaxed">
              Founded with a passion for integrating nature into modern living, NAM Landscaping began as a boutique design studio. Today, we are the UAE's premier landscaping firm, renowned for our uncompromising quality and visionary designs.
            </p>
            <p className="text-muted-foreground font-sans text-lg mb-10 leading-relaxed">
              We believe that a garden is not just an extension of a property, but a living, breathing sanctuary. Our holistic approach combines architectural precision with ecological harmony.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 mt-1">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Our Mission</h4>
                  <p className="text-muted-foreground font-sans">To design, build, and maintain exceptional landscapes that elevate the human experience and respect the environment.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-foreground mb-1">Our Promise</h4>
                  <p className="text-muted-foreground font-sans">Unwavering dedication to craftsmanship, using only premium materials and sustainable practices in every project.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}