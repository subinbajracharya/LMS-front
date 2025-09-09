import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllBorrowsAction,
  returnBookAction,
} from "../features/borrow/borrowActions";

const Borrows = () => {
  const { borrowList } = useSelector((store) => store.borrowStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // Api call
    dispatch(fetchAllBorrowsAction());
  }, []);

  return (
    <div className="p-5">
      <h1>Borrows</h1>
      <p>Manage your borrows, add new ones, or update existing entries.</p>
      <hr />
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
            <th>Return Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowList.length === 0 ? (
            <tr>
              <td colSpan={6}>No borrows found.</td>
            </tr>
          ) : (
            borrowList.map((borrow, index) => {
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
                    {borrow.status === "borrowed" ? (
                      <Button
                        variant="success"
                        className="d-inline-flex justify-content-center me-2"
                        onClick={() => {
                          dispatch(returnBookAction(borrow._id));
                        }}
                      >
                        Return
                      </Button>
                    ) : borrow.status === "returned" ? (
                      <Button
                        variant="secondary"
                        className="d-inline-flex justify-content-center me-2"
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
    </div>
  );
};

export default Borrows;
