import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import filmReducer from "../slices/filmSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    films: filmReducer,
  },
});
