import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteBookAction,
  fetchAllBooksAction,
  updateBookAction,
} from "../features/books/booksAction";
import { Form } from "react-bootstrap";
import { setSelectedBooks } from "../features/books/bookSlice";

const Books = () => {
  const { books } = useSelector((store) => store.bookStore);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [booksList, setBooksList] = useState([]);

  useEffect(() => {
    // Api call
    dispatch(fetchAllBooksAction());
  }, []);

  useEffect(() => {
    setBooksList(books);
  }, [books]);

  return (
    <div className="p-5">
      <h1>Books</h1>
      <p>Manage your books, add new ones, or update existing entries.</p>
      <hr />
      <Link
        to="/books/add-books"
        className="btn btn-success d-inline-flex align-items-center add-book-btn"
      >
        <MdLibraryAdd className="me-1" />
        Add Book
      </Link>
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
            <th>Availability</th>
            <th>Expected Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {booksList.map((book, index) => {
            return (
              <tr key={book._id}>
                {/* <td>
                  <Form.Check type="checkbox" value={book.id} />
                </td> */}
                <td>{index + 1}</td>
                <td>
                  <img
                    src={
                      book.thumbnail.includes("http")
                        ? book.thumbnail
                        : import.meta.env.VITE_APP_API_URL +
                          "/" +
                          book.thumbnail
                    }
                    width={80}
                  />
                </td>
                <td>{book.title}</td>
                <td>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    // label={book.status}
                    value={book.status}
                    checked={book.status === "active" ? true : false}
                    onChange={(e) => {
                      dispatch(
                        updateBookAction({
                          _id: book._id,
                          status: e.target.checked ? "active" : "inactive",
                        })
                      );
                    }}
                  />
                </td>
                <td>{book.isAvailable ? "Available" : "Not Available"}</td>
                <td>{book.expectedAvailable?.split("T")[0]}</td>
                <td>
                  <Button
                    variant="danger"
                    className="d-inline-flex justify-content-center me-2"
                    onClick={() => {
                      let selectedBook = books.find((b) => b._id === book._id);
                      dispatch(deleteBookAction(selectedBook._id));
                    }}
                  >
                    <RiDeleteBin5Line />
                  </Button>
                  <Button
                    variant="warning"
                    className="d-inline-flex justify-content-center"
                    onClick={() => {
                      let selectedBook = books.find((b) => b._id === book._id);
                      dispatch(setSelectedBooks(selectedBook));
                      navigate("/books/edit-book", { state: book });
                    }}
                  >
                    <RiEdit2Line />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Books;
