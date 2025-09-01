import { toast } from "react-toastify";
import { createBookApi, deleteBookApi, getAllBooksApi, updateBookApi } from "./booksApi.js";
import { setBooks, setPubBooks } from "./bookSlice.js";

export const fetchAllBooksAction = () => async (dispatch) => {
  let data = await getAllBooksApi();
  dispatch(setBooks(data?.books || []));
};

export const fetchAllPublicBooksAction = () => async (dispatch) => {
  let data = await getAllBooksApi(true);
  dispatch(setPubBooks(data?.books || []));
};

export const createBookAction = (formData) => async (dispatch) => {
  // call api create book
  let data = await createBookApi(formData);
  toast[data.status](data.message);
  if (data.status == "success") {
    // update bookstore
    dispatch(fetchAllBooksAction());
  }

  return { ...data };
};

export const updateBookAction = (form) => async (dispatch) => {
  // call api create book
  let data = await updateBookApi(form);
  toast[data.status](data.message);
  if (data.status == "success") {
    // update bookstore
    dispatch(fetchAllBooksAction());
  }

  return { ...data };
};

export const deleteBookAction = (_id) => async (dispatch) => {
  // call api delete book
  console.log(_id)
  let data = await deleteBookApi(_id);
  toast[data.status](data.message);
  if (data.status == "success") {
    // update bookstore
    dispatch(fetchAllBooksAction());
  }

  return { ...data };
}
