import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPublicBooksAction } from "../features/books/booksAction";
import { Container, Row } from "react-bootstrap";
import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";

const Home = () => {
  const { pubBooks } = useSelector((store) => store.bookStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // Api call
    dispatch(fetchAllPublicBooksAction());
  }, []);

  return (
    <>
      <Container fluid className="mb-4">
        <Row>
          <HeroSlider />
        </Row>
      </Container>
      <div className="p-5">
        <h2>Published Books</h2>
        <div className="d-flex flex-wrap">
          {pubBooks.map((book) => (
            <div key={book._id} className="card m-2" style={{ width: "18rem" }}>
              <img
                src={book.thumbnail}
                className="card-img-top"
                alt={book.title}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Genre: {book.genre}</p>
                <p className="card-text">
                  Status: {book.isAvailable ? "Available" : "Not Available"}
                </p>
                <Link
                  to={`/book-details/${book._id}`}
                  className="btn btn-primary"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
