import { configureStore } from "@reduxjs/toolkit"
import themeReducer from "./slices/themeSlice"
import servicesReducer from "./slices/servicesSlice"
import projectsReducer from "./slices/projectsSlice"
import testimonialsReducer from "./slices/testimonialsSlice"
import enquiryReducer from "./slices/enquirySlice"
import faqReducer from "./slices/faqSlice"
import galleryReducer from "./slices/gallerySlice"
import settingsReducer from "./slices/settingsSlice"
import uiReducer from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    services: servicesReducer,
    projects: projectsReducer,
    testimonials: testimonialsReducer,
    enquiry: enquiryReducer,
    faq: faqReducer,
    gallery: galleryReducer,
    settings: settingsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})