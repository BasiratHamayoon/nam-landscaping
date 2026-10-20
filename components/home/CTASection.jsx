"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { ArrowRight, MessageSquare, Leaf, Phone, Mail } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      })

      tl.fromTo(
        ".cta-panel",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      )
        .fromTo(
          ".cta-item",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power3.out" },
          "-=0.45"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 relative overflow-hidden bg-background"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary-500/8 dark:bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="cta-panel relative rounded-3xl border border-border bg-card dark:bg-card overflow-hidden shadow-xl shadow-black/5 dark:shadow-black/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 via-primary-400 to-emerald-400" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 p-8 sm:p-12 lg:p-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="cta-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/20 text-primary-700 dark:text-primary-400 text-[11px] font-semibold uppercase tracking-[0.18em] mb-6">
                <Leaf className="w-3.5 h-3.5" />
                Free Consultation
              </div>

              <h2 className="cta-item font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] leading-[1.12] text-foreground tracking-tight mb-5">
                Ready to Transform
                <br />
                <span className="text-primary-600 dark:text-primary-400">
                  Your Outdoor Space?
                </span>
              </h2>

              <p className="cta-item font-body text-muted-foreground text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
                Contact us today for a free consultation. Let&apos;s bring your
                outdoor vision to life with expert design and craftsmanship.
              </p>

              <div className="cta-item flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="rounded-full px-8 w-full sm:w-auto shadow-lg shadow-primary-600/20"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <a
                  href="https://wa.me/971501234567?text=Hello%21%20I%20would%20like%20to%20inquire%20about%20landscaping%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 w-full sm:w-auto border-border text-foreground hover:bg-muted"
                  >
                    <MessageSquare className="w-4 h-4 mr-2 text-primary-600" />
                    WhatsApp Us
                  </Button>
                </a>
              </div>
            </div>

            <div className="cta-item lg:col-span-5">
              <div className="rounded-2xl border border-border bg-muted/40 dark:bg-white/5 p-6 sm:p-8 space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-600 dark:text-primary-400 mb-1">
                  Get in touch
                </p>

                <a
                  href="tel:+971501234567"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card dark:bg-white/5 border border-border hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-0.5">
                      Call us
                    </p>
                    <p className="font-medium text-foreground text-sm sm:text-base truncate">
                      +971 50 123 4567
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@namlandscaping.ae"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card dark:bg-white/5 border border-border hover:border-primary-300 dark:hover:border-primary-500/40 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-full bg-primary-50 dark:bg-primary-950/60 border border-primary-100 dark:border-primary-500/20 flex items-center justify-center text-primary-600 dark:text-primary-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-0.5">
                      Email us
                    </p>
                    <p className="font-medium text-foreground text-sm sm:text-base truncate">
                      info@namlandscaping.ae
                    </p>
                  </div>
                </a>

                <div className="pt-2 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-primary-500" />
                    Free on-site visit
                  </span>
                  <span>Reply within 2 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection