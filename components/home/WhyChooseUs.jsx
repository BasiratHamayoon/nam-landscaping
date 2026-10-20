"use client"
import SectionHeading from "../shared/SectionHeading"
import FadeIn from "../animations/FadeIn"
import { useStaggerAnimation } from "@/hooks/useScrollAnimation"
import {
  Shield,
  Award,
  Clock,
  Leaf,
  HeartHandshake,
  Sparkles,
  Palette,
  Wrench,
} from "lucide-react"

const reasons = [
  {
    icon: Award,
    title: "Expert Team",
    description:
      "Skilled horticulturists and designers with years of professional experience in landscape design.",
    color: "from-primary-500 to-emerald-500",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description:
      "Unique, custom designs tailored to your preferences, lifestyle, and the natural environment.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description:
      "Fully licensed and insured for your peace of mind. We meet all regulatory requirements.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    description:
      "We respect your time and deliver projects on schedule without compromising on quality.",
    color: "from-orange-500 to-yellow-500",
  },
  {
    icon: HeartHandshake,
    title: "Client Focused",
    description:
      "Your satisfaction is our priority. We work closely with you throughout every project phase.",
    color: "from-red-500 to-rose-500",
  },
  {
    icon: Wrench,
    title: "Full Service",
    description:
      "From design to maintenance, we provide comprehensive landscaping solutions under one roof.",
    color: "from-teal-500 to-green-500",
  },
]

export default function WhyChooseUs() {
  const containerRef = useStaggerAnimation({
    selector: ".stagger-item",
    stagger: 0.1,
    ease: "back.out(1.7)",
  })

  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4" />

      <div className="container-custom relative">
        <SectionHeading
          badge="Why Choose Us"
          title="The NAM Difference"
          subtitle="We don't just create landscapes — we craft experiences. Here's what sets us apart from the rest."
        />

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                className="stagger-item group p-8 rounded-2xl bg-card border border-border hover-lift hover-glow transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
                  }}
                />

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-5 text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors">
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