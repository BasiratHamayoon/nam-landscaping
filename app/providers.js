"use client"

import { Provider } from "react-redux"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { store } from "@/store/store"

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </NextThemesProvider>
    </Provider>
  )
}

export default Providers