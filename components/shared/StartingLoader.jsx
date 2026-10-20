"use client"
import { useEffect, useRef, useState } from "react"

const leafPositions = [
  { top: "15%", left: "20%", size: "40px" },
  { top: "35%", left: "75%", size: "55px" },
  { top: "60%", left: "45%", size: "35px" },
  { top: "25%", left: "85%", size: "50px" },
  { top: "70%", left: "15%", size: "45px" },
  { top: "50%", left: "60%", size: "38px" },
]

export default function StartingLoader({ onComplete }) {
  const loaderRef = useRef(null)
  const logoRef = useRef(null)
  const textRef = useRef(null)
  const progressRef = useRef(null)
  const leavesRef = useRef([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete,
          })
        },
      })

      const obj = { val: 0 }
      gsap.to(obj, {
        val: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => setCounter(Math.floor(obj.val)),
      })

      tl.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" }
      )

      tl.fromTo(
        textRef.current,
        { y: 40, opacity: 0, letterSpacing: "20px" },
        { y: 0, opacity: 1, letterSpacing: "8px", duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )

      tl.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "left" },
        "-=0.6"
      )

      leavesRef.current.forEach((leaf, i) => {
        if (!leaf) return
        tl.fromTo(
          leaf,
          { scale: 0, rotation: -45, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 0.6,
            duration: 0.5,
            ease: "back.out(2)",
          },
          `-=${1.2 - i * 0.1}`
        )
      })

      tl.to(
        logoRef.current,
        {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
        "-=0.5"
      )
    }

    loadGSAP()
  }, [onComplete])

  return (
    <div
      ref={loaderRef}
      className="loader-wrapper bg-gradient-to-br from-primary-950 via-emerald-900 to-primary-900"
    >
      <div className="absolute inset-0 opacity-10">
        {leafPositions.map((pos, i) => (
          <div
            key={i}
            ref={(el) => (leavesRef.current[i] = el)}
            className="absolute"
            style={{
              top: pos.top,
              left: pos.left,
              fontSize: pos.size,
            }}
          >
            🌿
          </div>
        ))}
      </div>

      <div ref={logoRef} className="relative mb-8 opacity-0">
        <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
          <div className="text-center">
            <div className="text-4xl mb-1">🌳</div>
            <div className="text-white/80 text-[10px] font-body tracking-widest uppercase">NAM</div>
          </div>
        </div>
        <div className="absolute -inset-2 rounded-full border border-primary-400/30 animate-spin-slow" />
        <div className="absolute -inset-4 rounded-full border border-primary-400/10 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
      </div>

      <h1
        ref={textRef}
        className="text-white text-xl md:text-2xl font-heading tracking-[8px] uppercase mb-8 opacity-0"
      >
        NAM Landscaping
      </h1>

      <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary-400 via-emerald-400 to-lime-400 rounded-full"
          style={{ transformOrigin: "left", transform: "scaleX(0)" }}
        />
      </div>

      <div className="text-white/50 text-sm font-body tracking-widest">
        {counter}%
      </div>

      <p className="text-white/30 text-xs font-body mt-4 tracking-wider">
        Crafting Natural Beauty
      </p>
    </div>
  )
}