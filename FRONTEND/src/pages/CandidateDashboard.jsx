import React, { useState, useRef } from "react";
import VideoConference from "./VideoConference.jsx"; // Import Video Conference component
import "../styles/CandidateDashboard.css"; // Import external CSS

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("video");
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  // Function to handle drawing on the whiteboard
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    isDrawing.current = true;
  };

  const draw = (e) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawing.current = false;
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Candidate Panel</h2>
        <button onClick={() => setActiveTab("whiteboard")}>🖍️ Whiteboard</button>
        <button onClick={() => setActiveTab("video")}>🎥 Video Conferencing</button>
        <button onClick={() => setActiveTab("codeEditor")}>💻 Code Editor</button>
        
      </div>

      {/* Main Content */}
      <div className="content">
        {activeTab === "video" && (
          <div className="section">
            <VideoConference /> {/* Video Call Component */}
          </div>
        )}

        {activeTab === "codeEditor" && (
          <div className="section">
            <h2>Code Editor</h2>
            <textarea
              placeholder="Write your code here..."
              className="code-editor"
            />
          </div>
        )}

        {activeTab === "whiteboard" && (
          <div className="section">
            <h2>Whiteboard</h2>
            <canvas
              ref={canvasRef}
              className="whiteboard"
              width={700}
              height={400}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
