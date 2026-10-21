"use client"

import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { testimonialsData } from "@/store/data/testimonialsData"
import {
  Star,
  Sparkles,
  Quote,
  MapPin,
  CheckCircle,
} from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "../shared/SectionHeading"

function StackCard({ testimonial, index, total }) {
  const [avatarError, setAvatarError] = useState(false)

  if (!testimonial) return null

  const {
    name = "Valued Client",
    role = "Homeowner",
    location = "Dubai, UAE",
    content = "NAM Landscaping transformed our outdoor space beyond expectations. Outstanding craftsmanship and attention to detail.",
    rating = 5,
    avatar = "/images/16.jpg",
    projectType = "Villa Landscaping",
  } = testimonial

  return (
    <article
      className="testimonial-stack-card absolute inset-0 w-full h-full rounded-2xl sm:rounded-3xl border border-border bg-card text-card-foreground shadow-2xl shadow-black/10 dark:shadow-black/50 overflow-hidden flex flex-col"
      style={{ zIndex: total - index }}
    >
      <div className="absolute top-0 right-0 w-28 h-28 sm:w-36 sm:h-36 bg-primary-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full min-h-0 p-4 sm:p-5 lg:p-7">
        <div className="flex items-center justify-between gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-0.5 text-amber-400">
            {[...Array(Math.min(5, Number(rating) || 5))].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[11px] font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/80 border border-primary-200 dark:border-primary-500/30 px-2 sm:px-2.5 py-0.5 rounded-full whitespace-nowrap max-w-[55%] truncate">
            <CheckCircle className="w-3 h-3 shrink-0" />
            <span className="truncate">{projectType}</span>
          </span>
        </div>

        <Quote className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-primary-500/30 shrink-0 mt-2 sm:mt-3 mb-1.5 sm:mb-2" />

        <div className="flex-1 min-h-0 mb-3 sm:mb-4 overflow-hidden">
          <p className="font-heading text-sm sm:text-base lg:text-lg text-foreground leading-snug sm:leading-relaxed tracking-tight line-clamp-4 sm:line-clamp-5">
            &ldquo;{content}&rdquo;
          </p>
        </div>

        <div className="shrink-0 pt-2.5 sm:pt-3 border-t border-border mb-1 sm:mb-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full overflow-hidden border-2 border-primary-500/30 shrink-0 bg-primary-100 dark:bg-primary-950">
              {!avatarError ? (
                <img
                  src={avatar}
                  alt={name}
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary-700 dark:text-white font-heading text-sm sm:text-base bg-primary-100 dark:bg-primary-800">
                  {String(name).charAt(0)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-heading text-xs sm:text-sm lg:text-base text-foreground font-semibold leading-tight truncate">
                {name}
              </h4>
              <p className="text-[10px] sm:text-[11px] lg:text-xs text-muted-foreground flex items-center gap-1 sm:gap-1.5 mt-0.5 min-w-0">
                <span className="truncate">{role}</span>
                <span className="text-border shrink-0">·</span>
                <span className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 font-medium truncate min-w-0">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{location}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsSection() {
  const rawItems = useSelector((state) => state.testimonials?.items)
  const items =
    Array.isArray(rawItems) && rawItems.length > 0
      ? rawItems
      : testimonialsData

  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    if (!items.length) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".testimonial-stack-card")
      if (!cards.length) return

      gsap.from(".ts-intro", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      })

      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 12 + i * 3,
          scale: i === 0 ? 1 : 1 - i * 0.04,
          rotateX: i === 0 ? 0 : 6,
          opacity: i === 0 ? 1 : 0.4,
          filter: i === 0 ? "blur(0px)" : "blur(2px)",
          transformOrigin: "50% 100%",
          zIndex: cards.length - i,
        })
      })

      const holdDuration = 0.8
      const foldDuration = 1.0
      let currentTime = 0

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: () => `+=${Math.max(items.length, 1) * Math.min(window.innerHeight * 0.75, 900)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${(self.progress * 100).toFixed(2)}%`
            }
          },
        },
      })

      for (let i = 0; i < cards.length - 1; i++) {
        const current = cards[i]
        const next = cards[i + 1]

        currentTime += holdDuration

        tl.to(
          current,
          {
            yPercent: -28,
            scale: 0.9,
            rotateX: -14,
            opacity: 0,
            filter: "blur(8px)",
            duration: foldDuration,
            ease: "power2.inOut",
          },
          currentTime
        )

        tl.to(
          next,
          {
            yPercent: 0,
            scale: 1,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            zIndex: cards.length + i + 1,
            duration: foldDuration,
            ease: "power2.inOut",
          },
          currentTime
        )

        for (let j = i + 2; j < cards.length; j++) {
          const depth = j - i - 1
          tl.to(
            cards[j],
            {
              yPercent: 12 + depth * 3,
              scale: 1 - depth * 0.04,
              opacity: 0.4,
              duration: foldDuration,
              ease: "power2.inOut",
            },
            currentTime
          )
        }

        currentTime += foldDuration
      }

      currentTime += holdDuration
      tl.to({}, { duration: holdDuration }, currentTime)
    }, sectionRef)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("resize", refresh)
    window.addEventListener("orientationchange", refresh)

    const t = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(t)
      window.removeEventListener("resize", refresh)
      window.removeEventListener("orientationchange", refresh)
      ctx.revert()
    }
  }, [items])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-background text-foreground overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(700px,90vw)] h-[min(450px,50vh)] bg-primary-500/10 dark:bg-primary-600/10 rounded-full blur-[140px]" />
      </div>

      <div
        ref={pinRef}
        className="relative h-dvh max-h-dvh min-h-0 flex flex-col justify-between gap-3 sm:gap-4 lg:gap-6 py-4 sm:py-6 lg:py-8 max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 box-border"
      >
        <div className="ts-intro flex flex-col items-center text-center shrink-0 max-h-[28dvh] sm:max-h-[30dvh] overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1.5 sm:mb-2 backdrop-blur-md">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>4.9/5 · 150+ Client Reviews</span>
          </div>

          <div className="scale-[0.92] sm:scale-100 origin-top w-full">
            <SectionHeading
              badge="Client Testimonials"
              title="Stories of Satisfaction"
              subtitle="Scroll to fold through real stories from homeowners and developers across the UAE."
              size="large"
              alignment="center"
            />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl flex-1 min-h-0 flex items-center justify-center py-1 sm:py-2">
          <div
            className="relative w-full max-w-xl mx-auto
              h-[min(340px,42dvh)]
              sm:h-[min(370px,44dvh)]
              md:h-[min(390px,46dvh)]
              lg:h-[min(410px,48dvh)]
              max-h-[calc(100dvh-14rem)]
              min-h-[260px]"
            style={{ perspective: "1400px" }}
          >
            <div
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {items.map((testimonial, index) => (
                <StackCard
                  key={testimonial.id || index}
                  testimonial={testimonial}
                  index={index}
                  total={items.length}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="shrink-0 max-w-xl mx-auto w-full pt-1 sm:pt-2 pb-1">
          <div className="h-[3px] sm:h-[4px] w-full bg-border rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-primary-600 via-primary-400 to-emerald-400 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection