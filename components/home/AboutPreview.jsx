"use client"
import { useRef, useEffect } from "react"
import Image from "next/image"
import { useSelector } from "react-redux"
import { settingsData } from "@/store/data/settingsData"
import Button from "@/components/ui/Button"
import Badge from "@/components/ui/Badge"
import CountUp from "@/components/animations/CountUp"
import {
  ArrowRight,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Leaf,
  Shield,
} from "lucide-react"

export default function AboutPreview() {
  const settings = useSelector((state) => state.settings || settingsData)
  const sectionRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      })

      tl.fromTo(".about-image-wrapper", { clipPath: "inset(100% 0 0 0)", opacity: 0 }, { clipPath: "inset(0% 0 0 0)", opacity: 1, duration: 1.5, ease: "power4.inOut" })
      tl.fromTo(".about-badge", { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.8")
      tl.fromTo(".about-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.5")
      tl.fromTo(".about-text", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }, "-=0.4")
      tl.fromTo(".about-feature", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, "-=0.3")
      tl.fromTo(".about-stat", { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" }, "-=0.3")
      tl.fromTo(".about-cta", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.2")
      tl.fromTo(".about-float-card", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" }, "-=0.8")
    }

    loadGSAP()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-card">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative">
            <div className="about-image-wrapper relative h-[550px] md:h-[650px] rounded-3xl overflow-hidden">
              <Image
                src="/images/3.jpg"
                alt="About NAM Landscaping"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="about-float-card absolute -bottom-6 -right-6 md:bottom-8 md:-right-8 bg-card rounded-2xl p-5 shadow-xl border border-border opacity-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-heading">
                    <CountUp end={settings.stats?.yearsExperience || 15} suffix="+" />
                  </div>
                  <div className="text-xs text-muted-foreground font-accent">Years Excellence</div>
                </div>
              </div>
            </div>

            <div className="about-float-card absolute -top-4 -left-4 md:top-8 md:-left-8 bg-card rounded-2xl p-4 shadow-xl border border-border opacity-0">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-accent font-medium">Certified Team</span>
              </div>
            </div>
          </div>

          <div>
            <div className="about-badge opacity-0">
              <Badge className="mb-5">About Us</Badge>
            </div>

            <h2 className="about-title text-3xl md:text-4xl lg:text-5xl font-heading leading-[1.1] mb-7 opacity-0">
              Crafting <em className="text-gradient">Natural Beauty</em> Since 2009
            </h2>

            <p className="about-text text-muted-foreground text-[15px] leading-[1.8] mb-5 font-body opacity-0">
              NAM Landscaping has been at the forefront of landscape design and garden services across the UAE. Our passion for creating stunning outdoor environments drives us to deliver exceptional results.
            </p>

            <p className="about-text text-muted-foreground text-[15px] leading-[1.8] mb-8 font-body opacity-0">
              With a team of experienced horticulturists, designers, and craftsmen, we transform ordinary spaces into extraordinary living environments.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { icon: CheckCircle2, text: "Licensed & Insured" },
                { icon: Leaf, text: "Eco-Friendly Methods" },
                { icon: Award, text: "Award-Winning Design" },
                { icon: Clock, text: "On-Time Delivery" },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="about-feature flex items-center gap-2.5 opacity-0">
                    <div className="w-8 h-8 rounded-full bg-primary-600/8 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-[13px] font-accent font-medium">{item.text}</span>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-3 gap-5 p-6 rounded-2xl bg-muted/50 mb-8">
              {[
                { icon: Users, value: settings.stats?.happyClients || 350, label: "Clients" },
                { icon: Award, value: settings.stats?.projectsCompleted || 500, label: "Projects" },
                { icon: Clock, value: settings.stats?.yearsExperience || 15, label: "Years" },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="about-stat text-center opacity-0">
                    <div className="text-2xl md:text-3xl font-heading text-foreground mb-1">
                      <CountUp end={stat.value} suffix="+" />
                    </div>
                    <div className="text-[11px] text-muted-foreground font-accent tracking-wider uppercase">
                      {stat.label}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="about-cta opacity-0">
              <Button variant="dark" size="lg" className="group">
                Our Story
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}