import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">InterviewEase</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
