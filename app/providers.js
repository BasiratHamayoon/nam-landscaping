"use client"

import { useState, useEffect } from "react"
import { Provider } from "react-redux"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { store } from "@/store/store"
import { StartingLoader } from "@/components/shared/StartingLoader"

export function Providers({ children }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Provider store={store}>
      {mounted ? (
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StartingLoader />
          {children}
        </NextThemesProvider>
      ) : (
        <div suppressHydrationWarning>
          <StartingLoader />
          {children}
        </div>
      )}
    </Provider>
  )
}

export default Providers