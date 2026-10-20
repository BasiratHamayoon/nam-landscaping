"use client"
import { useSelector, useDispatch } from "react-redux"
import { toggleTheme, setTheme } from "@/store/slices/themeSlice"

export function useAppTheme() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.theme.mode)

  return {
    theme,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (mode) => dispatch(setTheme(mode)),
    isDark: theme === "dark",
  }
}