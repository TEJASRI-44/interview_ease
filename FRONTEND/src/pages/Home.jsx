import React, { useState, useEffect } from "react";
import "../styles/Home.css";

const images = [
  "/1.jpg", // Ensure these are in the public/ folder
  "/2.jpg",
  "/3.jpg"
];

const Home = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      {/* Dark Overlay for Better Readability */}
      <div className="overlay"></div>

      {/* Text Content */}
      <div className="content">
        <h2 className="title">Welcome to InterviewEase</h2>
        <p className="description">Your ultimate platform for a great interview.</p>
      </div>
    </div>
  );
};

export default Home;
