// src/pages/BookDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Nav,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { borrowBookAction } from "../features/borrow/borrowActions";
import { toast } from "react-toastify";
import { fetchAllPublicBooksAction } from "../features/books/booksAction";

const BookDetails = () => {
  const { user } = useSelector((store) => store.userStore);
  const { pubBooks } = useSelector((store) => store.bookStore);
  const [book, setBook] = useState(null);
  const { bookid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const selectedBook = pubBooks.find((b) => b._id === bookid);
    setBook(selectedBook || null);
    window.scrollTo(0, 0);
  }, [pubBooks, bookid]);

  useEffect(() => {
    if (!pubBooks || pubBooks.length === 0) {
      dispatch(fetchAllPublicBooksAction());
    }
  }, [dispatch, pubBooks]);

  const RatingStars = ({ value = 0 }) => {
    const n = Math.round(Number(value) || 0);
    return (
      <span className="neo-stars" aria-label={`Rating ${n} out of 5`}>
        {"★".repeat(n)}
        {"☆".repeat(5 - n)}
      </span>
    );
  };

  if (!book) {
    return (
      <Container className="py-5">
        <Card className="border-0 shadow-sm p-5 text-center overflow-hidden">
          <h4 className="mb-2">Book not found</h4>
          <p className="text-muted mb-4">
            It may have been removed or is unavailable.
          </p>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </Card>
      </Container>
    );
  }

  const {
    _id,
    title,
    author,
    publishedYear,
    genre,
    thumbnail,
    isbn,
    isAvailable,
    expectedAvailable,
    description,
    averageRating,
  } = book;

  return (
    <Container className="py-4">
      {/* Top breadcrumb / back */}
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Nav className="me-auto" variant="pills">
          <Nav.Item>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate(-1)}
            >
              ← Back
            </Button>
          </Nav.Item>
        </Nav>
      </div>

      <Row className="g-4">
        {/* Cover */}
        <Col xs={12} md={5} lg={4}>
          <Card className="border-0 shadow-sm neo-rounded">
            <img
              src={thumbnail}
              alt={title}
              className="w-100 h-100 object-fit-cover"
            />
            <Card.Body>
              <div className="d-flex align-items-center gap-2 mb-2">
                {genre && (
                  <Badge bg="secondary" className="text-uppercase">
                    {genre}
                  </Badge>
                )}
                {publishedYear && (
                  <Badge bg="light" text="dark">
                    {publishedYear}
                  </Badge>
                )}
              </div>

              {typeof averageRating !== "undefined" &&
                averageRating !== null && (
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <RatingStars value={averageRating} />
                    <small className="text-muted">
                      {Number(averageRating).toFixed(1)}/5
                    </small>
                  </div>
                )}

              <ListGroup variant="flush" className="neo-list">
                {isbn && (
                  <ListGroup.Item className="px-0">
                    <span className="text-muted">ISBN</span>
                    <div className="fw-semibold">{isbn}</div>
                  </ListGroup.Item>
                )}
                {author && (
                  <ListGroup.Item className="px-0">
                    <span className="text-muted">Author</span>
                    <div className="fw-semibold">{author}</div>
                  </ListGroup.Item>
                )}
                {publishedYear && (
                  <ListGroup.Item className="px-0">
                    <span className="text-muted">Published</span>
                    <div className="fw-semibold">{publishedYear}</div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Details */}
        <Col xs={12} md={7} lg={8}>
          <Card className="border-0 shadow-sm neo-rounded">
            <Card.Body className="p-4">
              {/* Availability banner */}
              <div
                className={`neo-banner mb-3 ${
                  isAvailable
                    ? "neo-banner--available"
                    : "neo-banner--unavailable"
                }`}
              >
                {isAvailable ? (
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <span className="fw-semibold">Available now</span>
                    <Button
                      variant="primary"
                      onClick={async () => {
                        if (!user?._id) {
                          toast.info("Please log in to borrow book");
                          navigate("/login", {
                            state: { from: location },
                          });
                          return;
                        }

                        await dispatch(
                          borrowBookAction({
                            bookId: _id,
                            title,
                            thumbnail,
                          })
                        );
                      }}
                    >
                      Borrow Book
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <span>
                      <span className="fw-semibold">Book borrowed.</span> Please
                      return book by:{" "}
                      <span className="fw-semibold">
                        {book?.expectedAvailable?.split("T")[0] || "N/A"}
                      </span>
                    </span>
                    <Button variant="outline-secondary" disabled>
                      Not Available
                    </Button>
                  </div>
                )}
              </div>

              <h2 className="mb-1">{title}</h2>
              <div className="text-muted mb-3">
                {author || "Unknown"}{" "}
                {publishedYear ? <>· {publishedYear}</> : null}
              </div>

              <Tabs defaultActiveKey="description" className="neo-tabs mb-3">
                <Tab eventKey="description" title="Description">
                  <div className="pt-3">
                    {description ? (
                      <p className="mb-0 lh-lg">{description}</p>
                    ) : (
                      <p className="text-muted mb-0">
                        No description available.
                      </p>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="reviews" title="Reviews">
                  <div className="pt-3">
                    {typeof averageRating !== "undefined" &&
                    averageRating !== null ? (
                      <div className="d-flex align-items-center gap-2">
                        <RatingStars value={averageRating} />
                        <span className="fw-semibold">
                          {Number(averageRating).toFixed(1)}/5
                        </span>
                        <span className="text-muted">
                          based on library reviews
                        </span>
                      </div>
                    ) : (
                      <p className="text-muted mb-0">No reviews available.</p>
                    )}
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;
