import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postRequestToAPI from "../../utils/postToApi";
import * as ROUTES from "../../constants/routes";

export const signinUser = createAsyncThunk(
  "user/signin",
  postRequestToAPI(ROUTES.SIGNIN_ENDPOINT)
);
export const signupUser = createAsyncThunk(
  "user/signup",
  postRequestToAPI(ROUTES.SIGNUP_ENDPOINT)
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: JSON.parse(localStorage.getItem("userData")) || {},
    status: "idle",
    error: null,
  },
  reducers: {
    signOut(state, action) {
      state.data = {};
      localStorage.clear();
    },
  },
  extraReducers: {
    [signinUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signinUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
      localStorage.setItem("userData", JSON.stringify(action.payload.data));
      state.error = null;
    },
    [signinUser.rejected]: (state, action) => {
      state.status = "failed";
      state.data = action.payload.data;
      state.error = action.payload.response.data.error;
    },
    [signupUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [signupUser.fulfilled]: (state, action) => {
      state.status = "success";
      state.data = action.payload.data;
      localStorage.setItem("userData", JSON.stringify(action.payload.data));
      state.error = null;
    },
    [signupUser.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload.response.data.error;
      state.data = action.payload.data;
    },
  },
});

export const { signOut } = userSlice.actions;

export default userSlice.reducer;
