// components/gallery/GalleryGrid.jsx
"use client"

import { useEffect, useRef, useState } from "react"
import { ZoomIn, X, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "@/components/shared/SectionHeading"

// Hyper-reliable high-res images
const fallbackData = [
  { id: 1, title: "Palm Villa Oasis", category: "Gardens", location: "Palm Jumeirah", url: "https://images.unsplash.com/photo-1558904541-efa843a96f0f?w=1600&q=80" },
  { id: 2, title: "Infinity Edge Pool", category: "Pools", location: "Emirates Hills", url: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=1600&q=80" },
  { id: 3, title: "Stone Courtyard", category: "Hardscaping", location: "Arabian Ranches", url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80" },
  { id: 4, title: "Tropical Pathway", category: "Gardens", location: "Jumeirah Islands", url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1600&q=80" },
  { id: 5, title: "Ambient Night Lights", category: "Lighting", location: "Dubai Hills", url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80" },
  { id: 6, title: "Zen Water Feature", category: "Water Features", location: "Al Barari", url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80" },
  { id: 7, title: "Resort Pool Deck", category: "Pools", location: "Saadiyat Island", url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80" },
  { id: 8, title: "Desert Bloom Garden", category: "Gardens", location: "Abu Dhabi", url: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80" },
  { id: 9, title: "Modern Pergola", category: "Hardscaping", location: "Dubai Marina", url: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdbc?w=1600&q=80" },
  { id: 10, title: "Cascading Fountain", category: "Water Features", location: "Mirdif", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80" },
]

export default function GalleryGrid({ categories, activeCategory, setActiveCategory }) {
  const gridRef = useRef(null)
  
  // Viewer State
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Filter logic applied to the safe fallback data
  const filteredImages = activeCategory === "all" 
    ? fallbackData 
    : fallbackData.filter((item) => item.category === activeCategory)

  // Layout Engine: Assigns dynamic grid spans for a "Bento Box" look
  const getGridClass = (index) => {
    const pattern = [
      "col-span-12 md:col-span-8 row-span-2 aspect-[16/10] md:aspect-auto", // 0: Huge cinematic
      "col-span-6 md:col-span-4 row-span-1 aspect-square md:aspect-auto", // 1: Small square
      "col-span-6 md:col-span-4 row-span-2 aspect-[3/4] md:aspect-auto",   // 2: Tall portrait
      "col-span-12 md:col-span-4 row-span-1 aspect-video md:aspect-auto",  // 3: Wide box
      "col-span-6 md:col-span-4 row-span-1 aspect-square md:aspect-auto",  // 4: Small square
      "col-span-6 md:col-span-4 row-span-1 aspect-square md:aspect-auto",  // 5: Small square
      "col-span-12 md:col-span-8 row-span-1 aspect-video md:aspect-auto",  // 6: Ultra wide
    ]
    return pattern[index % pattern.length]
  }

  // Entrance Animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(".gal-filter-pill", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power3.out", scrollTrigger: { trigger: ".gal-filter-bar", start: "top 90%", once: true } }
      )
      
      const items = gsap.utils.toArray(".bento-item")
      items.forEach((item, i) => {
        gsap.fromTo(item, 
          { y: 80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1, delay: (i % 5) * 0.1, ease: "power4.out", scrollTrigger: { trigger: item, start: "top 90%", once: true } }
        )
      })
    }, gridRef)
    return () => ctx.revert()
  }, [activeCategory])

  // Keybindings for Viewer
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false)
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }
    window.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [isOpen, currentIndex])

  const openViewer = (index) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % filteredImages.length)
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)

  return (
    <>
      <section ref={gridRef} className="relative py-20 sm:py-28 bg-background border-y border-border">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          
          <SectionHeading
            badge="Portfolio"
            title="Symphony of Spaces"
            subtitle="Explore our masterfully crafted environments in a dynamic visual journey."
            size="large"
            alignment="center"
          />

          {/* Filters */}
          <div className="gal-filter-bar flex flex-wrap justify-center gap-2 sm:gap-3 mt-10 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`gal-filter-pill px-6 py-2.5 rounded-full text-[11px] sm:text-sm font-semibold uppercase tracking-wider cursor-pointer transition-all hover:scale-105 ${
                  activeCategory === cat
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/30"
                    : "bg-card border border-border text-foreground hover:border-primary-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-12 auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px] gap-3 sm:gap-5">
            {filteredImages.map((item, i) => (
              <div
                key={item.id || i}
                onClick={() => openViewer(i)}
                className={`bento-item ${getGridClass(i)} relative group rounded-3xl overflow-hidden bg-card cursor-pointer isolate shadow-sm hover:shadow-2xl hover:shadow-primary-600/20 transition-all duration-500 border border-border/50`}
              >
                {/* Image & Dark Gradient Overlay */}
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Hover Reveal Details */}
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-primary-500/20 backdrop-blur-md border border-primary-500/30 text-[10px] font-bold uppercase tracking-wider text-white">
                      {item.category}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-white leading-tight mb-2">
                    {item.title}
                  </h3>
                  {item.location && (
                    <div className="flex items-center gap-1.5 text-white/70 text-xs sm:text-sm">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cinematic Fullscreen Viewer */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex flex-col">
          {/* Header Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-50">
            <div className="text-white/60 font-heading text-lg tracking-widest uppercase">
              {currentIndex + 1} / {filteredImages.length}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Stage */}
          <div className="flex-1 relative flex items-center justify-center p-4 sm:p-12 overflow-hidden">
            <img
              key={currentIndex} // forces re-render for quick CSS transition
              src={filteredImages[currentIndex].url}
              alt={filteredImages[currentIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl animate-in fade-in zoom-in-95 duration-500"
            />
          </div>

          {/* Footer Details */}
          <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 bg-gradient-to-t from-black to-transparent flex flex-col items-center text-center pointer-events-none">
            <div className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-4">
              {filteredImages[currentIndex].category}
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl text-white mb-2">
              {filteredImages[currentIndex].title}
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-white/50 text-sm">
              <MapPin className="w-4 h-4" />
              {filteredImages[currentIndex].location}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-all hover:scale-110 cursor-pointer z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white backdrop-blur-md transition-all hover:scale-110 cursor-pointer z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}