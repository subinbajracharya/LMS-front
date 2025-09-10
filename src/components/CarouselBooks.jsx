import React from "react";
import BookCard from "./BookCard";
import Marquee from "react-fast-marquee";

export const CarouselBooks = ({ books }) => {
  return (
    <Marquee gradient={false} speed={40} pauseOnHover={true}>
      {books.map(({ _id, title, author, publishedYear, genre, thumbnail }) => (
        <div
          key={_id}
          className="h-100"
          style={{ width: "285px", margin: "0 12px" }}
        >
          <BookCard
            id={_id}
            title={title}
            author={author}
            year={publishedYear}
            genre={genre}
            thumbnail={thumbnail}
          />
        </div>
      ))}
    </Marquee>
  );
};
