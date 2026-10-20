"use client"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import Button from "../ui/Button"
import Badge from "../ui/Badge"
import CountUp from "../animations/CountUp"
import FadeIn from "../animations/FadeIn"
import {
  ArrowRight,
  Award,
  Users,
  Clock,
  Shield,
  Leaf,
  CheckCircle2,
} from "lucide-react"

export default function AboutPreview() {
  const settings = useSelector((state) => state.settings)
  const imageRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!imageRef.current) return

      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.5,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    loadGSAP()
  }, [])

  return (
    <section className="section-padding bg-muted/50 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left" className="relative">
            <div ref={imageRef} className="relative">
              <div className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden">
                <Image
                  src="/images/3.jpg"
                  alt="About NAM Landscaping"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 glass-card rounded-2xl p-6 max-w-[200px]">
                <div className="text-4xl font-bold text-primary font-heading">
                  <CountUp end={settings.stats.yearsExperience} suffix="+" />
                </div>
                <p className="text-sm text-muted-foreground font-body mt-1">
                  Years of Excellence
                </p>
              </div>

              <div className="absolute -top-4 -left-4 md:top-8 md:-left-8 glass-card rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold font-heading">Certified</div>
                    <div className="text-xs text-muted-foreground font-body">Expert Team</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -z-10 top-10 left-10 w-full h-full rounded-3xl border-2 border-primary/10" />
          </FadeIn>

          <FadeIn direction="right">
            <Badge className="mb-4">About Us</Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight mb-6">
              Crafting <span className="text-gradient">Natural Beauty</span> Since 2009
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6 font-body">
              NAM Landscaping has been at the forefront of landscape design and garden services across the UAE. Our passion for creating stunning outdoor environments drives us to deliver exceptional results that exceed expectations.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 font-body">
              With a team of experienced horticulturists, designers, and craftsmen, we transform ordinary spaces into extraordinary living environments that harmonize with nature.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: CheckCircle2, text: "Licensed & Insured" },
                { icon: CheckCircle2, text: "Expert Design Team" },
                { icon: CheckCircle2, text: "Quality Materials" },
                { icon: CheckCircle2, text: "Timely Delivery" },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium font-body">{item.text}</span>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl bg-card border border-border mb-8">
              {[
                {
                  icon: Users,
                  value: settings.stats.happyClients,
                  label: "Happy Clients",
                },
                {
                  icon: Award,
                  value: settings.stats.projectsCompleted,
                  label: "Projects Done",
                },
                {
                  icon: Clock,
                  value: settings.stats.yearsExperience,
                  label: "Years Exp.",
                },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="text-center">
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold font-heading text-foreground">
                      <CountUp end={stat.value} suffix="+" />
                    </div>
                    <div className="text-xs text-muted-foreground font-body">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>

            <Button variant="gradient" size="lg" className="group">
              Discover Our Story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}