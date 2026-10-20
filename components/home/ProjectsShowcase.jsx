"use client"
import { useSelector, useDispatch } from "react-redux"
import { filterByCategory } from "@/store/slices/projectsSlice"
import { projectCategories } from "@/store/data/projectsData"
import SectionHeading from "../shared/SectionHeading"
import ProjectCard from "../shared/ProjectCard"
import Button from "../ui/Button"
import { useStaggerAnimation } from "@/hooks/useScrollAnimation"
import FadeIn from "../animations/FadeIn"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ProjectsShowcase() {
  const dispatch = useDispatch()
  const { filteredItems, activeCategory } = useSelector((state) => state.projects)
  const containerRef = useStaggerAnimation({
    selector: ".stagger-item",
    stagger: 0.1,
  })

  const featuredProjects = filteredItems.filter((p) => p.featured).slice(0, 4)

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

      <div className="container-custom relative">
        <SectionHeading
          badge="Our Portfolio"
          title="Featured Projects"
          subtitle="Explore our collection of stunning landscape transformations that showcase our expertise and creative vision."
        />

        <FadeIn className="flex flex-wrap justify-center gap-2 mb-12">
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => dispatch(filterByCategory(category))}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium font-body transition-all duration-300",
                activeCategory === category
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
              )}
            >
              {category}
            </button>
          ))}
        </FadeIn>

        <div ref={containerRef}>
          {featuredProjects.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ProjectCard project={featuredProjects[0]} variant="featured" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {featuredProjects.slice(1, 5).map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>

        <FadeIn className="text-center mt-12">
          <Button variant="outline" size="lg" className="group">
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}