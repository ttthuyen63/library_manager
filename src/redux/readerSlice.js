import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../config/api";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const addReader = createAsyncThunk(
  "/addReader",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    // const res = await customAxios.post(`/bookList.json?auth=${token}`, {
    const res = await customAxios.post(`/readerList`, {
      nameReader: arg.nameReader,
      codeReader: arg.codeReader,
      genderReader: arg.genderReader,
      birthReader: arg.birthReader,
      addressReader: arg.addressReader,
      phoneReader: arg.phoneReader,
      statusReader: arg.statusReader,
      dateAddReader: arg.dateAddReader,
      dateEndReader: arg.dateEndReader,
    });
    return res.data;
  }
);

export const getListReader = createAsyncThunk(
  "readerList/getList",
  async (arg, thunkApi) => {
    const token = thunkApi.getState().userReducer.token;
    const res = await customAxios.get(`/readerList.json?auth=${token}`);
    return res.data;
  }
);

const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {
    addListReader: (state, action) => {
      // const books = action.payload;
      // return { ...books };
    },
  },
  extraReducers: (builder) => {
    builder

      //getList
      .addCase(getListReader.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getListReader.fulfilled, (state, action) => {
        const readers = action.payload;
        state.loading = false;
        state.data = readers;
      })
      .addCase(getListReader.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })

      //add product
      .addCase(addReader.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addReader.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addReader.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { addListReader } = readerSlice.actions;
export const selectListReader = (state) => state.readerReducer;
export default readerSlice.reducer;
