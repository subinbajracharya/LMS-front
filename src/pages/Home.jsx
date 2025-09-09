import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPublicBooksAction } from "../features/books/booksAction";
import { Col, Container, Row } from "react-bootstrap";
import HeroSlider from "../components/HeroSlider";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

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
      <Container className="p-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h2 className="mb-0">Published Books</h2>
          {/* <span className="text-muted">{pubBooks.length} items</span> */}
        </div>
        <Row>
          {pubBooks.map(
            ({ _id, title, author, publishedYear, genre, thumbnail }) => (
              <Col key={_id} xs={12} sm={6} md={4} lg={3} className="pb-3">
                <BookCard
                  id={_id}
                  title={title}
                  author={author}
                  year={publishedYear}
                  genre={genre}
                  thumbnail={thumbnail}
                />
              </Col>
            )
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;
