"use client"
import Image from "next/image"
import Button from "@/components/ui/Button"
import { ArrowUpRight, MoveRight } from "lucide-react"
import * as Icons from "lucide-react"

export default function ServiceCard({ service, index }) {
  const IconComponent = Icons[service.icon] || Icons.Trees

  return (
    <div className="stagger-item group relative cursor-pointer">
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border hover-lift transition-all duration-700">
        <div className="relative h-72 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md border border-white/20"
                style={{ backgroundColor: `${service.color}99` }}
              >
                <IconComponent className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-heading text-white">
                {service.title}
              </h3>
            </div>
          </div>

          <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        <div className="p-6">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-5 font-body leading-relaxed">
            {service.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {service.features.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="text-[11px] px-3 py-1 rounded-full bg-muted text-muted-foreground font-accent tracking-wide"
              >
                {feature}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-primary-600 text-sm font-accent font-medium group-hover:gap-4 transition-all duration-500">
            <span>Explore Service</span>
            <MoveRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}