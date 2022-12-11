import { createSlice, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";

export default configureStore({
reducer: {
bookReducer: bookSlice,
},
});