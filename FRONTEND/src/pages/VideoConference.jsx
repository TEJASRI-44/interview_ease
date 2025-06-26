import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import { Client } from "@stomp/stompjs";

const VideoConference = () => {
  const [stream, setStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerSignal, setCallerSignal] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [peer, setPeer] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const myVideo = useRef();
  const userVideo = useRef();

  useEffect(() => {
    // Setup WebSocket connection
    const newStompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      reconnectDelay: 5000, // Auto-reconnect on failure
      onConnect: () => {
        console.log("Connected to WebSocket");

        newStompClient.subscribe("/topic/call", (message) => {
          const data = JSON.parse(message.body);
          setReceivingCall(true);
          setCallerSignal(data.signal);
        });

        newStompClient.subscribe("/topic/accept", (message) => {
          const data = JSON.parse(message.body);
          if (peer) {
            peer.signal(data.signal);
          }
        });
        
      },
    });

    newStompClient.activate();
    setStompClient(newStompClient);

    // Access user's webcam and microphone
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (myVideo.current) myVideo.current.srcObject = currentStream;
      })
      .catch((err) => console.error("Error accessing media devices", err));

    return () => {
      newStompClient.deactivate();
    };
  }, []);

  const callUser = () => {
    if (!stompClient || !stream) return;

    const newPeer = new Peer({ initiator: true, trickle: false, stream });

    newPeer.on("signal", (data) => {
      stompClient.publish({
        destination: "/app/callUser",
        body: JSON.stringify({ signal: data }),
      });
    });

    newPeer.on("stream", (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    setPeer(newPeer);
  };

  const acceptCall = () => {
    if (!stompClient || !stream || !callerSignal) return;

    setCallAccepted(true);
    const newPeer = new Peer({ initiator: false, trickle: false, stream });

    newPeer.on("signal", (data) => {
      stompClient.publish({
        destination: "/app/acceptCall",
        body: JSON.stringify({ signal: data }),
      });
    });

    newPeer.on("stream", (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    newPeer.signal(callerSignal);
    setPeer(newPeer);
  };

  const hangUp = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    setCallAccepted(false);
    setReceivingCall(false);
  };

  return (
    <div>
      <h2>Video Conference</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <video ref={myVideo} playsInline muted autoPlay style={{ width: "300px", border: "2px solid black" }} />
        {callAccepted && <video ref={userVideo} playsInline autoPlay style={{ width: "300px", border: "2px solid black" }} />}
      </div>
      <div>
        {!callAccepted && <button onClick={callUser}>Call</button>}
        {receivingCall && !callAccepted && <button onClick={acceptCall}>Accept Call</button>}
        {callAccepted && <button onClick={hangUp}>Hang Up</button>}
      </div>
    </div>
  );
};

export default VideoConference;
