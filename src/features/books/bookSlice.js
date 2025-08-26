import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    books: [],
    pubBooks: [
        {
            _id: {
                $oid: "674aa63a248fa97bd0694360",
            },
            status: "active",
            title: "Algorithms Unleashed TEST",
            author: "Algo Expert",
            isbn: "78901234",
            publishedYear: 2012,
            thumbnail:
                "https://images.pexels.com/photos/36487/above-adventure-aerial-air.jpg",
            description: "A deep dive into algorithms and problem solving",
            isAvailable: false,
            expectedAvailable: {
                $date: "2025-04-01T22:46:18.957Z",
            },
            createdAt: "2024-11-30T06:50:00.000Z",
            updatedAt: {
                $date: "2025-08-19T05:03:32.614Z",
            },
            __v: 0,
            averageRating: 0,
            genre: "test",
        },
    ],
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
