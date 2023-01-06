import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const addBook = createAsyncThunk("/addBook", async (arg, thunkApi) => {
  const token = thunkApi.getState().userReducer.token;
  // const res = await customAxios.post(`/bookList.json?auth=${token}`, {
  const res = await customAxios.post(`/bookList`, {
    nameBook: arg.nameBook,
    genreBook: arg.genreBook,
    descriptionBook: arg.descriptionBook,
    issueBook: arg.issueBook,
    authorBook: arg.authorBook,
    quantityBook: arg.quantityBook,
    statusBook: arg.statusBook,
    codeBook: arg.codeBook,
    dateAddBook: arg.dateAddBook,
    imageBook: arg.imageBook,
  });
  return res.data;
});

export const getListBook = createAsyncThunk(
  "bookList/getList",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    const res = await customAxios.get(`/bookList.json?auth=${token}`);
    return res.data;
  }
);

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addListBook: (state, action) => {
      // const books = action.payload;
      // return { ...books };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListBook.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListBook.fulfilled, (state, action) => {
        const products = action.payload;
        state.loading = false;
        state.data = products;
      })
      .addCase(getListBook.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add product
      .addCase(addBook.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListBook } = bookSlice.actions;
export const selectListBook = (state) => state.bookReducer;
export default bookSlice.reducer;
