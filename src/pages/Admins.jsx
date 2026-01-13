import React from "react";
import { Container } from "react-bootstrap";
import { MdAdminPanelSettings } from "react-icons/md";

const Admins = () => {
  return (
    <Container className="p-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <span className="rounded-circle bg-primary bg-opacity-10 p-3">
            <MdAdminPanelSettings size={28} className="text-primary" />
          </span>
          <div>
            <h2 className="mb-0">Admins</h2>
            <small className="text-muted">
              Manage your patrons and staff, update roles and access
            </small>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Admins;
