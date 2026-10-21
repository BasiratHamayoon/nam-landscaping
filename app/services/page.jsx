// app/services/page.jsx
"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { servicesData } from "@/store/data/servicesData"
import ServicesHero from "@/components/services/ServicesHero"
import ServicesMarquee from "@/components/services/ServicesMarquee"
import ServicesGrid from "@/components/services/ServicesGrid"
import ServicesCTA from "@/components/services/ServicesCTA"

export default function ServicesPage() {
  const rawItems = useSelector((state) => state.services?.items)
  const services = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : servicesData

  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = ["all", ...new Set(services.map((s) => s.category).filter(Boolean))]

  const filtered = services.filter((s) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory
    const matchesQuery = !query || s.title?.toLowerCase().includes(query.toLowerCase()) || s.description?.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <main className="relative bg-background text-foreground">
      <ServicesHero query={query} setQuery={setQuery} />
      <ServicesMarquee />
      <ServicesGrid
        filtered={filtered}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ServicesCTA />
    </main>
  )
}