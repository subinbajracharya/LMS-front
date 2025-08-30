import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useForm from "../hooks/useForm";
import CustomInput from "./CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../features/users/usersApi";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const navigate = useNavigate();
  let initialState = {
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
  };
  const { form, setForm, handleOnChange } = useForm(initialState);

  let inputFields = [
    {
      id: "fname",
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "Enter First Name",
      value: form.fName,
    },
    {
      id: "lname",
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Enter Last Name",
      value: form.lName,
    },
    {
      id: "email",
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter Email",
      value: form.email,
    },
    {
      id: "phone",
      label: "Phone Number",
      name: "phone",
      type: "tel",
      placeholder: "Enter Phone Number",
      value: form.phone,
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter Password",
      value: form.password,
    },
  ];

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    // make a create user post request
    // axios call
    // {username, email, password}

    let data = await registerUser(form);

    console.log("response from post user", data);

    // if success go to login form
    // else do nothing
    if (data.status) {
      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="border border-white border-lg p-5 rounded rounded-5">
      <div className="text-center">
        <h1>Register</h1>
        {/* <p>Start tracking your money today.</p> */}
      </div>
      <hr />
      <Form onSubmit={handleOnSubmit}>
        {inputFields.map((item, index) => {
          return (
            <CustomInput key={index} {...item} onChange={handleOnChange} />
          );
        })}
        {/* <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select aria-label="Default select example" name="role">
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </Form.Select>
        </Form.Group> */}
        <div className="d-flex justify-content-between align-items-center">
          <Button variant="primary" type="submit">
            Register
          </Button>
          <Link to="/login">Already a user?</Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
