import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CustomInput from "./CustomInput";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../features/users/userActions";
import { MdOutlineLocalLibrary } from "react-icons/md";

const LoginForm = () => {
  // Fetched from userContext.jsx
  // This context provides user state and a function to set the user state
  const { user } = useSelector((store) => store.userStore);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let initialState = {
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialState);

  let inputFields = [
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      name: "email",
      value: form.email,
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      name: "password",
      value: form.password,
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    let data = await dispatch(loginUserAction(form));
    console.log(data);

    toast[data.status](data.message);
  };

  const handleOnChange = (e) => {
    let tempForm = { ...form };
    tempForm[e.target.name] = e.target.value;
    setForm(tempForm);
  };

  const lastLocation = location?.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    user?._id && navigate(lastLocation);
  }, [user?._id]);

  return (
    <div className="border border-white border-lg p-3 p-md-5 rounded rounded-5 text-white bg-dark bg-opacity-50">
      <div className="text-center">
        <span>
          <MdOutlineLocalLibrary size={60} />
        </span>
        <h1>LMS</h1>
        <p>Welcome back! Continue your journey of learning and growth.</p>
      </div>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {inputFields.map((item, index) => {
          return (
            <CustomInput key={index} {...item} onChange={handleOnChange} />
          );
        })}

        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" type="submit">
            Log In
          </Button>
          <Link to="/register" className="text-white">
            Don't have an account?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
