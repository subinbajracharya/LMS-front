import React from "react";
import { Carousel } from "react-bootstrap";

const HeroSlider = () => {
  const slidesData = [
    {
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "A modern home for your books",
      text: "Fast search, cloud sync, and a responsive interface make borrowing effortless on any device. Built with current web standards for speed, reliability, and accessibility.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1616330682546-2468b2d8dd17?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "New arrivals every week",
      text: "Fresh fiction, timely non fiction, and helpful guides appear on the home shelf. Follow categories you love and never miss a release.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Reading should feel easy",
      text: "Place a hold, choose pickup, and let reminders do the rest. Your next book is always within reach.",
    },
  ];

  return (
    <Carousel fade interval={3000} className="shadow-lg p-0">
      {slidesData.map((slide, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={slide.image}
            alt={`Slide ${index + 1}`}
            height={600}
          />
          <Carousel.Caption className="bg-dark bg-opacity-50 border border-white rounded-4 p-3">
            <h3>{slide.title}</h3>
            <p>{slide.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
