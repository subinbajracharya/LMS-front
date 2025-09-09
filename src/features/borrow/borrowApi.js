import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";
console.log(apiUrl)

export const borrowBookApi = async (borrowObj) => {
    return apiProcessor({
        method: 'POST',
        url: `${apiUrl}/borrow`,
        data: borrowObj,
        isPrivate: true
    });
}

export const returnBookApi = async (borrowId) => {
    return apiProcessor({
        method: 'PUT',
        url: `${apiUrl}/borrow/return/${borrowId}`,
        isPrivate: true
    });
}

export const getAllBorrowsApi = async () => {
    return apiProcessor({
        method: 'GET',
        url: `${apiUrl}/borrow`,
        isPrivate: true
    });
}