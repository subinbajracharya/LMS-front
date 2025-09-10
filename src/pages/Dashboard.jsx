// src/pages/Dashboard.jsx
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ProgressBar,
  Row,
  Table,
} from "react-bootstrap";
import {
  MdTrendingUp,
  MdSchedule,
  MdReviews,
  MdHistory,
  MdDashboard,
} from "react-icons/md";
import { fetchAllBorrowsAction } from "../features/borrow/borrowActions";

const Dashboard = () => {
  const { borrowList = [] } = useSelector((store) => store.borrowStore);
  const { pubBooks = [] } = useSelector((store) => store.bookStore);
  const dispatch = useDispatch();

  // Simple derived metrics (replace with real selectors if you have them)
  const metrics = useMemo(() => {
    const active = borrowList.filter((b) => b.status === "borrowed");
    const returned = borrowList.filter((b) => b.status === "returned");
    const overdue = active.filter((b) => {
      const d = b.dueDate ? new Date(b.dueDate) : null;
      return d && d < new Date();
    });
    const reviewsPending = returned.filter((b) => !b.reviewed);

    const completion =
      borrowList.length === 0
        ? 0
        : Math.round((returned.length / borrowList.length) * 100);

    return {
      totalBorrows: borrowList.length,
      activeCount: active.length,
      overdueCount: overdue.length,
      reviewsPending: reviewsPending.length,
      completion,
      newest: [...pubBooks].reverse().slice(0, 4),
      recentActivity: [...borrowList].slice().reverse().slice(0, 5),
    };
  }, [borrowList, pubBooks]);

  useEffect(() => {
    dispatch(fetchAllBorrowsAction());
  }, []);

  return (
    <Container fluid className="p-4 p-md-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <MdDashboard size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">My Dashboard</h2>
            <small className="text-muted">
              Manage your borrows, reviews, and discover new reads
            </small>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <Row className="g-3 mb-4">
        <Col xs={12} md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <span className="text-muted">Active Borrows</span>
                <MdSchedule className="text-primary" size={22} />
              </div>
              <h3 className="mt-2 mb-1">{metrics.activeCount}</h3>
              <small className="text-muted">
                {metrics.overdueCount} overdue
              </small>
              <ProgressBar
                className="mt-3"
                now={Math.min(metrics.activeCount * 10, 100)}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <span className="text-muted">Total Borrows</span>
                <MdTrendingUp className="text-success" size={22} />
              </div>
              <h3 className="mt-2 mb-1">{metrics.totalBorrows}</h3>
              <small className="text-muted">All time</small>
              <ProgressBar
                className="mt-3"
                variant="success"
                now={Math.min(metrics.totalBorrows * 8, 100)}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <span className="text-muted">Reviews Pending</span>
                <MdReviews className="text-warning" size={22} />
              </div>
              <h3 className="mt-2 mb-1">{metrics.reviewsPending}</h3>
              <small className="text-muted">Help others choose</small>
              <ProgressBar
                className="mt-3"
                variant="warning"
                now={Math.min(metrics.reviewsPending * 20, 100)}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <span className="text-muted">Completion</span>
                <MdHistory className="text-info" size={22} />
              </div>
              <h3 className="mt-2 mb-1">{metrics.completion}%</h3>
              <small className="text-muted">Returned vs borrowed</small>
              <ProgressBar
                className="mt-3"
                variant="info"
                now={metrics.completion}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Left column: Activity + Newest */}
        <Col xs={12} lg={6}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>Recent Activity</strong>
              <Badge bg="light" text="dark">
                {metrics.recentActivity.length}
              </Badge>
            </Card.Header>
            <ListGroup variant="flush">
              {metrics.recentActivity.length === 0 ? (
                <ListGroup.Item className="text-muted">
                  No recent activity
                </ListGroup.Item>
              ) : (
                metrics.recentActivity.map((it) => (
                  <ListGroup.Item
                    key={it._id}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        alt={it.bookTitle}
                        src={
                          it.thumbnail?.includes("http")
                            ? it.thumbnail
                            : `${import.meta.env.VITE_APP_API_URL}/${
                                it.thumbnail
                              }`
                        }
                        width={44}
                        height={60}
                        className="rounded"
                        style={{ objectFit: "cover" }}
                      />
                      <div>
                        <div className="fw-semibold">{it.bookTitle}</div>
                        <small className="text-muted text-capitalize">
                          {it.status}
                        </small>
                      </div>
                    </div>
                    <small className="text-muted">
                      {it.dueDate?.split("T")[0] ||
                        it.createdAt?.split?.("T")?.[0] ||
                        ""}
                    </small>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0">
              <strong>Newest Arrivals</strong>
            </Card.Header>
            <ListGroup variant="flush">
              {metrics.newest.length === 0 ? (
                <ListGroup.Item className="text-muted">
                  No books yet
                </ListGroup.Item>
              ) : (
                metrics.newest.map((b) => (
                  <ListGroup.Item
                    key={b._id}
                    className="d-flex align-items-center gap-3"
                  >
                    <img
                      alt={b.title}
                      src={b.thumbnail}
                      width={44}
                      height={60}
                      className="rounded"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="flex-grow-1">
                      <div className="fw-semibold">{b.title}</div>
                      <small className="text-muted">
                        {b.author || "Unknown"}{" "}
                        {b.publishedYear ? `· ${b.publishedYear}` : ""}
                      </small>
                    </div>
                    <Badge bg="light" text="dark" className="text-uppercase">
                      {b.genre || "General"}
                    </Badge>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Col>

        {/* Right column: Table */}
        <Col xs={12} lg={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>My Borrows</strong>
              <Badge bg={metrics.overdueCount ? "danger" : "success"}>
                {metrics.overdueCount
                  ? `${metrics.overdueCount} overdue`
                  : "All good"}
              </Badge>
            </Card.Header>
            <div className="table-responsive">
              <Table hover className="mb-0 align-middle">
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th className="d-none d-sm-table-cell">Status</th>
                    <th>Due Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {borrowList
                    .slice()
                    .reverse()
                    .slice(0, 8)
                    .map((it) => (
                      <tr key={it._id}>
                        <td>
                          <div className="fw-semibold">{it.bookTitle}</div>
                          <small className="text-muted">
                            {it.bookAuthor || ""}
                          </small>
                        </td>
                        <td className="d-none d-sm-table-cell">
                          <Badge
                            bg={
                              it.status === "borrowed"
                                ? "warning"
                                : it.status === "returned"
                                ? "success"
                                : "secondary"
                            }
                            text={it.status === "borrowed" ? "dark" : "light"}
                            className="text-capitalize"
                          >
                            {it.status}
                          </Badge>
                        </td>
                        <td>{it.dueDate?.split("T")[0] || "—"}</td>
                        <td className="text-end">
                          {it.status === "borrowed" ? (
                            <Button size="sm" variant="outline-success">
                              Return
                            </Button>
                          ) : !it.reviewed ? (
                            <Button size="sm" variant="outline-secondary">
                              Review
                            </Button>
                          ) : (
                            <span className="text-muted small">Reviewed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  {borrowList.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center text-muted">
                        No borrows found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
