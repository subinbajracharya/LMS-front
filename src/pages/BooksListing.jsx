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
  Pagination,
} from "react-bootstrap";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BookCard from "../components/BookCard";

const BooksListing = () => {
  const { pubBooks } = useSelector((store) => store.bookStore);
  const dispatch = useDispatch();

  // URL params for pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Math.max(1, Number(searchParams.get("page")) || 1);

  // Optional: allow page size from URL (?limit=12). Defaults to 12.
  const PAGE_SIZE = Math.max(1, Number(searchParams.get("limit")) || 12);

  // Simple UI states
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  // Fetch books on first load
  useEffect(() => {
    dispatch(fetchAllPublicBooksAction());
  }, [dispatch]);

  // 1) Filter (search) locally
  let list = pubBooks.slice();
  if (search.trim()) {
    const q = search.toLowerCase();
    list = list.filter((b) =>
      [b.title, b.author, b.genre, String(b.publishedYear || "")]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }

  // 2) Compute pagination details from filtered list
  const totalPages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));

  // If URL page exceeds total pages (e.g., after narrowing search), clamp to 1
  useEffect(() => {
    if (pageFromUrl > totalPages) {
      const p = new URLSearchParams(searchParams.toString());
      p.set("page", "1");
      setSearchParams(p, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  // (Optional nice UX): when the search box changes, reset to page 1
  useEffect(() => {
    const p = new URLSearchParams(searchParams.toString());
    if ((Number(p.get("page")) || 1) !== 1) {
      p.set("page", "1");
      setSearchParams(p, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // 3) Slice the list for the current page
  const start = (pageFromUrl - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const pagedList = list.slice(start, end);

  const goToPageLink = (n) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set("page", String(n));
    return `?${p.toString()}`;
  };

  // Numbered pagination items
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          as={Link}
          to={goToPageLink(number)}
          active={number === pageFromUrl}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-4">
        <Pagination.First
          as={Link}
          to={goToPageLink(1)}
          disabled={pageFromUrl === 1}
        />
        <Pagination.Prev
          as={Link}
          to={goToPageLink(Math.max(1, pageFromUrl - 1))}
          disabled={pageFromUrl === 1}
        />
        {items}
        <Pagination.Next
          as={Link}
          to={goToPageLink(Math.min(totalPages, pageFromUrl + 1))}
          disabled={pageFromUrl === totalPages}
        />
        <Pagination.Last
          as={Link}
          to={goToPageLink(totalPages)}
          disabled={pageFromUrl === totalPages}
        />
      </Pagination>
    );
  };

  const Cover = ({ title, thumbnail }) => {
    if (!thumbnail) return null;
    return (
      <img
        src={thumbnail}
        alt={title}
        className="w-100 h-100 object-fit-cover"
      />
    );
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
            {list.length} books found · page {pageFromUrl} of {totalPages}
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

      {/* View Toggle */}
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
        (pagedList.length ? (
          <>
            <Row className="g-3">
              {pagedList.map(
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
            {renderPagination()}
          </>
        ) : (
          <div className="text-center py-5">
            <h5 className="mb-2">No books found</h5>
            <p className="text-muted mb-3">
              Try a different search or reset your filters
            </p>
            <Button onClick={() => setSearch("")} variant="primary">
              Reset filters
            </Button>
          </div>
        ))}

      {/* List view */}
      {view === "list" && (
        <>
          <div className="vstack gap-2">
            {pagedList.map(
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
            {!pagedList.length && (
              <div className="text-center py-5">
                <h5 className="mb-2">No books found</h5>
                <Button onClick={() => setSearch("")} variant="primary">
                  Reset filters
                </Button>
              </div>
            )}
          </div>
          {renderPagination()}
        </>
      )}
    </Container>
  );
};

export default BooksListing;
