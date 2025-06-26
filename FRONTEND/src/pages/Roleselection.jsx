import { useNavigate } from "react-router-dom";
import React from "react";
import "../styles/Roleselection.css"; // Ensure correct path & case sensitivity

const Roleselection = () => {
  console.log("RoleSelection Component Mounted");
  const navigate = useNavigate();

  return (
    <div className="role-selection-container">
      <h2 className="role-selection-title">Choose Your Role</h2>
      <div className="role-selection-options">
        <div className="role-card interviewer" onClick={() => navigate("/InterviewerDashboard")}>
          <h3>Interviewer</h3>
          <p>Conduct and evaluate interviews with ease.</p>
        </div>

        <div className="role-card candidate" onClick={() => navigate("/CandidateDashboard")}>
          <h3>Candidate</h3>
          <p>Prepare and practice for interviews effectively.</p>
        </div>
      </div>
    </div>
  );
};

export default Roleselection;
