import { createSlice } from "@reduxjs/toolkit"
import { faqData } from "../data/faqData"

const faqSlice = createSlice({
  name: "faq",
  initialState: {
    items: faqData,
    openIndex: null,
  },
  reducers: {
    toggleFaq: (state, action) => {
      state.openIndex = state.openIndex === action.payload ? null : action.payload
    },
  },
})

export const { toggleFaq } = faqSlice.actions
export default faqSlice.reducer