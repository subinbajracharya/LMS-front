// src/pages/BooksListing.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPublicBooksAction } from "../features/books/booksAction";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  Form,
  InputGroup,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import BookCard from "../components/BookCard";

const BooksListing = () => {
  const dispatch = useDispatch();
  const { pubBooks } = useSelector((store) => store.bookStore);

  // Simple UI states (no useMemo)
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  // Fetch books on first load
  useEffect(() => {
    dispatch(fetchAllPublicBooksAction());
  }, [dispatch]);

  let list = pubBooks.slice();

  // search
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter((b) =>
      [b.title, b.author, b.genre, String(b.publishedYear || "")]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }

  const Cover = ({ title, thumbnail }) => {
    if (thumbnail) {
      return (
        <img
          src={thumbnail}
          alt={title}
          className="w-100 h-100 object-fit-cover"
        />
      );
    }
  };

  const CardActions = ({ id }) => (
    <div className="d-grid gap-2">
      <Button as={Link} to={`/book-details/${id}`} variant="primary" size="sm">
        View details
      </Button>
    </div>
  );

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <div>
          <h2 className="mb-0">Books Listing</h2>
          <small className="text-muted text-capitalize">
            {list.length} books found!
          </small>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <InputGroup>
            <InputGroup.Text className="bg-white">Search</InputGroup.Text>
            <Form.Control
              placeholder="Title, author, year, genre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <Button variant="outline-secondary" onClick={() => setSearch("")}>
                Clear
              </Button>
            )}
          </InputGroup>
        </div>
      </div>

      {/* Search + Genre */}
      <Row className="g-2 mb-3">
        <Col className="text-md-end">
          <ToggleButtonGroup
            type="radio"
            name="view"
            value={view}
            onChange={setView}
          >
            <ToggleButton
              id="view-grid"
              value="grid"
              variant={view === "grid" ? "primary" : "outline-secondary"}
              size="sm"
            >
              Grid
            </ToggleButton>
            <ToggleButton
              id="view-list"
              value="list"
              variant={view === "list" ? "primary" : "outline-secondary"}
              size="sm"
            >
              List
            </ToggleButton>
          </ToggleButtonGroup>
        </Col>
      </Row>

      {/* Grid view */}
      {view === "grid" &&
        (list.length ? (
          <Row className="g-3">
            {list.map(
              ({ _id, title, author, publishedYear, genre, thumbnail }) => (
                <Col key={_id} xs={12} sm={6} md={4} lg={3}>
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
        ) : (
          <div className="text-center py-5">
            <h5 className="mb-2">No books found</h5>
            <p className="text-muted mb-3">
              Try a different search or reset your filters
            </p>
            <Button
              onClick={() => {
                setSearch("");
              }}
              variant="primary"
            >
              Reset filters
            </Button>
          </div>
        ))}

      {/* List view */}
      {view === "list" && (
        <div className="vstack gap-2">
          {list.map(
            ({ _id, title, author, publishedYear, genre, thumbnail }) => (
              <Card key={_id} className="border-0 shadow-sm">
                <Card.Body className="d-flex align-items-center gap-3">
                  <div style={{ width: 84 }}>
                    <Cover title={title} thumbnail={thumbnail} />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                      <h5 className="mb-0">{title}</h5>
                      {genre && (
                        <Badge bg="secondary" className="text-uppercase">
                          {genre}
                        </Badge>
                      )}
                    </div>
                    <div className="text-muted small mt-1">
                      {author || "Unknown"}{" "}
                      {publishedYear ? <>· {publishedYear}</> : null}
                    </div>
                  </div>
                  <div style={{ width: 180 }}>
                    <CardActions id={_id} />
                  </div>
                </Card.Body>
              </Card>
            )
          )}
          {!list.length && (
            <div className="text-center py-5">
              <h5 className="mb-2">No books found</h5>
              <Button
                onClick={() => {
                  setSearch("");
                }}
                variant="primary"
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default BooksListing;
