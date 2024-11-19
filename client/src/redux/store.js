import { configureStore } from "@reduxjs/toolkit";
import appraisalReducer from "./slices/appraisalSlice";

const store = configureStore({
  reducer: {
    appraisals: appraisalReducer
  }
});

export default store;
