import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <div className="login-page bg-login">
      <Container className="d-flex flex-column justify-content-center h-100">
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
