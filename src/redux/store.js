import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
    reducer: {
        userStore: userReducer,
    }
})