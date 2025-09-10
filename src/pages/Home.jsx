import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPublicBooksAction } from "../features/books/booksAction";
import { Col, Container, Row } from "react-bootstrap";
import HeroSlider from "../components/HeroSlider";
import { CarouselBooks } from "../components/CarouselBooks";

const Home = () => {
  const { pubBooks } = useSelector((store) => store.bookStore);
  const { borrowList } = useSelector((store) => store.borrowStore);
  const dispatch = useDispatch();

  useEffect(() => {
    // Api call
    dispatch(fetchAllPublicBooksAction());
  }, []);

  const JUST_IN_LIMIT = 8;
  const BEST_READ_LIMIT = 8;
  const RECOMMENDATION_LIMIT = 8;

  const justIn = [...pubBooks].reverse().slice(0, JUST_IN_LIMIT);

  const bestRead = [...pubBooks]
    .filter((b) => typeof b?.averageRating === "number")
    .sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0))
    .slice(0, BEST_READ_LIMIT);

  const genreCounts = borrowList.reduce((acc, it) => {
    const g = it.genre || it.bookGenre || it.book?.genre;
    if (g) acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});

  const topGenre = Object.entries(genreCounts).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0];

  const recommendations = topGenre
    ? pubBooks
        .filter((b) => b.genre === topGenre)
        .slice(0, RECOMMENDATION_LIMIT)
    : [...pubBooks]
        .sort(() => Math.random() - 0.5)
        .slice(0, RECOMMENDATION_LIMIT);

  return (
    <>
      <Container fluid className="mb-4">
        <Row>
          <HeroSlider />
        </Row>
      </Container>
      <Container className="p-5">
        {/* Just In Section */}
        <Row className="mb-3 mb-md-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="mb-0 pe-3 text-capitalize">just in!</h2>
            <div className="flex-grow-1 border-bottom"></div>
          </div>
          <CarouselBooks books={justIn} />
        </Row>

        {/* Best Read Section */}
        <Row className="mb-3 mb-md-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="mb-0 pe-3 text-capitalize">Best Read</h2>
            <div className="flex-grow-1 border-bottom"></div>
          </div>
          <CarouselBooks books={bestRead} />
        </Row>

        {/* Books Recommendation Section */}
        <Row className="mb-3 mb-md-5">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="mb-0 pe-3 text-capitalize">
              Recommendation for you
            </h2>
            <div className="flex-grow-1 border-bottom"></div>
          </div>
          <CarouselBooks books={recommendations} />
        </Row>
      </Container>
    </>
  );
};

export default Home;
