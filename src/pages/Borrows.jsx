import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaBook } from "react-icons/fa6";
import {
  fetchAllBorrowsAction,
  returnBookAction,
} from "../features/borrow/borrowActions";
import { CustomModal } from "../components/CustomModal";
import ReviewForm from "../components/forms/ReviewForm";

const Borrows = () => {
  const { borrowList } = useSelector((store) => store.borrowStore);
  const [borrow, setBorrow] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // Api call
    dispatch(fetchAllBorrowsAction());
  }, []);

  return (
    <Container fluid className="p-4 p-md-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <FaBook size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Borrowings</h2>
            <small className="text-muted">
              Manage your borrows, add new ones, or update existing entries.
            </small>
          </div>
        </div>
      </div>
      <Table hover variant="light" className="text-center mt-3">
        <thead>
          <tr>
            {/* <th>
              <Form.Check type="checkbox" value="all" />
            </th> */}
            <th>#</th>
            <th>Thumbnail</th>
            <th>Book Title</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Returned On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowList.length === 0 ? (
            <tr>
              <td colSpan={6}>No borrows found.</td>
            </tr>
          ) : (
            [...borrowList]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((borrow, index) => {
                return (
                  <tr key={borrow._id}>
                    {/* <td>
                    <Form.Check type="checkbox" value={book.id} />
                  </td> */}
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={
                          borrow.thumbnail.includes("http")
                            ? borrow.thumbnail
                            : import.meta.env.VITE_APP_API_URL +
                              "/" +
                              borrow.thumbnail
                        }
                        width={80}
                      />
                    </td>
                    <td>{borrow.bookTitle}</td>
                    <td>
                      {borrow.status === "borrowed" ? (
                        <span className="badge bg-warning text-dark text-capitalize">
                          {borrow.status}
                        </span>
                      ) : (
                        <span className="badge bg-success text-capitalize">
                          {borrow.status}
                        </span>
                      )}
                    </td>
                    <td>{borrow.dueDate?.split("T")[0] || "N/A"}</td>
                    <td>
                      {borrow.status === "returned" && borrow.returnDate
                        ? borrow.returnDate.split("T")[0]
                        : "Awaiting return"}
                    </td>
                    <td>
                      {borrow.status === "borrowed" ? (
                        <Button
                          variant="outline-success"
                          className="d-inline-flex justify-content-center me-2"
                          onClick={async () => {
                            await dispatch(returnBookAction(borrow._id));
                            dispatch(fetchAllBorrowsAction());
                          }}
                        >
                          Return
                        </Button>
                      ) : borrow.status === "returned" ? (
                        <Button
                          variant="secondary"
                          className="d-inline-flex justify-content-center me-2"
                          onClick={() => setBorrow(borrow)}
                        >
                          Review
                        </Button>
                      ) : (
                        "Reviewed"
                      )}
                    </td>
                  </tr>
                );
              })
          )}
        </tbody>
      </Table>
      {/* Rating Modal */}
      {borrow?._id && (
        <CustomModal title="Leave your review" onHide={setBorrow}>
          <ReviewForm borrow={borrow} setBorrow={setBorrow} />
        </CustomModal>
      )}
    </Container>
  );
};

export default Borrows;
