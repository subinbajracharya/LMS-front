import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    pubBooks: [],
    selectedBook: {},
};

const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        setBooks: (state, actions) => {
            state.books = actions.payload;
        },
        setPubBooks: (state, actions) => {
            state.pubBooks = actions.payload;
        },
        setSelectedBooks: (state, actions) => {
            state.selectedBook = actions.payload;
        },
    },
});

const { reducer, actions } = bookSlice;

export const { setBooks, setSelectedBooks, setPubBooks } = actions;
export default reducer;
