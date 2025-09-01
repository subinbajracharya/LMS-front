import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { borrowBookAction } from "../features/borrow/borrowActions";

const BookDetails = () => {
  const { pubBooks } = useSelector((store) => store.bookStore);
  const [book, setBook] = useState({});
  const { bookid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const selectedBook = pubBooks.find((b) => b._id === bookid);
    setBook(selectedBook || {});
  }, [pubBooks]);
  return (
    <Container className="p-5">
      <Row>
        <Col md={4}>
          <img src={book?.thumbnail} alt={book?.title} className="img-fluid" />
        </Col>
        <Col md={8}>
          <h2>{book?.title}</h2>
          <p>
            <b>
              {book?.author}&nbsp;|&nbsp;{book?.publishedYear}
            </b>
          </p>
          <p>{book?.genre}</p>
          <p>ISBN: {book?.isbn}</p>
          {book?.isAvailable ? (
            <Button
              variant="primary"
              onClick={() => {
                // Handle borrow book action
                dispatch(
                  borrowBookAction({
                    bookId: book?._id,
                    title: book?.title,
                    thumbnail: book?.thumbnail,
                  })
                );
              }}
            >
              Borrow Book
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              Expected date of return:{" "}
              {book?.expectedAvailable?.split("T")[0] || "N/A"}
            </Button>
          )}
        </Col>
      </Row>
      <hr />
      <Tabs
        defaultActiveKey="description"
        id="justify-tab-example"
        className="my-4"
        justify
      >
        <Tab eventKey="description" title="Description">
          {book?.description || "No description available."}
        </Tab>
        <Tab eventKey="reviews" title="Reviews">
          {book?.averageRating
            ? `Average Rating: ${book.averageRating}/5`
            : "No reviews available."}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default BookDetails;
