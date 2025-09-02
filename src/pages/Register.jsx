import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="register-page bg-register">
      <Container>
        <Row className="py-5">
          <Col md={6} className="text-white d-flex align-items-center">
            <h2>Join the Library Management System</h2>
            <p>
              Create your account to discover new reads, reserve instantly, and
              keep your library life organized without extra effort.
            </p>
          </Col>
          <Col md={6}>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
