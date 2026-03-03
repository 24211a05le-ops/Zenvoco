import React, { useState, useEffect } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const questions = [
  "Tell me about yourself.",
  "Why should we hire you?",
  "What are your strengths and weaknesses?",
  "Describe a project you worked on."
];

const VivaSimulation = () => {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (recording) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
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

  const handleNext = () => {
    setRecording(false);
    setSeconds(0);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleEnd = () => {
    setStarted(false);
    setCurrentIndex(0);
    setRecording(false);
    setSeconds(0);
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Viva Simulation</h2>

      {!started ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">
          <p className="text-gray-400 mb-6">
            Simulate a real interview or viva session powered by AI.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Start Simulation
          </button>
        </div>
      ) : (
        <div className="space-y-8">

          {/* Question Card */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-blue-400 mb-2">AI Question</h3>

                {/* Progress Indicator */}
                <p className="text-sm text-gray-400 mb-2">
                    Question {currentIndex + 1} of {questions.length}
                </p>

                <p className="text-lg">{questions[currentIndex]}</p>
            </div>

          {/* Recording Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-10 text-center">

            <p className="text-gray-400 mb-4">
              {recording ? "Recording in progress..." : "Click microphone to start answering"}
            </p>

            {/* Centered Mic */}
            <div className="flex justify-center items-center w-full mb-4">
              <button
                onClick={() => setRecording(!recording)}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition ${
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
            <div className="space-x-4">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition"
              >
                Next Question
              </button>

              <button
                onClick={handleEnd}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
              >
                End Simulation
              </button>
            </div>
          </div>

          {/* Performance Preview */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <h3 className="text-blue-400 mb-4">Performance Preview</h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

                    <div>
                        <p className="text-gray-400 text-sm">Fluency</p>
                        <p className="text-lg font-bold text-green-400">82%</p>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm">Clarity</p>
                        <p className="text-lg font-bold text-blue-400">78%</p>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm">Confidence</p>
                        <p className="text-lg font-bold text-purple-400">75%</p>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm">Filler Words</p>
                        <p className="text-lg font-bold text-red-400">Low</p>
                    </div>

                </div>
            </div>

        </div>
      )}
    </DashboardLayout>
  );
};

export default VivaSimulation;