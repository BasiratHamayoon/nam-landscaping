// app/projects/page.jsx
"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { projectsData } from "@/store/data/projectsData"
import ProjectsHero from "@/components/projects/ProjectsHero"
import ProjectsStats from "@/components/projects/ProjectsStats"
import ProjectsGrid from "@/components/projects/ProjectsGrid"
import ProjectsFeatured from "@/components/projects/ProjectsFeatured"
import ProjectsCTA from "@/components/projects/ProjectsCTA"

export default function ProjectsPage() {
  const rawItems = useSelector((state) => state.projects?.items)
  const projects = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : projectsData

  const [activeCategory, setActiveCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const categories = ["all", ...new Set(projects.map((p) => p.category).filter(Boolean))]
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory)
  const featured = projects.find((p) => p.featured) || projects[0]

  return (
    <main className="relative bg-background text-foreground">
      <ProjectsHero totalProjects={projects.length} />
      <ProjectsStats />
      <ProjectsFeatured project={featured} />
      <ProjectsGrid
        projects={filtered}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <ProjectsCTA />
    </main>
  )
}