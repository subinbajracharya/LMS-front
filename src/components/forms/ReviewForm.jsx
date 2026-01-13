import React, { useState } from "react";
import useForm from "../../hooks/useForm";
import { Form } from "react-bootstrap";
import CustomInput from "../forms/CustomInput";
import { addReviewActions } from "../../features/reviews/reviewActions";
import { useDispatch } from "react-redux";

export const ReviewForm = ({ borrowList, setBorrowList }) => {
  const { form, handleOnChange } = useForm({});
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const { _id, userId, bookId, bookTitle, thumbnail } = borrowList;
    const review = {
      ...form,
      rating,
      userId,
      bookId,
      bookTitle,
      thumbnail,
      borrowId: _id,
    };

    if (window.confirm("Are you sure you want to submit this review?")) {
      const action = await dispatch(addReviewActions(review));
      action && setBorrow({ ...borrowList, isReviewed: true });
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <CustomInput
        id="review"
        label="Review"
        type="text"
        name="review"
        placeholder="Write your review"
        value={form.review || ""}
        onChange={handleOnChange}
      />

      <div className="mb-3">
        <label htmlFor="rating" className="form-label">
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          className="form-select"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={0}>Select rating</option>
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Fair</option>
          <option value={3}>3 - Good</option>
          <option value={4}>4 - Very Good</option>
          <option value={5}>5 - Excellent</option>
        </select>
        {new Array(5).fill(0).map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? "filled" : ""}`}
            onClick={() => setRating(index + 1)}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              color: index < rating ? "#ffc107" : "#e4e5e9",
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
      <CustomInput
        as="textarea"
        rows={3}
        id="additionalComments"
        label="Additional Comments"
        type="text"
        name="additionalComments"
        placeholder="Any additional comments"
        value={form.additionalComments || ""}
        onChange={handleOnChange}
      />

      <button type="submit" className="btn btn-primary">
        Submit Review
      </button>
    </Form>
  );
};

export default ReviewForm;
