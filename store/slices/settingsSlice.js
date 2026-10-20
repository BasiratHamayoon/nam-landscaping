import { createSlice } from "@reduxjs/toolkit"
import { settingsData } from "../data/settingsData"

const settingsSlice = createSlice({
  name: "settings",
  initialState: settingsData,
  reducers: {
    updateSettings: (state, action) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { updateSettings } = settingsSlice.actions
export default settingsSlice.reducer