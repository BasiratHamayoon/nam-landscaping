"use client"
import { useSelector, useDispatch } from "react-redux"
import { nextTestimonial, prevTestimonial } from "@/store/slices/testimonialsSlice"
import SectionHeading from "../shared/SectionHeading"
import TestimonialCard from "../shared/TestimonialCard"
import FadeIn from "../animations/FadeIn"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef } from "react"

export default function TestimonialsSection() {
  const dispatch = useDispatch()
  const { items, activeIndex } = useSelector((state) => state.testimonials)
  const sectionRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(nextTestimonial())
    }, 5000)
    return () => clearInterval(interval)
  }, [dispatch])

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 text-8xl">✦</div>
        <div className="absolute bottom-20 left-20 text-6xl">✦</div>
      </div>

      <div className="container-custom relative">
        <SectionHeading
          badge="Testimonials"
          title="What Our Clients Say"
          subtitle="Don't just take our word for it. Here's what our valued clients have to say about their experience with NAM Landscaping."
          light
        />

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.slice(0, 3).map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={index * 0.15}>
                <TestimonialCard
                  testimonial={testimonial}
                  isActive={index === activeIndex % 3}
                />
              </FadeIn>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => dispatch(prevTestimonial())}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-white w-6"
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => dispatch(nextTestimonial())}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all text-white backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}