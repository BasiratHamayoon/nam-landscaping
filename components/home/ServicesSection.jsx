"use client"
import { useSelector } from "react-redux"
import SectionHeading from "@/components/shared/SectionHeading"
import ServiceCard from "@/components/shared/ServiceCard"
import { useStaggerAnimation } from "@/hooks/useScrollAnimation"
import Button from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import FadeIn from "@/components/animations/FadeIn"
import { servicesData } from "@/store/data/servicesData"

export default function ServicesSection() {
  const services = useSelector((state) => state.services?.items || servicesData)
  const containerRef = useStaggerAnimation({
    selector: ".stagger-item",
    stagger: 0.12,
    ease: "back.out(1.7)",
  })

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative">
        <SectionHeading
          badge="What We Offer"
          title="Our Premium Services"
          subtitle="From stunning garden designs to complete outdoor transformations, we offer a full range of landscaping services tailored to your vision."
        />

        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        <FadeIn className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            View All Services
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}