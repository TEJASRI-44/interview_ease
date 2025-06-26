import React, { useState } from "react";
import VideoConference from "./VideoConference.jsx"; // Import Video Conference component
import "../styles/InterviewerDashboard.css"; // Import external CSS

const InterviewerDashboard = () => {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Interviewer Panel</h2>
        <button onClick={() => setActiveTab("video")}>🎥 Video Conferencing</button>
        <button onClick={() => setActiveTab("editor")}>📝 Text Editor</button>
        <button onClick={() => setActiveTab("chatbot")}>🤖 Chatbot Assistance</button>
      </div>

      {/* Main Content */}
      <div className="content">
        {activeTab === "video" && (
          <div className="tab-content">
            <VideoConference /> {/* Video Call Component */}
          </div>
        )}

        {activeTab === "editor" && (
          <div className="tab-content">
            <h2>Text Editor</h2>
            <textarea placeholder="Write interview notes here..."></textarea>
          </div>
        )}

        {activeTab === "chatbot" && (
          <div className="tab-content">
            <h2>Chatbot Assistance</h2>
            <p>Chatbot feature coming soon...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewerDashboard;
