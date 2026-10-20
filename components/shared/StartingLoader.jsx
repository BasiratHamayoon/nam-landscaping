"use client"

import { useState, useEffect } from "react"
import { Leaf } from "lucide-react"

export function StartingLoader() {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const safePrev = typeof prev === "number" && !isNaN(prev) ? prev : 0
        if (safePrev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsHiding(true), 200)
          setTimeout(() => setIsFinished(true), 700)
          return 100
        }
        return Math.min(100, safePrev + 10)
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  if (isFinished) return null

  const safeProgress = typeof progress === "number" && !isNaN(progress) ? progress : 0

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f0c] text-white transition-all duration-500 ease-in-out ${
        isHiding ? "opacity-0 pointer-events-none -translate-y-full" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary-950/80 border border-primary-500/30 flex items-center justify-center mb-6 shadow-lg shadow-primary-900/20 animate-pulse">
          <Leaf className="w-8 h-8 text-primary-400" />
        </div>

        <h2 className="font-heading text-2xl tracking-wide text-white mb-1">
          NAM Landscaping
        </h2>
        <p className="text-xs text-primary-400/80 uppercase tracking-[0.2em] mb-8 font-medium">
          Crafting Outdoor Elegance
        </p>

        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative mb-3">
          <div
            className="h-full bg-primary-500 transition-all duration-150 ease-out rounded-full"
            style={{ width: `${safeProgress}%` }}
          />
        </div>

        <span className="text-xs font-mono text-white/50 tracking-wider">
          {safeProgress}%
        </span>
      </div>
    </div>
  )
}

export default StartingLoader