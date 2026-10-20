"use client"

import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { nextTestimonial, prevTestimonial, setTestimonial } from "@/store/slices/testimonialsSlice"
import { testimonialsData } from "@/store/data/testimonialsData"
import { ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "../shared/SectionHeading"
import TestimonialCard from "../shared/TestimonialCard"

export function TestimonialsSection() {
  const dispatch = useDispatch()
  const rawItems = useSelector((state) => state.testimonials?.items)
  const items = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : testimonialsData
  
  const rawIndex = useSelector((state) => state.testimonials?.activeIndex)
  const activeIndex = typeof rawIndex === "number" && !isNaN(rawIndex) ? rawIndex : 0
  const safeIndex = ((activeIndex % items.length) + items.length) % items.length

  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)

  // Auto slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(nextTestimonial())
    }, 6000)
    return () => clearInterval(interval)
  }, [dispatch])

  // Initial Section Animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Smooth slide change animation
  useEffect(() => {
    if (!cardsContainerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsContainerRef.current.querySelectorAll(".testimonial-animate"),
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", overwrite: "auto" }
      )
    }, cardsContainerRef)

    return () => ctx.revert()
  }, [safeIndex])

  // Get 3 items to show around active index
  const getVisibleTestimonials = () => {
    const count = items.length
    if (count <= 3) return items.map((item, idx) => ({ ...item, isCenter: idx === safeIndex }))
    
    const prevIdx = (safeIndex - 1 + count) % count
    const nextIdx = (safeIndex + 1) % count
    
    return [
      { ...items[prevIdx], isCenter: false, key: `prev-${items[prevIdx].id}` },
      { ...items[safeIndex], isCenter: true, key: `center-${items[safeIndex].id}` },
      { ...items[nextIdx], isCenter: false, key: `next-${items[nextIdx].id}` },
    ]
  }

  const visibleTestimonials = getVisibleTestimonials()

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="py-28 lg:py-36 bg-[#08100c] text-white relative overflow-hidden"
    >
      {/* Ambient Lighting & Glow Meshes */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary-400 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            <span>4.9/5 Average Rating (150+ Reviews)</span>
          </div>

          <SectionHeading
            badge="Client Testimonials"
            title="Stories of Satisfaction"
            subtitle="Discover how we've transformed ordinary landscapes into extraordinary living sanctuaries for homeowners and developers across the UAE."
            size="large"
            alignment="center"
            light
          />
        </div>

        {/* Testimonial Cards Carousel Container */}
        <div ref={cardsContainerRef} className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {visibleTestimonials.map((testimonial, idx) => (
              <div
                key={testimonial.key || testimonial.id || idx}
                className={`testimonial-animate transition-all duration-500 ${
                  testimonial.isCenter
                    ? "md:scale-105 z-20 opacity-100"
                    : "opacity-80 md:opacity-60 hover:opacity-100 scale-95"
                }`}
              >
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={testimonial.isCenter}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-8 border-t border-white/10">
            
            {/* Rating Stars Summary */}
            <div className="flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-white/70">
                Trusted by 500+ UAE Families & Businesses
              </span>
            </div>

            {/* Slider Buttons & Progress */}
            <div className="flex items-center gap-6">
              
              {/* Dots Progress */}
              <div className="flex gap-2 items-center">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => dispatch(setTestimonial(i))}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      i === safeIndex
                        ? "bg-primary-500 w-8"
                        : "bg-white/20 hover:bg-white/40 w-2"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Pill Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => dispatch(prevTestimonial())}
                  className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 flex items-center justify-center text-white transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => dispatch(nextTestimonial())}
                  className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-white/30 flex items-center justify-center text-white transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection