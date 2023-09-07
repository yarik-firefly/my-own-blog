import { configureStore } from "@reduxjs/toolkit";
import { postReducer } from "./slices/posts";
import { authReducer } from "./slices/authLogin";
import { commentsReducer } from "./slices/commentsSlice";

const store = configureStore({
  reducer: {
    posts: postReducer,
    authLogin: authReducer,
    comments: commentsReducer,
  },
});

export default store;
