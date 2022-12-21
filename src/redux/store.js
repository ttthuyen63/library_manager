import { createSlice, configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import borrowSlice from "./borrowSlice";
import readerSlice from "./readerSlice";
import userSlice from "./userSlice";

export default configureStore({
  reducer: {
    bookReducer: bookSlice,
    userReducer: userSlice,
    readerReducer: readerSlice,
    borrowReducer: borrowSlice,
  },
});
