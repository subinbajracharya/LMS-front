import React from "react";
import { Container, Row } from "react-bootstrap";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <Container>
      <Row className="py-5">
        <RegisterForm />
      </Row>
    </Container>
  );
};

export default Register;
