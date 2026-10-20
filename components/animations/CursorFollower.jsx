"use client"
import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function CountUp({
  end,
  duration = 2.5,
  prefix = "",
  suffix = "",
  className,
}) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 85%",
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true

          const obj = { val: 0 }
          gsap.to(obj, {
            val: end,
            duration,
            ease: "power2.out",
            onUpdate: () => {
              setCount(Math.floor(obj.val))
            },
          })
        },
      })
    }

    loadGSAP()
  }, [end, duration])

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}