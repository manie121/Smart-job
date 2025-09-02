import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "../Slice/JobsSlice.js";
import profileSlice from "../Slice/ProfileSlice.js";
import registerSlice from "../Slice/RegisterSlice.js";

const store = configureStore({
  reducer: {
    jobs:jobSlice,
    profile: profileSlice,
    users:registerSlice,
    },
});

export default store;
