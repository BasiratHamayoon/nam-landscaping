"use client"
import { useRef, useEffect } from "react"
import Button from "../ui/Button"
import MagneticButton from "../animations/MagneticButton"
import { Phone, ArrowRight, MessageCircle } from "lucide-react"

export default function CTASection() {
  const ctaRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!ctaRef.current) return

      const elements = ctaRef.current.querySelectorAll(".cta-animate")
      gsap.fromTo(
        elements,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    loadGSAP()
  }, [])

  return (
    <section
      ref={ctaRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-emerald-600 to-primary-700" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px, 60px 60px",
          }}
        />
      </div>

      <div className="container-custom relative text-center">
        <div className="cta-animate opacity-0">
          <span className="inline-block text-white/60 text-sm font-body tracking-widest uppercase mb-4">
            Ready to Transform Your Space?
          </span>
        </div>
        <h2 className="cta-animate text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading mb-6 opacity-0">
          Let&apos;s Create Your <br />
          <span className="text-lime-300">Dream Garden</span> Together
        </h2>
        <p className="cta-animate text-white/70 text-lg max-w-2xl mx-auto mb-10 font-body opacity-0">
          Contact us today for a free consultation and quote. Our expert team is ready to bring your outdoor vision to life.
        </p>
        <div className="cta-animate flex flex-wrap justify-center gap-4 opacity-0">
          <MagneticButton>
            <Button variant="white" size="xl" className="group">
              <Phone className="w-5 h-5" />
              Get Free Quote
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              size="xl"
              className="bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}