"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function ContactHero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-element",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        }
      )
      gsap.to(".bg-orb", {
        y: "random(-30, 30)",
        x: "random(-30, 30)",
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[50vh] flex items-center justify-center bg-[#0a0f0c] overflow-hidden pt-32 pb-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-orb absolute top-1/3 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[100px]" />
        <div className="bg-orb absolute bottom-1/3 right-1/4 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 text-center">
        <span className="hero-element inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-primary-400 text-xs font-semibold tracking-[0.2em] uppercase mb-6">
          Get in Touch
        </span>
        <h1 className="hero-element text-5xl md:text-7xl font-heading text-white mb-6 leading-[1.1]">
          Let's Start Your <br />
          <span className="text-primary-500 italic">Transformation</span>
        </h1>
        <p className="hero-element text-lg text-white/70 font-sans">
          Reach out to our team of landscaping experts to discuss your vision, request a quote, or schedule a consultation.
        </p>
      </div>
    </section>
  )
}