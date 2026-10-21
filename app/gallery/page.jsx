// app/gallery/page.jsx
"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import GalleryHero from "@/components/gallery/GalleryHero"
import GalleryGrid from "@/components/gallery/GalleryGrid"
import GalleryCTA from "@/components/gallery/GalleryCTA"

const galleryData = [
  {
    id: 1,
    title: "Palm Villa Oasis",
    category: "Gardens",
    location: "Palm Jumeirah",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f0f?w=1200&q=80",
  },
  {
    id: 2,
    title: "Infinity Edge Pool",
    category: "Pools",
    location: "Emirates Hills",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1200&q=80",
  },
  {
    id: 3,
    title: "Stone Courtyard",
    category: "Hardscaping",
    location: "Arabian Ranches",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  },
  {
    id: 4,
    title: "Lush Tropical Path",
    category: "Gardens",
    location: "Jumeirah Islands",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&q=80",
  },
  {
    id: 5,
    title: "Ambient Night Lights",
    category: "Lighting",
    location: "Dubai Hills",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  },
  {
    id: 6,
    title: "Zen Water Feature",
    category: "Water Features",
    location: "Al Barari",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  },
  {
    id: 7,
    title: "Resort Pool Deck",
    category: "Pools",
    location: "Saadiyat Island",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
  },
  {
    id: 8,
    title: "Desert Bloom Garden",
    category: "Gardens",
    location: "Abu Dhabi",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200&q=80",
  },
  {
    id: 9,
    title: "Modern Pergola Lounge",
    category: "Hardscaping",
    location: "Dubai Marina",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1200&q=80",
  },
  {
    id: 10,
    title: "Cascading Fountain",
    category: "Water Features",
    location: "Mirdif",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  },
  {
    id: 11,
    title: "Pathway Glow",
    category: "Lighting",
    location: "The Springs",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
  },
  {
    id: 12,
    title: "Geometric Courtyard Pool",
    category: "Pools",
    location: "Downtown Dubai",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
  },
]

export default function GalleryPage() {
  const rawItems = useSelector((state) => state.gallery?.items)
  const gallery = Array.isArray(rawItems) && rawItems.length > 0 ? rawItems : galleryData

  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    "all",
    ...new Set(
      gallery
        .map((item) => item.category)
        .filter(Boolean)
    ),
  ]

  const filtered =
    activeCategory === "all"
      ? gallery
      : gallery.filter((item) => item.category === activeCategory)

  return (
    <main className="relative bg-background text-foreground">
      <GalleryHero totalImages={gallery.length} />
      <GalleryGrid
        images={filtered}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <GalleryCTA />
    </main>
  )
}