// app/projects/[slug]/page.jsx
"use client"

import { use } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { projectsData } from "@/store/data/projectsData"
import ProjectHero from "@/components/projects/ProjectHero"
import ProjectInfo from "@/components/projects/ProjectInfo"
import ProjectGallery from "@/components/projects/ProjectGallery"
import ProjectChallenge from "@/components/projects/ProjectChallenge"
import ProjectTestimonial from "@/components/projects/ProjectTestimonial"
import ProjectRelated from "@/components/projects/ProjectRelated"
import ProjectCTA from "@/components/projects/ProjectCTA"

export default function ProjectDetailPage({ params }) {
  const { slug } = use(params)
  const rawItems = useSelector((state) => state.projects?.items)
  const projects = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : projectsData
  const project = projects.find((p) => p.slug === slug || String(p.id) === String(slug))

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="font-heading text-4xl mb-4">Project Not Found</h1>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white cursor-pointer hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </main>
    )
  }

  const related = projects.filter((p) => p.id !== project.id).slice(0, 3)

  return (
    <main className="relative bg-background text-foreground">
      <ProjectHero project={project} />
      <ProjectInfo project={project} />
      <ProjectChallenge project={project} />
      <ProjectGallery gallery={project.gallery} fallbackImage={project.image} title={project.title} />
      <ProjectTestimonial project={project} />
      <ProjectRelated related={related} />
      <ProjectCTA />
    </main>
  )
}