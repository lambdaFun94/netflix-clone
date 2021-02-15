import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import * as ROUTES from "../../constants/routes";
export const getFilms = createAsyncThunk("films/fetchFilmStatus", async () => {
  try {
    const { data } = await axios.get(ROUTES.BROWSE_ENDPOINT);
    return data;
  } catch (err) {
    return err;
  }
});

const filmSlice = createSlice({
  name: "films",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: {
    [getFilms.pending]: (state, action) => {
      state.status = "loading";
    },
    [getFilms.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
      state.error = null;
    },
    [getFilms.rejected]: (state, action) => {
      state.status = "failed";
      state.data = action.payload.data;
      state.error = action.payload.response.data.error;
    },
  },
});
console.log(filmSlice);

export default filmSlice.reducer;
