import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addListBook: (state, action) => {
        const books = action.payload;
        return {...books}
    }
  },
});

export const {addListBook} = bookSlice.actions;

export default bookSlice.reducer;
