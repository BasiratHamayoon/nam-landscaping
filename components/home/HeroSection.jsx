"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown, Play, Leaf } from "lucide-react"
import gsap from "gsap"
import { Button } from "@/components/ui/Button"

const slides = [
  {
    image: "/images/1.jpg",
    fallback:
      "https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=2000&q=80",
    subtitle: "Premium Landscaping Services",
    title: "We Craft Natural Beauty",
    description:
      "Transforming outdoor spaces into breathtaking living masterpieces with expert design and craftsmanship across the UAE.",
  },
  {
    image: "/images/2.jpg",
    fallback:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2000&q=80",
    subtitle: "Garden Design & Architecture",
    title: "Where Vision Meets Nature",
    description:
      "From concept to completion, our expert team crafts luxurious gardens that thrive in the desert climate.",
  },
]

function HeroImage({ slide, isActive }) {
  const [imgSrc, setImgSrc] = useState(slide.image)

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      <img
        src={imgSrc}
        alt={slide.subtitle}
        onError={() => setImgSrc(slide.fallback)}
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  const slideCount = slides.length
  const safeIndex = typeof current === "number" && !isNaN(current) ? current : 0
  const displayCurrent = String(safeIndex + 1).padStart(2, "0")
  const displayTotal = String(slideCount).padStart(2, "0")

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current?.querySelectorAll(".hero-line") || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [safeIndex])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount)
    }, 6000)
    return () => clearInterval(interval)
  }, [slideCount])

  const slide = slides[safeIndex] || slides[0]

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0a0f0c] text-white"
    >
      {slides.map((s, i) => (
        <HeroImage key={i} slide={s} isActive={i === safeIndex} />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0c] via-transparent to-black/40 z-10" />

      <div className="relative z-20 flex flex-col justify-center h-full px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto pt-28 lg:pt-36 pb-24">
        <div ref={textRef} className="max-w-3xl">
          <div className="hero-line overflow-hidden">
            <span className="inline-flex items-center gap-2 text-primary-400 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase mb-6 bg-primary-950/60 border border-primary-500/30 px-4 py-1.5 rounded-full backdrop-blur-md">
              <Leaf className="w-4 h-4" />
              {slide.subtitle}
            </span>
          </div>

          <h1 className="hero-line overflow-hidden">
            <span className="block font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.08] tracking-tight drop-shadow-lg">
              {slide.title}
            </span>
          </h1>

          <div className="hero-line overflow-hidden mt-6">
            <p className="text-white/80 text-base md:text-lg max-w-xl leading-relaxed font-body">
              {slide.description}
            </p>
          </div>

          <div className="hero-line overflow-hidden mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8 text-base shadow-xl">
                Get Free Quote
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 text-base"
              >
                <Play className="w-4 h-4 mr-2" />
                View Projects
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 sm:left-10 lg:left-16 flex items-center gap-6 z-20">
          <div className="flex items-baseline gap-1 text-white">
            <span className="font-heading text-3xl font-bold">{displayCurrent}</span>
            <span className="text-white/40 text-sm mx-1">/</span>
            <span className="text-white/40 text-sm">{displayTotal}</span>
          </div>
          <div className="w-24 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-primary-500 transition-all duration-500"
              style={{ width: `${((safeIndex + 1) / slideCount) * 100}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % slideCount)}
          className="absolute bottom-10 right-6 sm:right-10 lg:right-16 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all cursor-pointer z-20 backdrop-blur-md"
          aria-label="Next slide"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}

export default HeroSection