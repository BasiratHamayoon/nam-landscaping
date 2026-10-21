// components/gallery/GalleryHero.jsx
"use client"

import { useEffect, useRef } from "react"
import { Camera, Sparkles } from "lucide-react"
import gsap from "gsap"

export default function GalleryHero({ totalImages = 50 }) {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".gal-orb-1", {
        x: "12vw",
        y: "6vh",
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
      gsap.to(".gal-orb-2", {
        x: "-10vw",
        y: "10vh",
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
      gsap.to(".gal-orb-3", {
        x: "6vw",
        y: "-8vh",
        duration: 13,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      const title = heroRef.current?.querySelector(".gal-title")
      if (title) {
        const text = title.textContent
        title.innerHTML = text
          .split(" ")
          .map(
            (w) =>
              `<span class="inline-block overflow-hidden pb-2"><span class="inline-block word">${w}</span></span>`
          )
          .join(" ")

        gsap.from(title.querySelectorAll(".word"), {
          yPercent: 120,
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
          delay: 0.1,
        })
      }

      gsap.from(".gal-anim", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative pt-36 sm:pt-48 pb-20 sm:pb-28 overflow-hidden bg-[#0a0f0c] text-white"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="gal-orb-1 absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-600/20 blur-[130px]" />
        <div className="gal-orb-2 absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-primary-500/15 blur-[110px]" />
        <div className="gal-orb-3 absolute bottom-[-20%] left-[30%] w-[55vw] h-[55vw] rounded-full bg-emerald-400/15 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.05)_1px,_transparent_0)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 text-center flex flex-col items-center">
        <div className="gal-anim inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-emerald-400 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-6">
          <Camera className="w-3.5 h-3.5" />
          <span>Visual Portfolio · {totalImages}+ Captures</span>
        </div>

        <h1 className="gal-title font-heading text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight text-white mb-6">
          Moments of <span className="italic text-emerald-400">beauty</span>
        </h1>

        <p className="gal-anim text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mb-10">
          A curated gallery of gardens, pools, hardscapes, and nightscapes crafted
          across the UAE — every frame a story of design, climate, and craft.
        </p>

        <div className="gal-anim grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 w-full pt-10 border-t border-white/10">
          {[
            { label: "Gardens", value: "85+" },
            { label: "Pools", value: "30+" },
            { label: "Hardscapes", value: "40+" },
            { label: "Lighting", value: "25+" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-heading text-3xl sm:text-4xl text-white mb-1">
                {stat.value}
              </div>
              <div className="text-[11px] sm:text-xs text-emerald-400 uppercase tracking-widest font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}