import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    borrowList: [],
};

const borrowSlice = createSlice({
    name: 'borrowList',
    initialState,
    reducers: {
        setBorrowList: (state, action) => {
            state.borrowList = action.payload;
        }
    }
});

const { reducer, actions } = borrowSlice;
export const { setBorrowList } = actions;
export default reducer;