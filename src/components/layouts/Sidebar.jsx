import React from "react";
import {
  MdDashboard,
  MdMenuBook,
  MdAdminPanelSettings,
  MdRateReview,
} from "react-icons/md";
import { FaUsers, FaBook } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const Sidebar = () => {
  return (
    <div className="sidebar py-4 min-vh-100">
      <p>Logo here</p>
      <h4>Welcome, Subin!</h4>
      <hr />
      <ul>
        <li>
          <a href="/dashboard" className="d-block">
            <MdDashboard className="me-1" />
            Dashboard
          </a>
        </li>
        <li>
          <a href="/books" className="d-block">
            <MdMenuBook className="me-1" />
            Books
          </a>
        </li>
        <li>
          <a href="/users" className="d-block">
            <FaUsers className="me-1" />
            Users
          </a>
        </li>
        <li>
          <a href="/admins" className="d-block">
            <MdAdminPanelSettings className="me-1" />
            Admins
          </a>
        </li>
        <li>
          <a href="/borrows" className="d-block">
            <FaBook className="me-1" />
            Borrows
          </a>
        </li>
        <li>
          <a href="/reviews" className="d-block">
            <MdRateReview className="me-1" />
            Reviews
          </a>
        </li>
        <li>
          <a href="/profile" className="d-block">
            <CgProfile className="me-1" />
            Profile
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
