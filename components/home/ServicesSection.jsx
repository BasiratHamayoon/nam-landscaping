"use client"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { servicesData } from "@/store/data/servicesData"
import SectionHeading from "@/components/shared/SectionHeading"
import ServiceCard from "@/components/shared/ServiceCard"
import Button from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"

export default function ServicesSection() {
  const services = useSelector((state) => state.services?.items || servicesData)
  const sectionRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current || !cardsRef.current) return

      const cards = cardsRef.current.querySelectorAll(".stagger-item")

      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, rotateY: -5 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    loadGSAP()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" />

      <div className="container-custom relative">
        <SectionHeading
          badge="Services"
          title="What We Do Best"
          subtitle="Expert craftsmanship meets creative vision in every project we undertake."
        />

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <div className="text-center mt-14">
          <Button variant="dark" size="lg" className="group">
            All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-500" />
          </Button>
        </div>
      </div>
    </section>
  )
}