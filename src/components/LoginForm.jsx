import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useUser } from "../context/userContext";
import { Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../features/users/usersApi";
import CustomInput from "./CustomInput";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { user, setUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

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

    let data = await loginUser(form);
    if (data.success) {
      toast.success(data.message);
      setUser(data.user);
      localStorage.setItem("accessToken", data.accessToken);
    } else {
      toast.error(data.error);
    }
  };

  const handleOnChange = (e) => {
    let tempForm = { ...form };
    tempForm[e.target.name] = e.target.value;
    setForm(tempForm);
  };

  const pastLocation = location?.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    user?._id && navigate(pastLocation);
  }, [user?._id]);

  return (
    <div className="border border-white border-lg p-5 rounded rounded-5">
      <div className="text-center">
        <h1>LMS</h1>
        <p>Spend mindfully, save effortlessly.</p>
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
          <Link to="/signup" className="text-white">
            Signup?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
