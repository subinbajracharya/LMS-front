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
  const initials =
    (title || "")
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "BK";

  return (
    <Card className="card-neo h-100 border-0 rounded-3 overflow-hidden p-2">
      <div className="card-neo__media position-relative">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-100 h-100 object-fit-cover"
          />
        ) : (
          <div className="cover-ph-neo rounded-top d-flex align-items-center justify-content-center">
            <div className="cover-chip-neo">{initials}</div>
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5" className="mb-1" title={title} aria-label={title}>
          {title}
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
