"use client"
import Image from "next/image"
import Button from "@/components/ui/Button"
import { ArrowUpRight } from "lucide-react"
import * as Icons from "lucide-react"

export default function ServiceCard({ service, index }) {
  const IconComponent = Icons[service.icon] || Icons.Trees

  return (
    <div className="stagger-item group relative overflow-hidden rounded-2xl bg-card border border-border hover-lift hover-glow cursor-pointer">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div
          className="absolute top-4 left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white backdrop-blur-md"
          style={{ backgroundColor: `${service.color}CC` }}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 font-body">
          {service.shortDescription}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {service.features.slice(0, 3).map((feature, i) => (
            <span
              key={i}
              className="text-xs px-2 py-1 rounded-full bg-primary-600/5 text-primary-700 dark:text-primary-400 font-body"
            >
              {feature}
            </span>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full group-hover:bg-primary-600 group-hover:text-white">
          Learn More
        </Button>
      </div>
    </div>
  )
}