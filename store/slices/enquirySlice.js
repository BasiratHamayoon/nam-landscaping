import { createSlice } from "@reduxjs/toolkit"

const enquirySlice = createSlice({
  name: "enquiry",
  initialState: {
    enquiries: [],
    formData: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
    isSubmitting: false,
    isSubmitted: false,
  },
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload
      state.formData[field] = value
    },
    submitEnquiry: (state) => {
      state.isSubmitting = true
    },
    submitSuccess: (state) => {
      state.isSubmitting = false
      state.isSubmitted = true
      state.enquiries.push({ ...state.formData, id: Date.now(), status: "new" })
      state.formData = { name: "", email: "", phone: "", service: "", message: "" }
    },
    resetForm: (state) => {
      state.isSubmitted = false
      state.formData = { name: "", email: "", phone: "", service: "", message: "" }
    },
  },
})

export const { updateFormField, submitEnquiry, submitSuccess, resetForm } =
  enquirySlice.actions
export default enquirySlice.reducer