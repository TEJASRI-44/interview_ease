import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Roleselection from "./pages/Roleselection";
import InterviewerDashboard from "./pages/InterviewerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Roleselection" element={<Roleselection />} />
        <Route path="/InterviewerDashboard" element={<InterviewerDashboard />} />
        <Route path="/CandidateDashboard" element={<CandidateDashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
