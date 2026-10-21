// components/projects/ProjectsGrid.jsx
"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowUpRight, MapPin, Grid3x3, LayoutList } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/shared/SectionHeading"

export default function ProjectsGrid({ projects, categories, activeCategory, setActiveCategory, viewMode, setViewMode }) {
  const gridRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".grid-pill",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: ".grid-filter", start: "top 90%", once: true },
        }
      )

      const cards = gsap.utils.toArray(".project-grid-card")
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            delay: (i % 3) * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%", once: true },
          }
        )
      })
    }, gridRef)
    return () => ctx.revert()
  }, [projects, viewMode])

  return (
    <section id="projects-grid" ref={gridRef} className="relative py-20 sm:py-28 bg-card/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          badge="All Projects"
          title="Our Complete Portfolio"
          subtitle="Browse through our diverse collection of landscaping projects across the UAE."
          size="large"
          alignment="center"
        />

        <div className="grid-filter flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`grid-pill px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all hover:scale-105 ${
                  activeCategory === cat
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30"
                    : "bg-card border border-border text-foreground hover:border-primary-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid-pill flex items-center gap-1 p-1 rounded-full bg-card border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                viewMode === "grid" ? "bg-primary-600 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                viewMode === "list" ? "bg-primary-600 text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-heading text-2xl text-muted-foreground">No projects found in this category.</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, i) => (
              <Link
                key={project.id || i}
                href={`/projects/${project.slug || project.id}`}
                className="project-grid-card group relative rounded-3xl overflow-hidden bg-card border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-600/10 cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={`${project.image}?w=800&q=75`}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
                    <ArrowUpRight className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                  </div>

                  {project.category && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/95 dark:bg-black/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-foreground">
                        {project.category}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl sm:text-3xl text-white leading-tight mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/80 text-xs">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location || "Dubai"}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/40" />
                      <span>{project.year || "2024"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project, i) => (
              <Link
                key={project.id || i}
                href={`/projects/${project.slug || project.id}`}
                className="project-grid-card group relative grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-3xl bg-card border border-border hover:border-primary-500/50 transition-all duration-500 hover:shadow-xl cursor-pointer"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={`${project.image}?w=600&q=75`}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="sm:col-span-2 flex flex-col justify-center">
                  {project.category && (
                    <span className="inline-block w-fit px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 text-primary-600 dark:text-primary-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                      {project.category}
                    </span>
                  )}
                  <h3 className="font-heading text-2xl sm:text-3xl text-foreground leading-tight mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3" />
                        <span>{project.location || "Dubai"}</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                      <span>{project.year || "2024"}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-950/50 border border-primary-200 dark:border-primary-500/30 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}