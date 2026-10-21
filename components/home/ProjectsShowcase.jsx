"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import { filterByCategory } from "@/store/slices/projectsSlice"
import { projectCategories, projectsData } from "@/store/data/projectsData"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "../shared/SectionHeading"
import ProjectCard from "../shared/ProjectCard"

export function ProjectsShowcase() {
  const dispatch = useDispatch()
  const rawFiltered = useSelector((state) => state.projects?.filteredItems)
  const filteredItems =
    Array.isArray(rawFiltered) && rawFiltered.length > 0
      ? rawFiltered
      : projectsData

  const activeCategory = useSelector(
    (state) => state.projects?.activeCategory || "All"
  )

  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const featured = filteredItems.filter((p) => p.featured)
  const pool = featured.length >= 5 ? featured : filteredItems
  const displayProjects = pool.slice(0, 5)

  // Arrival GSAP Timeline on Scroll
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      })

      // 1. Header 3D Tilt Reveal
      tl.fromTo(
        ".ps-header",
        { y: 60, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          ease: "power3.out",
        }
      )

      // 2. Filter Pills Elastic Stagger
      tl.fromTo(
        ".ps-pill",
        { y: 30, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      )

      // 3. Featured Large Portrait Card Sweep In from Left
      tl.fromTo(
        ".featured-card-wrapper",
        { x: -80, y: 40, opacity: 0, scale: 0.9, rotateY: 8 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1.1,
          ease: "power4.out",
        },
        "-=0.4"
      )

      // 4. 4 Small Cards Stagger In from Right
      tl.fromTo(
        ".small-card-wrapper",
        { x: 60, y: 40, opacity: 0, scale: 0.88, rotateY: -8 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        },
        "-=0.9"
      )

      // 5. Cinematic Image Camera Scale Down Zoom
      tl.fromTo(
        ".project-img",
        { scale: 1.35, filter: "brightness(0.6)" },
        {
          scale: 1,
          filter: "brightness(1)",
          duration: 1.4,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=1.1"
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Smooth Category Filter Morph Animation
  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      const cards = gridRef.current.querySelectorAll(".project-animate-item")
      const imgs = gridRef.current.querySelectorAll(".project-img")

      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.07,
          ease: "power3.out",
          overwrite: "auto",
        }
      )

      gsap.fromTo(
        imgs,
        { scale: 1.15 },
        { scale: 1, duration: 0.8, stagger: 0.07, ease: "power2.out" },
        "<"
      )
    }, gridRef)

    return () => ctx.revert()
  }, [activeCategory])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden bg-background perspective-1000"
    >
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-foreground/5 rounded-full blur-[140px] pointer-events-none translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="ps-header flex flex-col items-center text-center mb-14">
          <SectionHeading
            badge="Our Portfolio"
            title="Featured Masterpieces"
            subtitle="Explore our collection of stunning landscape transformations, where visionary design meets meticulous craftsmanship."
            size="large"
            alignment="center"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex overflow-x-auto pb-4 mb-12 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap sm:justify-center gap-2 hide-scrollbar">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => dispatch(filterByCategory(category))}
                className={cn(
                  "ps-pill whitespace-nowrap px-6 py-2.5 rounded-full text-[13px] font-semibold tracking-wide transition-all duration-300 cursor-pointer border",
                  isActive
                    ? "bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-600/25"
                    : "bg-muted/60 border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {category}
              </button>
            )
          })}
        </div>

        {/* Showcase Grid */}
        {displayProjects.length > 0 ? (
          <div
            ref={gridRef}
            className="flex flex-col lg:flex-row gap-5 lg:gap-6 lg:h-[680px]"
          >
            {/* LARGE PORTRAIT CARD */}
            <div className="featured-card-wrapper project-animate-item relative w-full lg:w-[42%] lg:flex-shrink-0 h-[480px] sm:h-[560px] lg:h-full overflow-hidden rounded-3xl shadow-xl bg-muted/30">
              <ProjectCard
                project={displayProjects[0]}
                variant="featured"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* 4 SMALL CARDS (2x2 Grid) */}
            <div className="w-full lg:flex-1 grid grid-cols-2 grid-rows-2 gap-5 lg:gap-6 h-[420px] sm:h-[480px] lg:h-full">
              {displayProjects.slice(1, 5).map((project) => (
                <div
                  key={project.id}
                  className="small-card-wrapper project-animate-item relative min-h-0 overflow-hidden rounded-2xl shadow-md bg-muted/30"
                >
                  <ProjectCard
                    project={project}
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-muted/30 rounded-3xl border border-border/50">
            <Sparkles className="w-10 h-10 text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-heading text-2xl text-foreground mb-2">
              No projects found
            </h3>
            <p className="text-muted-foreground font-body">
              Check back later or try selecting a different category.
            </p>
          </div>
        )}

        {/* Bottom CTA Button */}
        <div className="mt-14 text-center">
          <Link href="/projects">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 group border-border text-foreground hover:bg-foreground hover:text-background"
            >
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProjectsShowcase