// components/projects/ProjectGallery.jsx
"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles, X } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function ProjectGallery({ gallery, fallbackImage, title }) {
  const galleryRef = useRef(null)
  const [lightbox, setLightbox] = useState(null)

  const images = gallery?.length
    ? gallery
    : [
        fallbackImage,
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae",
        "https://images.unsplash.com/photo-1600240644455-3edc55c375fe",
        "https://images.unsplash.com/photo-1572288431126-c81e18f3e4c0",
      ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-head",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: galleryRef.current, start: "top 85%", once: true },
        }
      )
      gsap.fromTo(
        ".gallery-img",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gallery-mosaic", start: "top 80%", once: true },
        }
      )
    }, galleryRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={galleryRef} className="relative py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center mb-16">
            <div className="gallery-head inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-primary-600 dark:text-primary-400 text-xs font-semibold tracking-wider uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Gallery</span>
            </div>
            <h2 className="gallery-head font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
              Captured <span className="italic text-primary-600 dark:text-primary-400">moments</span>
            </h2>
          </div>

          <div className="gallery-mosaic grid grid-cols-6 auto-rows-[180px] sm:auto-rows-[220px] gap-4">
            {images.slice(0, 6).map((img, i) => {
              const layouts = [
                "col-span-6 sm:col-span-4 row-span-2",
                "col-span-3 sm:col-span-2 row-span-1",
                "col-span-3 sm:col-span-2 row-span-1",
                "col-span-3 sm:col-span-2 row-span-1",
                "col-span-3 sm:col-span-2 row-span-1",
                "col-span-6 sm:col-span-2 row-span-1",
              ]
              return (
                <div
                  key={i}
                  onClick={() => setLightbox(img)}
                  className={`gallery-img ${layouts[i]} relative rounded-3xl overflow-hidden border border-border group cursor-pointer`}
                >
                  <img
                    src={`${img}?w=1000&q=75`}
                    alt={`${title} ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white cursor-pointer transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={`${lightbox}?w=1920&q=90`}
            alt={title}
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}