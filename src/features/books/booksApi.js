import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const getAllBooksApi = async (pubBook = false) => {
    return apiProcessor({
        method: "GET",
        url: pubBook ? `${apiUrl}/books/pub-books` : `${apiUrl}/books`,
        isPrivate: !pubBook,
    });
};

export const createBookApi = async (bookObj) => {
    return apiProcessor({
        method: "POST",
        url: `${apiUrl}/books`,
        isPrivate: true,
        data: bookObj,
        contentType: "multipart/form-data",
    });
};

export const updateBookApi = async ({ _id, ...bookObj }) => {
    return apiProcessor({
        method: "Put",
        url: `${apiUrl}/books/${_id}`,
        isPrivate: true,
        data: bookObj,
    });
};
