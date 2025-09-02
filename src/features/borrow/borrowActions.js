import { fetchAllPublicBooksAction } from "../books/booksAction";
import { borrowBookApi, getAllBorrowsApi, returnBookApi } from "./borrowApi";
import { setBorrowList } from "./borrowSlice"


export const borrowBookAction = (borrowObj) => async (dispatch) => {
    try {
        const response = await borrowBookApi(borrowObj);
        dispatch(fetchAllPublicBooksAction());
    } catch (error) {
        throw error;
    }
};

export const fetchAllBorrowsAction = () => async (dispatch) => {
    let data = await getAllBorrowsApi();
    // console.log(100000, data)
    dispatch(setBorrowList(data?.borrows || []));
}

export const returnBookAction = (borrowId) => async (dispatch) => {
    try {
        const data = await returnBookApi(borrowId);

        if (data.status !== 'success') {
            dispatch(fetchAllBorrowsAction());
            dispatch(fetchAllPublicBooksAction());

        }
    } catch (error) {
        throw error;
    }
};