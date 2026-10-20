"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Award, Leaf, CheckCircle } from "lucide-react"

const stats = [
  { id: 1, value: 15, suffix: "+", label: "Years Experience", icon: Award },
  { id: 2, value: 450, suffix: "+", label: "Projects Completed", icon: CheckCircle },
  { id: 3, value: 100, suffix: "%", label: "Client Satisfaction", icon: Users },
  { id: 4, value: 50, suffix: "+", label: "Maintenance Contracts", icon: Leaf },
]

export function StatsCounter() {
  const sectionRef = useRef(null)
  const numbersRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Fade in the whole section
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })

      // Number count up animation
      numbersRef.current.forEach((el, index) => {
        if (!el) return
        const targetValue = stats[index].value
        
        gsap.to(el, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
          innerHTML: targetValue,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function () {
            el.innerHTML = Math.ceil(this.targets()[0].innerHTML)
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 bg-[#0a0f0c] relative overflow-hidden">
      {/* Premium Background Glow/Noise Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-primary-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
      
      <div 
        ref={sectionRef}
        className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={stat.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-full bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-500">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                
                <div className="flex items-baseline gap-1 mb-2">
                  <span 
                    ref={el => numbersRef.current[index] = el}
                    className="font-heading text-5xl md:text-6xl text-white tracking-tight"
                  >
                    0
                  </span>
                  <span className="font-heading text-3xl md:text-4xl text-primary-500">
                    {stat.suffix}
                  </span>
                </div>
                
                <p className="text-sm md:text-base text-white/60 font-medium tracking-wide">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default StatsCounter