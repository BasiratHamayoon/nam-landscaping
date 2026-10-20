import { createSlice } from "@reduxjs/toolkit"
import { testimonialsData } from "../data/testimonialsData"

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    items: testimonialsData,
    activeIndex: 0,
  },
  reducers: {
    setActiveIndex: (state, action) => {
      state.activeIndex = action.payload
    },
    nextTestimonial: (state) => {
      state.activeIndex = (state.activeIndex + 1) % state.items.length
    },
    prevTestimonial: (state) => {
      state.activeIndex =
        state.activeIndex === 0 ? state.items.length - 1 : state.activeIndex - 1
    },
  },
})

export const { setActiveIndex, nextTestimonial, prevTestimonial } =
  testimonialsSlice.actions
export default testimonialsSlice.reducer