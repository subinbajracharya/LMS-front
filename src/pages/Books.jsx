import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { MdMenuBook, MdLibraryAdd } from "react-icons/md";
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
    <Container fluid className="p-4 p-md-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <MdMenuBook size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Books</h2>
            <small className="text-muted">
              Manage your books, add new ones, or update existing entries.{" "}
            </small>
          </div>
        </div>
      </div>
      <Link
        to="/books/add-books"
        className="btn btn-primary d-inline-flex align-items-center add-book-btn"
      >
        <MdLibraryAdd className="me-1" />
        Add a Book
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
            <th>Active</th>
            <th>Availability</th>
            <th>Return On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {booksList.length === 0 ? (
            <tr>
              <td colSpan={7}>No books found.</td>
            </tr>
          ) : (
            [...booksList]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((book, index) => {
                return (
                  <tr key={book._id}>
                    {/* <td>
                  <Form.Check type="checkbox" value={book.id} />
                </td> */}
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/book-details/${book._id}`}>
                        <img
                          src={
                            book.thumbnail.startsWith("http")
                              ? book.thumbnail
                              : `${import.meta?.env?.VITE_APP_API_URL}/${
                                  book.thumbnail || ""
                                }`
                          }
                          alt={book.title}
                          width={80}
                        />
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/book-details/${book._id}`}
                        className="text-decoration-none link-dark"
                      >
                        {book.title}
                      </Link>
                    </td>
                    <td>
                      <Form.Check
                        type="switch"
                        id="{`status-${book._id}`}"
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
                          let selectedBook = books.find(
                            (b) => b._id === book._id
                          );
                          dispatch(deleteBookAction(selectedBook._id));
                        }}
                      >
                        <RiDeleteBin5Line />
                      </Button>
                      <Button
                        variant="warning"
                        className="d-inline-flex justify-content-center"
                        onClick={() => {
                          let selectedBook = books.find(
                            (b) => b._id === book._id
                          );
                          dispatch(setSelectedBooks(selectedBook));
                          navigate("/books/edit-book", { state: book });
                        }}
                      >
                        <RiEdit2Line />
                      </Button>
                    </td>
                  </tr>
                );
              })
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Books;
