// app/services/[slug]/page.jsx
"use client"

import { use } from "react"
import { useSelector } from "react-redux"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { servicesData } from "@/store/data/servicesData"
import DetailHero from "@/components/services/DetailHero"
import DetailOverview from "@/components/services/DetailOverview"
import DetailFeatures from "@/components/services/DetailFeatures"
import DetailProcess from "@/components/services/DetailProcess"
import DetailGallery from "@/components/services/DetailGallery"
import DetailRelated from "@/components/services/DetailRelated"
import DetailCTA from "@/components/services/DetailCTA"

export default function ServiceDetailPage({ params }) {
  const { slug } = use(params)
  const rawItems = useSelector((state) => state.services?.items)
  const services = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : servicesData
  const service = services.find((s) => s.slug === slug || String(s.id) === String(slug))

  if (!service) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="font-heading text-4xl mb-4">Service Not Found</h1>
          <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white cursor-pointer hover:scale-105 transition-transform">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </main>
    )
  }

  const relatedServices = services.filter((s) => s.id !== service.id).slice(0, 3)

  return (
    <main className="relative bg-background text-foreground">
      <DetailHero service={service} />
      <DetailOverview service={service} />
      <DetailFeatures features={service.features} />
      <DetailProcess process={service.process} />
      <DetailGallery gallery={service.gallery} fallbackImage={service.image} title={service.title} />
      <DetailRelated relatedServices={relatedServices} />
      <DetailCTA title={service.title} />
    </main>
  )
}