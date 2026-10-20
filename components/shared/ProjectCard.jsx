"use client"
import Image from "next/image"
import Badge from "../ui/Badge"
import { MapPin, Calendar, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProjectCard({ project, variant = "default" }) {
  if (variant === "featured") {
    return (
      <div className="stagger-item group relative overflow-hidden rounded-3xl cursor-pointer hover-lift">
        <div className="relative h-[400px] md:h-[500px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <Badge className="mb-3 bg-white/20 text-white border-white/30">
            {project.category}
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold text-white font-heading mb-2">
            {project.title}
          </h3>
          <p className="text-white/70 text-sm line-clamp-2 mb-4 font-body max-w-lg">
            {project.description}
          </p>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {project.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {project.year}
            </span>
          </div>
        </div>

        <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
      </div>
    )
  }

  return (
    <div className="stagger-item group relative overflow-hidden rounded-2xl bg-card border border-border cursor-pointer hover-lift">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
          {project.category}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold font-heading mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-3 text-muted-foreground text-xs font-body">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {project.year}
          </span>
        </div>
      </div>
    </div>
  )
}