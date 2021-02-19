import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import * as ROUTES from "../../constants/routes";

export const getFilms = createAsyncThunk(
  "films/fetchFilmStatus",
  async (token) => {
    const options = {
      method: "GET",
      url: ROUTES.BROWSE_ENDPOINT,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await axios(options);
      return response.data;
    } catch (err) {
      return err;
    }
  }
);

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

export default filmSlice.reducer;
