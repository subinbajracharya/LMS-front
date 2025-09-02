import React from "react";
import {
  MdDashboard,
  MdMenuBook,
  MdAdminPanelSettings,
  MdRateReview,
  MdOutlineLocalLibrary,
} from "react-icons/md";
import { FaUsers, FaBook } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar py-4 min-vh-100">
      <div className="text-center">
        <p>
          <MdOutlineLocalLibrary size={55} />
        </p>
        <h4>Welcome, Subin!</h4>
      </div>
      <hr />
      <ul>
        <li>
          <Link to="/dashboard" className="d-block">
            <MdDashboard className="me-1" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/books" className="d-block">
            <MdMenuBook className="me-1" />
            Books
          </Link>
        </li>
        <li>
          <Link to="/users" className="d-block">
            <FaUsers className="me-1" />
            All Users
          </Link>
        </li>
        <li>
          <Link to="/admins" className="d-block">
            <MdAdminPanelSettings className="me-1" />
            All Admins
          </Link>
        </li>
        <li>
          <Link to="/borrows" className="d-block">
            <FaBook className="me-1" />
            Borrowings
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="d-block">
            <MdRateReview className="me-1" />
            Reviews
          </Link>
        </li>
        <li>
          <Link to="/profile" className="d-block">
            <CgProfile className="me-1" />
            Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
