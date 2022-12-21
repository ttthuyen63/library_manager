import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const addBorrow = createAsyncThunk(
  "/addBorrow",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.post(`/bookList.json?auth=${token}`, {
    const res = await customAxios.post(`/borrowList`, {
      codeBookBorrow: arg.codeBookBorrow,
      codeReaderBorrow: arg.codeReaderBorrow,
      quantityBorrow: arg.quantityBorrow,
      statusBorrow: arg.statusBorrow,
      descriptionBorrow: arg.descriptionBorrow,
      dateAddBorrow: arg.dateAddBorrow,
      dateEndBorrow: arg.dateEndBorrow,
    });
    return res.data;
  }
);

export const getListBorrow = createAsyncThunk(
  "borrowList/getList",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    const res = await customAxios.get(`/borrowList.json?auth=${token}`);
    return res.data;
  }
);

const borrowSlice = createSlice({
  name: "borrow",
  initialState,
  reducers: {
    addListBorrow: (state, action) => {
      // const books = action.payload;
      // return { ...books };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListBorrow.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListBorrow.fulfilled, (state, action) => {
        const products = action.payload;
        state.loading = false;
        state.data = products;
      })
      .addCase(getListBorrow.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add product
      .addCase(addBorrow.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addBorrow.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addBorrow.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListBorrow } = borrowSlice.actions;
export const selectListBorrow = (state) => state.borrowReducer;
export default borrowSlice.reducer;
