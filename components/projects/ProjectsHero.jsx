// components/projects/ProjectsHero.jsx
"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Sparkles, ArrowRight, Layers } from "lucide-react"
import gsap from "gsap"

export default function ProjectsHero({ totalProjects = 150 }) {
  const heroRef = useRef(null)
  const [imgError, setImgError] = useState({})

  const handleImageError = (id) => {
    setImgError((prev) => ({ ...prev, [id]: true }))
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".proj-orb-1", { x: "15vw", y: "8vh", duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(".proj-orb-2", { x: "-12vw", y: "12vh", duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(".proj-orb-3", { x: "8vw", y: "-8vh", duration: 14, repeat: -1, yoyo: true, ease: "sine.inOut" })

      const splitWords = (el) => {
        const text = el.textContent
        el.innerHTML = text
          .split(" ")
          .map((w) => `<span class="inline-block overflow-hidden pb-2"><span class="inline-block word">${w}</span></span>`)
          .join(" ")
        return el.querySelectorAll(".word")
      }

      const title = heroRef.current?.querySelector(".proj-title")
      if (title) {
        const words = splitWords(title)
        gsap.from(words, { yPercent: 120, duration: 1.1, stagger: 0.08, ease: "power4.out", delay: 0.1 })
      }

      gsap.from(".proj-anim", { y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.6 })

      gsap.from(".proj-float-img", {
        y: 60,
        opacity: 0,
        scale: 0.9,
        duration: 1.4,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.9,
      })

      gsap.to(".proj-float-img-1", { y: -20, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(".proj-float-img-2", { y: 20, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" })
      gsap.to(".proj-float-img-3", { y: -15, duration: 4.5, repeat: -1, yoyo: true, ease: "sine.inOut" })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const images = {
    img1: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    img2: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
    img3: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  }

  return (
    <section ref={heroRef} className="relative pt-36 sm:pt-48 pb-24 sm:pb-32 overflow-hidden bg-[#0a0f0c] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="proj-orb-1 absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-emerald-600/25 blur-[130px]" />
        <div className="proj-orb-2 absolute top-[20%] right-[-15%] w-[45vw] h-[45vw] rounded-full bg-primary-500/20 blur-[110px]" />
        <div className="proj-orb-3 absolute bottom-[-25%] left-[25%] w-[60vw] h-[60vw] rounded-full bg-emerald-400/15 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.05)_1px,_transparent_0)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="proj-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6">
              <Layers className="w-3.5 h-3.5" />
              <span>Portfolio · {totalProjects}+ Projects</span>
            </div>

            <h1 className="proj-title font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-white mb-6">
              Living <span className="italic text-emerald-400">masterpieces</span> we crafted
            </h1>

            <p className="proj-anim text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mb-10">
              Explore our collection of signature landscape projects across the UAE — from private villas to luxury resorts, each one a story of thoughtful design.
            </p>

            <div className="proj-anim flex flex-col sm:flex-row gap-4">
              <Link
                href="#projects-grid"
                className="h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                <Sparkles className="w-4 h-4" />
                Explore Portfolio
              </Link>
              <Link
                href="/contact"
                className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/30 text-white font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] hidden lg:block">
            <div className="proj-float-img proj-float-img-1 absolute top-0 left-0 w-[55%] h-[55%] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-primary-950">
              <img
                src={imgError.img1 ? "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" : images.img1}
                alt="Palm Jumeirah Oasis"
                onError={() => handleImageError("img1")}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-1">Villa Design</div>
                <div className="font-heading text-white text-lg leading-tight">Palm Jumeirah Oasis</div>
              </div>
            </div>

            <div className="proj-float-img proj-float-img-2 absolute top-[10%] right-0 w-[45%] h-[40%] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-emerald-950">
              <img
                src={imgError.img2 ? "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80" : images.img2}
                alt="Resort Pool"
                onError={() => handleImageError("img2")}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-1">Pool</div>
                <div className="font-heading text-white text-lg leading-tight">Resort Pool</div>
              </div>
            </div>

            <div className="proj-float-img proj-float-img-3 absolute bottom-0 right-[10%] w-[50%] h-[45%] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-primary-950">
              <img
                src={imgError.img3 ? "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80" : images.img3}
                alt="Tropical Haven"
                onError={() => handleImageError("img3")}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold mb-1">Garden</div>
                <div className="font-heading text-white text-lg leading-tight">Tropical Haven</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}