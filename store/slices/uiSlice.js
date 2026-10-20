import { createSlice } from "@reduxjs/toolkit"

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isMenuOpen: false,
    isLoading: true,
    isScrolled: false,
    cursorVariant: "default",
    pageTransition: false,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen
    },
    closeMenu: (state) => {
      state.isMenuOpen = false
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setScrolled: (state, action) => {
      state.isScrolled = action.payload
    },
    setCursorVariant: (state, action) => {
      state.cursorVariant = action.payload
    },
    setPageTransition: (state, action) => {
      state.pageTransition = action.payload
    },
  },
})

export const {
  toggleMenu,
  closeMenu,
  setLoading,
  setScrolled,
  setCursorVariant,
  setPageTransition,
} = uiSlice.actions
export default uiSlice.reducer