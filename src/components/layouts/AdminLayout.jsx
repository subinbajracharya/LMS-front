import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Col, Container, Row } from "react-bootstrap";
import Auth from "../../auth/Auth";

const AdminLayout = () => {
  return (
    <Auth>
      <main className="dashboard-main">
        <Container fluid>
          <Row>
            <Col md={2} className="bg-dark text-white">
              <Sidebar />
            </Col>
            <Col md={10}>
              <Row>
                <Header />
                <Outlet />
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
      <Footer />
    </Auth>
  );
};

export default AdminLayout;
