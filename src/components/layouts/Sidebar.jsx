import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((store) => store.userStore);
  const [filteredMenu, setFilteredMenu] = useState([]);

  const menuList = [
    {
      link: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="me-1" />,
      isAdminOnly: false,
    },
    {
      link: "/books",
      label: "Books",
      icon: <MdMenuBook className="me-1" />,
      isAdminOnly: false,
    },
    {
      link: "/borrows",
      label: "Borrowings",
      icon: <FaBook className="me-1" />,
      isAdminOnly: false,
    },
    {
      link: "/users",
      label: "All Users",
      icon: <FaUsers className="me-1" />,
      isAdminOnly: true,
    },
    {
      link: "/admins",
      label: "All Admins",
      icon: <MdAdminPanelSettings className="me-1" />,
      isAdminOnly: true,
    },
    {
      link: "/reviews",
      label: "Reviews",
      icon: <MdRateReview className="me-1" />,
      isAdminOnly: false,
    },
    {
      link: "/profile",
      label: "Profile",
      icon: <CgProfile className="me-1" />,
      isAdminOnly: false,
    },
  ];

  useEffect(() => {
    if (user?.role === "admin") {
      setFilteredMenu(menuList);
    } else {
      const filtered = menuList.filter((menu) => !menu.isAdminOnly);
      setFilteredMenu(filtered);
    }
  }, [user]);

  return (
    <div className="sidebar py-4 min-vh-100">
      <div className="text-center text-capitalize">
        <p>
          <MdOutlineLocalLibrary size={55} />
        </p>
        <h4>Welcome, {user.fName}!</h4>
      </div>
      <hr />
      <ul>
        {filteredMenu.map((menu) => (
          <li key={menu.link}>
            <Link to={menu.link} className="d-block">
              {menu.icon}
              {menu.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
