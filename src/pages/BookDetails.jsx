import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { pubBooks } = useSelector((store) => store.bookStore);
  const [book, setBook] = useState({});
  const { bookid } = useParams();

  useEffect(() => {
    const selectedBook = pubBooks.find((b) => b._id === bookid);
    setBook(selectedBook || {});
  }, [pubBooks]);
  return (
    <div>
      <h2>{book?.title}</h2>
      <p>Author: {book?.author}</p>
      <p>Genre: {book?.genre}</p>
      <p>Published Year: {book?.publishedYear}</p>
      <p>ISBN: {book?.isbn}</p>
      <p>Description: {book?.description}</p>
    </div>
  );
};

export default BookDetails;
