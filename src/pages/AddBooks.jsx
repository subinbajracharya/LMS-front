import React, { useState } from "react";
import { Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createBookAction } from "../features/books/booksAction.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // This component will handle adding new books to the library
  const [form, setForm] = useState({
    title: "",
    author: "",
    isbn: "",
    publishedYear: "",
    genre: "",
    description: "",
  });

  // Page meta and fields (kept as in your original)
  const AddBooks = [
    {
      title: "Add New Book",
      description: "Fill in the details of the book you want to add.",
      fields: [
        {
          name: "title",
          label: "Book Title",
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
      navigate("/books");
    }
  };

  return (
    <Container fluid className="p-4 p-md-5">
      {/* Header */}
      <Button
        variant="outline-secondary"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-3"
      >
        ← Back
      </Button>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <div>
            <h2 className="mb-1">{AddBooks[0].title}</h2>
            <small className="text-muted d-block">
              {AddBooks[0].description}
            </small>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-0 shadow-sm rounded-3">
        <Card.Body>
          <Form id="add-book-form" onSubmit={handleOnSubmit}>
            {/* Responsive two-column layout on md+ */}
            <Row className="g-3">
              {AddBooks[0].fields.map((field, index) => (
                <Col xs={12} md={6} key={index}>
                  <Form.Group
                    className="mb-3"
                    controlId={`formBasic${field.label}`}
                  >
                    <Form.Label className="fw-semibold">
                      {field.label}
                    </Form.Label>
                    <Form.Control
                      as={field.type === "textarea" ? "textarea" : "input"}
                      type={field.type !== "textarea" ? field.type : undefined}
                      rows={field.type === "textarea" ? 4 : undefined}
                      placeholder={field.placeholder}
                      name={field.name}
                      onChange={(e) => {
                        // Handle input change (kept in-page as in your original)
                        let updatedFormData = {
                          ...form,
                          [e.target.name]: e.target.value,
                        };
                        setForm(updatedFormData);
                      }}
                    />
                  </Form.Group>
                </Col>
              ))}

              {/* Thumbnail upload as full-width row under fields */}
              <Col xs={12}>
                <Form.Group className="mb-3" controlId={`formBasic-fileUpload`}>
                  <Form.Label className="fw-semibold">
                    Upload Thumbnail for Book
                  </Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Upload book thumbnail"
                    name="image"
                    accept="image/*"
                    onChange={(e) => {
                      // Handle input change (kept in-page as in your original)
                      let updatedFormData = {
                        ...form,
                        [e.target.name]: e.target.files[0],
                      };
                      setForm(updatedFormData);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>

          {/* Bottom actions for mobile users who scroll */}
          <div className="d-flex gap-2 justify-content-end mt-2">
            <Link to="/books" className="btn btn-outline-secondary">
              {AddBooks[0].cancelButton}
            </Link>
            <Button type="submit" form="add-book-form" variant="primary">
              {AddBooks[0].submitButton}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddBooks;
