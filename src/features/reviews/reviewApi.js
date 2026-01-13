import { apiProcessor } from "../../utils/axiosHelper";
const apiUrl = import.meta.env.VITE_APP_API_URL + "/api/v1";

export const fetchReviewApi = async (pubReview = false) => {
    return await apiProcessor({
        method: "get",
        url: pubReview ? `${apiUrl}/reviews/public-reviews` : `${apiUrl}/reviews`,
        isPrivate: !pubReview,
    })
}

export const createReviewApi = async (reviewData) => {
    return await apiProcessor({
        method: "post",
        url: `${apiUrl}/reviews`,
        isPrivate: true,
        data: reviewData,
    })
}
