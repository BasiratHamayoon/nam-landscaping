"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeToggle({ scrolled = false }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full shrink-0" />
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300 cursor-pointer overflow-hidden shrink-0 ${
        scrolled
          ? "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/20"
          : "bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md"
      }`}
      aria-label="Toggle theme"
    >
      <Sun
        className={`w-4 h-4 absolute transition-all duration-500 ease-in-out ${
          isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`w-4 h-4 absolute transition-all duration-500 ease-in-out ${
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  )
}

export default ThemeToggle