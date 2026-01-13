import { createReviewApi, fetchReviewApi } from "./reviewApi";
import { toast } from "react-toastify";
import { setPublicReviews } from "./reviewSlice";

export const fetchPublicReviewActions = () => async (dispatch) => {
    let data = await fetchReviewApi(true);
    dispatch(setPublicReviews(data.reviews));
}

export const addReviewActions = (review) => async (dispatch) => {
    const pendingToast = createReviewApi(review);
    toast.promise(
        pendingToast,
        {
            loading: "Creating review...",
            success: "Review created successfully",
            error: "Error creating review",
        }
    );

    const { status, message } = await pendingToast;

    toast[status](message)

    if (status === "success") {
        return true;
    }
}