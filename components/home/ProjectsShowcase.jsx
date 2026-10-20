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
  const hasAnimated = useRef(false)

  const featured = filteredItems.filter((p) => p.featured)
  const pool = featured.length >= 5 ? featured : filteredItems
  const displayProjects = pool.slice(0, 5)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".project-animate")
      if (!cards?.length) return

      gsap.set(cards, { opacity: 1, y: 0, scale: 1 })

      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
        y: 50,
        opacity: 0,
        scale: 0.97,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform",
        onComplete: () => {
          hasAnimated.current = true
          gsap.set(cards, { clearProps: "all" })
        },
      })

      gsap.from(".ps-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })

      gsap.from(".ps-pill", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 16,
        opacity: 0,
        duration: 0.45,
        stagger: 0.04,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current || !hasAnimated.current) return

    const cards = gridRef.current.querySelectorAll(".project-animate")
    if (!cards.length) return

    gsap.fromTo(
      cards,
      { y: 24, opacity: 0.35 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: "power2.out",
        overwrite: true,
        clearProps: "transform",
      }
    )
  }, [activeCategory])

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden bg-background"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-foreground/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="ps-header flex flex-col items-center text-center mb-14">
          <SectionHeading
            badge="Our Portfolio"
            title="Featured Masterpieces"
            subtitle="Explore our collection of stunning landscape transformations, where visionary design meets meticulous craftsmanship."
            size="large"
            alignment="center"
          />
        </div>

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

        {displayProjects.length > 0 ? (
          <div
            ref={gridRef}
            className="flex flex-col lg:flex-row gap-5 lg:gap-6 lg:h-[680px]"
          >
            <div className="project-animate relative w-full lg:w-[42%] lg:flex-shrink-0 h-[480px] sm:h-[560px] lg:h-full overflow-hidden rounded-3xl shadow-lg">
              <ProjectCard
                project={displayProjects[0]}
                variant="featured"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            <div className="w-full lg:flex-1 grid grid-cols-2 grid-rows-2 gap-5 lg:gap-6 h-[420px] sm:h-[480px] lg:h-full">
              {displayProjects.slice(1, 5).map((project) => (
                <div
                  key={project.id}
                  className="project-animate relative min-h-0 overflow-hidden rounded-2xl shadow-md"
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