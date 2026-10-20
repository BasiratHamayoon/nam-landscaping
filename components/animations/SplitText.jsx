"use client"
import { useRef, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"

export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.03,
  tag: Tag = "div",
  type = "words",
}) {
  const containerRef = useRef(null)

  const elements = useMemo(() => {
    if (type === "chars") return text.split("")
    if (type === "words") return text.split(" ")
    return [text]
  }, [text, type])

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (!containerRef.current) return

      const items = containerRef.current.querySelectorAll(".split-element")

      gsap.fromTo(
        items,
        { y: 80, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          delay,
          stagger,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }

    loadGSAP()
  }, [delay, stagger])

  return (
    <Tag ref={containerRef} className={cn("flex flex-wrap", className)}>
      {elements.map((element, index) => (
        <span
          key={index}
          className="split-element inline-block opacity-0"
          style={{ perspective: "500px" }}
        >
          {element}
          {type === "words" && index < elements.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  )
}