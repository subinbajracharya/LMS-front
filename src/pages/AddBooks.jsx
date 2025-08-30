import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createBookAction } from "../features/books/booksAction.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  // This component will handle adding new books to the library
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    genre: "",
    description: "",
  });

  const AddBooks = [
    {
      title: "Add New Book",
      description: "Fill in the details of the book you want to add.",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "Enter book title",
        },
        {
          name: "author",
          label: "Author",
          type: "text",
          placeholder: "Enter author's name",
        },
        {
          name: "isbn",
          label: "ISBN",
          type: "text",
          placeholder: "Enter ISBN number",
        },
        {
          name: "publishedYear",
          label: "Published Year",
          type: "number",
          placeholder: "Enter year of publication",
        },
        {
          name: "genre",
          label: "Genre",
          type: "text",
          placeholder: "Enter book genre",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          placeholder: "Enter a brief description of the book",
        },
      ],
      submitButton: "Add Book",
      cancelButton: "Cancel",
    },
  ];

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    let formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    let data = await dispatch(createBookAction(formData));
    if (data.status == "success") {
      Navigate("/books");
    }
  };

  return (
    <div className="p-5">
      {console.log(AddBooks)}
      <h2>{AddBooks[0].title}</h2>
      <p>{AddBooks[0].description}</p>
      <Form onSubmit={handleOnSubmit}>
        {AddBooks[0].fields.map((field, index) => (
          <Form.Group
            key={index}
            className="mb-3"
            controlId={`formBasic${field.label}`}
          >
            <Form.Label className="form-label">{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              onChange={(e) => {
                // Handle input change
                let updatedFormData = {
                  ...form,
                  [e.target.name]: e.target.value,
                };
                setForm(updatedFormData);
              }}
            />
          </Form.Group>
        ))}
        <Form.Group className="mb-3" controlId={`formBasic-fileUpload`}>
          <Form.Label className="form-label">
            Upload Thumbnail for Book
          </Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload book thumbnail"
            name="image"
            accept="image/*"
            onChange={(e) => {
              // Handle input change
              let updatedFormData = {
                ...form,
                [e.target.name]: e.target.files[0],
              };
              setForm(updatedFormData);
            }}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {AddBooks[0].submitButton}
        </Button>
        <Link to="/books" className="btn btn-secondary ms-2">
          {AddBooks[0].cancelButton}
        </Link>
      </Form>
    </div>
  );
};

export default AddBooks;
