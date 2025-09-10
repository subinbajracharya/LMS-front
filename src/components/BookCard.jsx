import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BookCard({
  id,
  title,
  author,
  year,
  genre,
  thumbnail,
}) {
  return (
    <Card
      className="card-neo d-flex flex-column h-100 border-1 rounded-3 overflow-hidden p-2"
      style={{ minHeight: "360px" }}
    >
      <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          src={thumbnail}
          alt={title}
          className="w-100 h-100 object-fit-cover rounded"
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5" className="mb-1">
          <Link
            to={`/book-details/${id}`}
            className="text-decoration-none link-dark"
            title={title}
            aria-label={title}
          >
            {title}
          </Link>
        </Card.Title>

        <div className="text-muted small mb-3">
          {author || "Unknown"} {year ? <>· {year}</> : null}
        </div>

        <div className="mt-auto d-grid">
          <Button
            as={Link}
            to={`/book-details/${id}`}
            variant="primary"
            className="neo-btn"
          >
            View details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
