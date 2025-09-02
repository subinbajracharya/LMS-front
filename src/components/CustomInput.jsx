import React from "react";
import { Form } from "react-bootstrap";

const CustomInput = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <Form.Group className="mb-5" controlId={id}>
      {/* <Form.Label>{label}</Form.Label> */}
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className=" border-0 border-bottom border-white rounded-0 bg-transparent text-white"
      />
    </Form.Group>
  );
};

export default CustomInput;
