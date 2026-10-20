"use client"
import { useEffect, useRef } from "react"
import SectionHeading from "@/components/shared/SectionHeading"
import {
  Shield,
  Award,
  Clock,
  Leaf,
  HeartHandshake,
  Palette,
} from "lucide-react"

const reasons = [
  { icon: Award, title: "Expert Team", description: "Skilled horticulturists and designers with years of professional experience.", number: "01" },
  { icon: Palette, title: "Creative Design", description: "Unique, custom designs tailored to your preferences and lifestyle.", number: "02" },
  { icon: Shield, title: "Licensed & Insured", description: "Fully licensed and insured for your complete peace of mind.", number: "03" },
  { icon: Clock, title: "Timely Delivery", description: "We respect your time and deliver projects on schedule.", number: "04" },
  { icon: HeartHandshake, title: "Client Focused", description: "Your satisfaction is our priority throughout every project.", number: "05" },
  { icon: Leaf, title: "Eco-Friendly", description: "Sustainable practices and materials for a greener future.", number: "06" },
]

export default function WhyChooseUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      const items = sectionRef.current.querySelectorAll(".reason-item")
      gsap.fromTo(items,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%", toggleActions: "play none none reverse" },
        }
      )
    }
    loadGSAP()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding bg-card relative overflow-hidden">
      <div className="container-custom">
        <SectionHeading
          badge="Why Us"
          title="The NAM Difference"
          subtitle="We don't just create landscapes. We craft experiences."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="reason-item bg-card p-8 md:p-10 group hover:bg-muted/50 transition-all duration-700 relative opacity-0"
              >
                <div className="absolute top-6 right-6 text-[11px] font-accent text-muted-foreground/30 tracking-wider">
                  {reason.number}
                </div>

                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-6 group-hover:border-primary-600 group-hover:bg-primary-600 transition-all duration-500">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors duration-500" />
                </div>

                <h3 className="text-xl font-heading mb-3 group-hover:text-primary-600 transition-colors duration-500">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  {reason.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}