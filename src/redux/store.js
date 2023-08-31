import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/authLogin";

const store = configureStore({
  reducer: {
    posts: postReducer,
    authLogin: authReducer,
  },
});

export default store;
