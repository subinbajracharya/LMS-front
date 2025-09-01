import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutAction } from "../../features/users/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userStore);
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container fluid>
        <Navbar.Brand href="/">LMS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {user?._id ? (
              <>
                <Nav.Link as={Link} to="dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="login"
                  onClick={() => {
                    dispatch(logoutAction());
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
