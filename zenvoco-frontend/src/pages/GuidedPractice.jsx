import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../api/api";

const GuidedPractice = () => {

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const navigate = useNavigate();


  const [recordingStartTime, setRecordingStartTime] = useState(null);

  // ✅ START SESSION
  const startSession = async () => {
    try {
      const res = await API.post(
        `/practice/start`,
        { topic: "Describe a challenging situation you faced and how you handled it." }
      );

      console.log("Start session response:", res.data);

      return res.data.session_id;

    } catch (err) {
      console.error("Error starting session", err);
    }
  };

  // 🎤 START RECORDING
  const startRecording = async () => {
    try {
      console.log("Mic clicked - start recording");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = []; // Clear previous recordings

      setRecordingStartTime(Date.now()); // Record start time

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });

        console.log("Recording finished. Blob size:", blob.size);

        setAudioBlob(blob);
        audioChunksRef.current = [];
      };

      mediaRecorder.start();
      setRecording(true);

    } catch (error) {
      console.error("Microphone error:", error);
    }
  };

  // 🛑 STOP RECORDING
  const stopRecording = () => {
    console.log("Stopping recording");

    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    setRecording(false);
  };

  // 🚀 UPLOAD AUDIO (FINAL FIXED)
  const uploadAudio = async () => {
    try {
      console.log("Uploading audio...");

      const token = localStorage.getItem("token");

      // ✅ STEP 1: Start session
      const session_id = await startSession();

      if (!session_id) {
        console.error("Session ID not received");
        return;
      }

      console.log("Session ID:", session_id);
      
      const sessionDurationSeconds = Math.round((Date.now() - recordingStartTime) / 1000) || 1;

      // ✅ STEP 2: Prepare form data
      const formData = new FormData();
      formData.append("audio", audioBlob);
      formData.append("session_id", session_id);
      formData.append("duration", sessionDurationSeconds);

      const response = await API.post(`/practice/submit`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      const data = response.data;

      console.log("Speech Analysis:", data);

      // ✅ STEP 3: Navigate to results
      navigate("/result", { state: data });

    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">

        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">
            Guided Practice
          </h2>
          <p className="text-gray-400 mt-2">
            Practice speaking with AI guidance.
          </p>
        </div>

        {/* Topic */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-10">
          <h3 className="text-2xl font-bold mb-4 text-purple-400">
            📝 Today’s Topic
          </h3>
          <p className="text-xl text-white italic border-l-4 border-purple-500 pl-6 py-2">
            "Describe a challenging situation you faced and how you handled it."
          </p>
        </div>

        {/* Recorder */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-16 text-center">

          <p className="text-xl text-gray-300 mb-10">
            {recording
              ? "Listening carefully..."
              : "Ready when you are. Click microphone to start."}
          </p>

          {/* MIC */}
          <div className="flex justify-center mb-10">
            <button
              onClick={recording ? stopRecording : startRecording}
              className={`w-32 h-32 rounded-full flex items-center justify-center text-5xl transition-all duration-300 ${
                recording
                  ? "bg-red-600 text-white scale-110"
                  : "bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              🎤
            </button>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-12">

            <button
              onClick={uploadAudio}
              disabled={!audioBlob}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold"
            >
              Finish & Analyze
            </button>

            <button
              onClick={() => {
                setRecording(false);
                setAudioBlob(null);
                audioChunksRef.current = [];
              }}
              className="px-8 py-4 border border-gray-700 text-white rounded-xl"
            >
              Reset
            </button>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default GuidedPractice;