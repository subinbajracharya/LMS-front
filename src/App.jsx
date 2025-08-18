import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/layouts/DefaultLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Auth from "./auth/Auth";
import { ToastContainer } from "react-toastify";
import VerifyEmail from "./pages/VerifyEmail";
import AdminLayout from "./components/layouts/AdminLayout";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Borrows from "./pages/Borrows";
import AddBooks from "./pages/AddBooks";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* <Route path="verify-email" element={<VerifyEmail />} /> */}
          </Route>

          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="books" element={<Books />} />
            <Route path="users" element={<Users />} />
            <Route path="borrows" element={<Borrows />} />
            <Route path="books/add-books" element={<AddBooks />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
