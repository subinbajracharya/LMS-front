// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Badge,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  ProgressBar,
  Row,
} from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { fetchAllBorrowsAction } from "../features/borrow/borrowActions";
import { fetchAllPublicBooksAction } from "../features/books/booksAction";

const getInitials = (name = "") =>
  name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

const Profile = () => {
  const { user } = useSelector((store) => store.userStore);
  const { borrowList } = useSelector((store) => store.borrowStore);
  const { pubBooks } = useSelector((store) => store.bookStore);
  const dispatch = useDispatch();

  const name = user.fName;
  const email = user.email;
  const role = user.role;
  const phone = user.phone;
  const memberSince = user.createdAt?.split?.("T")?.[0];
  const fullName = [user.fName, user.lName].join(" ");

  const active = borrowList.filter((b) => b.status === "borrowed");
  const returned = borrowList.filter((b) => b.status === "returned");
  const overdue = active.filter((b) =>
    b.dueDate ? new Date(b.dueDate) < new Date() : false
  );
  const completion =
    borrowList.length === 0
      ? 0
      : Math.round((returned.length / borrowList.length) * 100);

  const recentActivity = borrowList.slice().reverse().slice(0, 5);

  useEffect(() => {
    dispatch(fetchAllBorrowsAction());
    dispatch(fetchAllPublicBooksAction());
  }, []);

  return (
    <Container fluid className="p-4 p-md-5">
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <CgProfile size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Profile</h2>
            <small className="text-muted">
              Manage your account, preferences, and activity
            </small>
          </div>
        </div>
      </div>

      <Row className="g-4">
        {/* Left column */}
        <Col xs={12} lg={4}>
          {/* Identity card */}
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center gap-3">
                <span
                  className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center"
                  style={{ width: 72, height: 72, fontSize: 20 }}
                >
                  {getInitials(name)}
                </span>
                <div className="flex-grow-1">
                  <h4 className="mb-1 text-capitalize">{fullName}</h4>
                  <div className="text-muted small mb-1">{email}</div>
                  <Badge bg="light" text="dark" className="text-uppercase">
                    {role}
                  </Badge>
                </div>
              </div>

              <hr className="my-4" />

              <ListGroup variant="flush">
                <ListGroup.Item className="px-0 d-flex justify-content-between">
                  <span className="text-muted">Member since</span>
                  <span className="fw-semibold">{memberSince}</span>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex justify-content-between">
                  <span className="text-muted">Active borrows</span>
                  <span className="fw-semibold">{active.length}</span>
                </ListGroup.Item>
                <ListGroup.Item className="px-0 d-flex justify-content-between">
                  <span className="text-muted">Overdue</span>
                  <span className="fw-semibold">{overdue.length}</span>
                </ListGroup.Item>
                <ListGroup.Item className="px-0">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-muted">Return completion</span>
                    <span className="fw-semibold">{completion}%</span>
                  </div>
                  <ProgressBar className="mt-2" now={completion} />
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Right column */}
        <Col xs={12} lg={8}>
          {/* Account details */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>Account details</strong>
              {/* <Button size="sm" variant="outline-primary">
                Edit
              </Button> */}
            </Card.Header>
            <Card.Body>
              <Row className="g-3">
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted">Full name</Form.Label>
                    <Form.Control
                      className="text-capitalize"
                      value={fullName}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted">Email</Form.Label>
                    <Form.Control value={email} readOnly />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted">Role</Form.Label>
                    <Form.Control
                      className="text-capitalize"
                      value={role}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="text-muted">Phone</Form.Label>
                    <Form.Control value={phone} readOnly />
                  </Form.Group>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Recent activity */}
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white border-0 d-flex align-items-center justify-content-between">
              <strong>Recent activity</strong>
              <Badge bg="light" text="dark">
                {recentActivity.length}
              </Badge>
            </Card.Header>
            <ListGroup variant="flush">
              {recentActivity.length === 0 ? (
                <ListGroup.Item className="text-muted">
                  No recent activity
                </ListGroup.Item>
              ) : (
                recentActivity.map((it) => (
                  <ListGroup.Item
                    key={it._id}
                    className="d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <img
                        alt={it.bookTitle}
                        src={
                          it.thumbnail?.includes?.("http")
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
                          {it.status === "borrowed" ? (
                            <span className="badge bg-warning text-dark text-capitalize">
                              {it.status}
                            </span>
                          ) : (
                            <span className="badge bg-success text-capitalize">
                              {it.status}
                            </span>
                          )}
                        </small>
                      </div>
                    </div>
                    <small className="text-muted">
                      {it.dueDate?.split?.("T")?.[0] ||
                        it.createdAt?.split?.("T")?.[0] ||
                        ""}
                    </small>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
