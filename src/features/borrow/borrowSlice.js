import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    borrowList: [],
};

const borrowSlice = createSlice({
    name: 'borrow',
    initialState,
    reducers: {
        setBorrowList: (state, action) => {
            state.borrowList = action.payload;
        }
    }
});

const { actions, reducer } = borrowSlice;
export const { setBorrowList } = actions;
export default reducer;