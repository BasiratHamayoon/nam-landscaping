"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import { settingsData } from "@/store/data/settingsData"
import Button from "@/components/ui/Button"
import MagneticButton from "@/components/animations/MagneticButton"
import Badge from "@/components/ui/Badge"
import {
  ArrowRight,
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const heroSlides = [
  {
    image: "/images/1.jpg",
    subtitle: "Premium Landscaping Services",
    title: "Transform Your\nOutdoor Paradise",
    description:
      "We create breathtaking landscapes that blend natural beauty with innovative design, turning your outdoor dreams into reality.",
  },
  {
    image: "/images/2.jpg",
    subtitle: "Expert Garden Design",
    title: "Where Nature\nMeets Luxury",
    description:
      "From lush gardens to stunning pools, we craft outdoor spaces that inspire awe and provide lasting enjoyment.",
  },
]

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [mounted, setMounted] = useState(false)
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const settings = useSelector((state) => state.settings || settingsData)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const animate = async () => {
      const { gsap } = await import("gsap")

      if (!contentRef.current) return

      const tl = gsap.timeline({ delay: 3.6 })

      tl.fromTo(
        ".hero-badge",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      )

      tl.fromTo(
        ".hero-title-line",
        { y: 100, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=0.4"
      )

      tl.fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      )

      tl.fromTo(
        ".hero-buttons > *",
        { y: 30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
        "-=0.4"
      )

      tl.fromTo(
        ".hero-stats > *",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.3"
      )

      tl.fromTo(
        ".hero-nav-controls",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.2"
      )
    }

    animate()
  }, [mounted])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [mounted])

  const currentSlide = heroSlides[activeSlide] || heroSlides[0]
  const slideNum = String((activeSlide || 0) + 1).padStart(2, "0")
  const totalNum = String(heroSlides.length).padStart(2, "0")
  const projectsCount = settings?.stats?.projectsCompleted || 500
  const clientsCount = settings?.stats?.happyClients || 350
  const yearsCount = settings?.stats?.yearsExperience || 15

  return (
    <section ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: activeSlide === index ? 1 : 0 }}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div ref={contentRef} className="relative h-full container-custom flex items-center">
        <div className="max-w-3xl">
          <div className="hero-badge opacity-0">
            <Badge className="mb-6 bg-white/10 text-white border-white/20 py-2 px-4 text-sm backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-primary-400" />
              {currentSlide.subtitle}
            </Badge>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-[1.1] mb-6">
            {currentSlide.title.split("\n").map((line, i) => (
              <span key={i} className="hero-title-line block opacity-0">
                {i === 1 ? (
                  <span className="bg-gradient-to-r from-primary-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="hero-description text-lg md:text-xl text-white/70 max-w-xl font-body leading-relaxed mb-8 opacity-0">
            {currentSlide.description}
          </p>

          <div className="hero-buttons flex flex-wrap gap-4 mb-12">
            <MagneticButton>
              <Button variant="gradient" size="xl" className="group">
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button
                variant="ghost"
                size="xl"
                className="text-white border border-white/20 hover:bg-white/10 group"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-2 group-hover:bg-primary-600/30 transition-colors">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                Watch Our Work
              </Button>
            </MagneticButton>
          </div>

          <div className="hero-stats flex flex-wrap items-center gap-8 border-t border-white/10 pt-8">
            <div className="opacity-0">
              <div className="text-2xl md:text-3xl font-bold text-white font-heading">
                {projectsCount}+
              </div>
              <div className="text-sm text-white/50 font-body">Projects</div>
            </div>
            <div className="opacity-0">
              <div className="text-2xl md:text-3xl font-bold text-white font-heading">
                {clientsCount}+
              </div>
              <div className="text-sm text-white/50 font-body">Happy Clients</div>
            </div>
            <div className="opacity-0">
              <div className="text-2xl md:text-3xl font-bold text-white font-heading">
                {yearsCount}+
              </div>
              <div className="text-sm text-white/50 font-body">Years</div>
            </div>
          </div>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? "bg-primary-500 scale-125 shadow-lg shadow-primary-500/50"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="hero-nav-controls absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-0">
          <button
            onClick={() =>
              setActiveSlide(
                activeSlide === 0 ? heroSlides.length - 1 : activeSlide - 1
              )
            }
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-white/50 text-sm font-body tracking-wider">
            {slideNum} / {totalNum}
          </div>
          <button
            onClick={() =>
              setActiveSlide((activeSlide + 1) % heroSlides.length)
            }
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}