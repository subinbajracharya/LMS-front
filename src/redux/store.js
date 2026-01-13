import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice.js";
import bookReducer from "../features/books/bookSlice.js";
import borrowReducer from "../features/borrow/borrowSlice.js";
import reviewReducer from "../features/reviews/reviewSlice.js";

export default configureStore({
    reducer: {
        userStore: userReducer,
        bookStore: bookReducer,
        borrowStore: borrowReducer,
        reviewStore: reviewReducer,
    }
})