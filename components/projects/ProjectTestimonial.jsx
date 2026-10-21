// components/projects/ProjectTestimonial.jsx
"use client"

import { useEffect, useRef } from "react"
import { Quote, Star } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProjectTestimonial({ project }) {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".test-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const testimonial = project.testimonial || {
    quote:
      "NAM Landscaping exceeded every expectation. Their attention to detail and creative vision transformed our outdoor space into a true sanctuary.",
    author: "Ahmed Al Mansoori",
    role: "Villa Owner",
    rating: 5,
  }

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 bg-card/40 border-y border-border">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="test-card relative p-10 sm:p-14 rounded-3xl bg-card border border-border text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center shadow-xl shadow-primary-600/30">
            <Quote className="w-7 h-7 text-white" />
          </div>

          <div className="flex items-center justify-center gap-1 mb-6 mt-4">
            {[...Array(testimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <p className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground leading-tight italic mb-8">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <div className="pt-6 border-t border-border">
            <div className="font-heading text-xl text-foreground">{testimonial.author}</div>
            <div className="text-sm text-muted-foreground mt-1">{testimonial.role}</div>
          </div>
        </div>
      </div>
    </section>
  )
}