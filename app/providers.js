"use client"
import { Provider } from "react-redux"
import { store } from "@/store/store"
import { ThemeProvider } from "next-themes"
import { useState, useEffect } from "react"
import StartingLoader from "@/components/shared/StartingLoader"
import CursorFollower from "@/components/animations/CursorFollower"
import FloatingWhatsApp from "@/components/shared/FloatingWhatsApp"

export default function Providers({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => setShowContent(true), 100)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        {isLoading && <StartingLoader onComplete={() => setIsLoading(false)} />}
        {showContent && (
          <div className="animate-[fadeIn_0.5s_ease-in-out]">
            <CursorFollower />
            {children}
            <FloatingWhatsApp />
          </div>
        )}
      </ThemeProvider>
    </Provider>
  )
}