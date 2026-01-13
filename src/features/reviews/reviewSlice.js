import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    reviews: [],
    publicReviews: [],
};

const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
    },
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        setPublicReviews: (state, action) => {
            state.pubReviews = action.payload;
        },
        addReview: (state, action) => {
            state.reviews.push(action.payload);
        },
        clearReviews: (state) => {
            state.reviews = [];
        }
    }
});

const { reducer, actions } = reviewSlice;
export const { setReviews, setPublicReviews, addReview, clearReviews } = actions;
export default reducer;