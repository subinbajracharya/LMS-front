import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice.js";
import bookReducer from "../features/books/bookSlice.js";

export default configureStore({
    reducer: {
        userStore: userReducer,
        bookStore: bookReducer,
    }
})