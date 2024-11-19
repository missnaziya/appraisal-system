import { createSlice } from "@reduxjs/toolkit";

const appraisalSlice = createSlice({
  name: "appraisals",
  initialState: {
    appraisals: [] // Store appraisals
  },
  reducers: {
    submitAppraisal: (state, action) => {
      state.appraisals.push(action.payload);
    },
    setAppraisals: (state, action) => {
      state.appraisals = action.payload;
    }
  }
});

export const { submitAppraisal, setAppraisals } = appraisalSlice.actions;
export default appraisalSlice.reducer;
