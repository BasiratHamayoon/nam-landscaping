"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowUpRight, MapPin } from "lucide-react"

export function ProjectCard({ project, variant = "default", className }) {
  if (!project) return null

  const isFeatured = variant === "featured"
  const image =
    project.image ||
    project.cover ||
    project.thumbnail ||
    "/images/10.jpg"

  return (
    <Link
      href={`/projects/${project.slug || project.id}`}
      className={cn(
        "group relative block w-full h-full overflow-hidden bg-muted",
        className
      )}
    >
      <img
        src={image}
        alt={project.title || "Project"}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
          isFeatured && "object-center"
        )}
        onError={(e) => {
          e.currentTarget.src =
            "https://images.unsplash.com/photo-1558904541-efa8c196b27d?auto=format&fit=crop&w=1200&q=80"
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-8 flex items-end justify-between gap-4">
        <div className="min-w-0">
          {project.category && (
            <span className="inline-block mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">
              {project.category}
            </span>
          )}
          <h3
            className={cn(
              "font-heading text-white leading-tight truncate",
              isFeatured ? "text-2xl sm:text-3xl lg:text-4xl" : "text-base sm:text-lg"
            )}
          >
            {project.title}
          </h3>
          {project.location && (
            <p className="mt-1.5 flex items-center gap-1.5 text-white/70 text-xs sm:text-sm">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{project.location}</span>
            </p>
          )}
        </div>

        <div className="shrink-0 w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard