import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLayout from "./components/layouts/AdminLayout";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Borrows from "./pages/Borrows";
import AddBooks from "./pages/AddBooks";
import BookDetails from "./pages/BookDetails";
import { useEffect } from "react";
import { getUserDetail } from "./features/users/userActions";
import { useDispatch } from "react-redux";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import BooksListing from "./pages/BooksListing";
import Profile from "./pages/Profile";
import Admins from "./pages/Admins";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetail());
  }, []);

  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="books-listing" element={<BooksListing />} />
            {/* <Route path="verify-email" element={<VerifyEmail />} /> */}
            <Route path="book-details/:bookid" element={<BookDetails />} />
          </Route>

          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="books" element={<Books />} />
            <Route path="borrows" element={<Borrows />} />
            <Route path="users" element={<Users />} />
            <Route path="admins" element={<Admins />} />
            <Route path="profile" element={<Profile />} />
            <Route path="books/add-books" element={<AddBooks />} />
            <Route path="books/edit-book" element={<EditBook />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
