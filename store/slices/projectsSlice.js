import { createSlice } from "@reduxjs/toolkit"
import { projectsData } from "../data/projectsData"

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    items: projectsData,
    filteredItems: projectsData,
    activeCategory: "All",
    selectedProject: null,
  },
  reducers: {
    filterByCategory: (state, action) => {
      state.activeCategory = action.payload
      if (action.payload === "All") {
        state.filteredItems = state.items
      } else {
        state.filteredItems = state.items.filter(
          (item) => item.category === action.payload
        )
      }
    },
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload
    },
  },
})

export const { filterByCategory, setSelectedProject } = projectsSlice.actions
export default projectsSlice.reducer