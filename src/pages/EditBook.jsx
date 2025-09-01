import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { updateBookAction } from "../features/books/booksAction";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const EditBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedBook } = useSelector((store) => store.bookStore);

  const [form, setForm] = useState(selectedBook);
  // This component will handle adding new books to the library
  const bookObject = {
    title: "Edit Book",
    description: "Fill in the details of the book you want to add.",
    fields: [
      {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "Enter book title",
        value: form.title,
      },
      {
        name: "author",
        label: "Author",
        type: "text",
        placeholder: "Enter author's name",
        value: form.author,
      },
      {
        name: "isbn",
        label: "ISBN",
        type: "number",
        placeholder: "Enter ISBN number",
        value: form.isbn,
      },
      {
        name: "publishedYear",
        label: "Published Date",
        type: "number",
        placeholder: "Select published date",
        value: form.publishedYear,
      },
      {
        name: "genre",
        label: "Genre",
        type: "text",
        placeholder: "Enter book genre",
        value: form.genre,
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Enter a brief description of the book",
        value: form.description,
      },
      {
        name: "thumbnail",
        label: "Thumbnail",
        type: "url",
        placeholder: "Thumbnail",
        value: form.thumbnail,
      },
    ],
    submitButton: "Edit Book",
    cancelButton: "Cancel",
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let data = await dispatch(updateBookAction(form));
    if (data.status == "success") {
      navigate("/books");
    }
  };

  return (
    <div className="p-5">
      {console.log(bookObject)}
      <h2>{bookObject.title}</h2>
      <p>{bookObject.description}</p>
      <Form onSubmit={handleOnSubmit}>
        {bookObject.fields.map((field, index) => (
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
              value={field.value}
              onChange={(e) => {
                let updatedForm = { ...form, [e.target.name]: e.target.value };
                setForm(updatedForm);
              }}
            />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          {bookObject.submitButton}
        </Button>
        <Link to="/books" className="btn btn-secondary ms-2">
          {bookObject.cancelButton}
        </Link>
      </Form>
    </div>
  );
};

export default EditBook;
