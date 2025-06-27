import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import commentsReducer from "./commentsSlice";

const store = configureStore({
  reducer: {
    products: productsReducer,
    comments: commentsReducer,
  },
});

export default store;
