import React from "react";
import { Button, Form } from "react-bootstrap";

const AddBooks = () => {
  // This component will handle adding new books to the library
  const AddBooks = [
    {
      title: "Add New Book",
      description: "Fill in the details of the book you want to add.",
      fields: [
        { label: "Title", type: "text", placeholder: "Enter book title" },
        { label: "Author", type: "text", placeholder: "Enter author's name" },
        { label: "ISBN", type: "text", placeholder: "Enter ISBN number" },
        {
          label: "Published Date",
          type: "date",
          placeholder: "Select published date",
        },
        { label: "Genre", type: "text", placeholder: "Enter book genre" },
        {
          label: "Description",
          type: "textarea",
          placeholder: "Enter a brief description of the book",
        },
      ],
      submitButton: "Add Book",
      cancelButton: "Cancel",
    },
  ];
  return (
    <div className="p-5">
      {console.log(AddBooks)}
      <h2>{AddBooks[0].title}</h2>
      <p>{AddBooks[0].description}</p>
      <Form>
        {AddBooks[0].fields.map((field, index) => (
          <Form.Group
            key={index}
            className="mb-3"
            controlId={`formBasic${field.label}`}
          >
            <Form.Label className="form-label">{field.label}</Form.Label>
            <Form.Control type={field.type} placeholder={field.placeholder} />
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          {AddBooks[0].submitButton}
        </Button>
        <Button variant="secondary" type="button" className="ms-2">
          {AddBooks[0].cancelButton}
        </Button>
      </Form>
    </div>
  );
};

export default AddBooks;
