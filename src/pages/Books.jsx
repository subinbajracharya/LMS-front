import React from "react";
import { Button, Table } from "react-bootstrap";
import { RiDeleteBin5Line, RiEdit2Line } from "react-icons/ri";
import { MdLibraryAdd } from "react-icons/md";
import { Link } from "react-router-dom";

const Books = () => {
  const booksList = [
    // Sample data for books, to be replace with actual data from API or state management
    {
      id: 1,
      status: {
        available: true,
        borrowed: false,
        reserved: false,
      },
      title: "The Great Gatsby",
      borrowed_in: "2023-10-02",
      returned_on: "2023-10-15",
    },
    {
      id: 2,
      date: "2023-10-05",
      title: "1984",
      borrowed_in: "2023-10-06",
      returned_on: "2023-10-20",
    },
    {
      id: 3,
      date: "2023-10-10",
      title: "To Kill a Mockingbird",
      borrowed_in: "2023-10-11",
      returned_on: "2023-10-25",
    },
  ];
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
            <th>Book Title</th>
            <th>Status</th>
            <th>Borrowed In</th>
            <th>Returned On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {booksList.map((book, index) => {
            return (
              <tr key={book.id}>
                {/* <td>
                  <Form.Check type="checkbox" value={book.id} />
                </td> */}
                <td>{index + 1}</td>
                <td>{book.title}</td>
                <td>
                  {book.status
                    ? book.status.available
                      ? "Available"
                      : book.status.borrowed
                      ? "Borrowed"
                      : "Reserved"
                    : "N/A"}
                </td>
                <td>{book.borrowed_in}</td>
                <td>{book.returned_on}</td>
                <td>
                  <Button
                    variant="danger"
                    className="d-inline-flex justify-content-center me-2"
                  >
                    <RiDeleteBin5Line />
                  </Button>
                  <Button
                    variant="warning"
                    className="d-inline-flex justify-content-center"
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
