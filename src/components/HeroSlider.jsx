import React from "react";
import { Carousel } from "react-bootstrap";

const HeroSlider = () => {
  const slidesData = [
    {
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "First Slide",
      text: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1616330682546-2468b2d8dd17?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Second Slide",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522407183863-c0bf2256188c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Third Slide",
      text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
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
            height={650}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSlider;
