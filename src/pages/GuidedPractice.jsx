import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

const GuidedPractice = () => {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;

    if (recording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = () => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleReset = () => {
    setRecording(false);
    setSeconds(0);
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Guided Practice</h2>

      {/* Topic Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold mb-2 text-blue-400">
          Today’s Topic
        </h3>
        <p className="text-gray-300">
          "Describe a challenging situation you faced and how you handled it."
        </p>
      </div>

      {/* Recording Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">

        <p className="text-gray-400 mb-4">
          {recording ? "Recording in progress..." : "Click microphone to start"}
        </p>

        {/* Mic Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setRecording(!recording)}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl transition duration-300 ${
              recording
                ? "bg-red-600 animate-pulse"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            🎤
          </button>
        </div>

        {/* Timer */}
        <p className="text-2xl font-mono text-gray-300 mb-6">
          {formatTime()}
        </p>

        {/* Action Buttons */}
        <button
          onClick={() => navigate("/result")}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
          Submit Recording
        </button>

          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
           >
            Reset
          </button>
        

      </div>
    </DashboardLayout>
  );
};

export default GuidedPractice;