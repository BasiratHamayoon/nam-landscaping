import { createSlice } from "@reduxjs/toolkit"
import { testimonialsData } from "../data/testimonialsData"

const initialState = {
  items: testimonialsData,
  activeIndex: 0,
}

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    nextTestimonial: (state) => {
      const length = state.items?.length || 1
      state.activeIndex = (state.activeIndex + 1) % length
    },
    prevTestimonial: (state) => {
      const length = state.items?.length || 1
      state.activeIndex = (state.activeIndex - 1 + length) % length
    },
    setTestimonial: (state, action) => {
      state.activeIndex = action.payload
    },
  },
})

export const { nextTestimonial, prevTestimonial, setTestimonial } = testimonialsSlice.actions
export default testimonialsSlice.reducer