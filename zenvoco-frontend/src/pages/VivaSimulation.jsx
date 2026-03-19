import React, { useState, useRef } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../api/api";

const VivaSimulation = () => {
  const [started, setStarted] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  const [liveMetrics, setLiveMetrics] = useState({
    speech_clarity: "-",
    confidence_score: "-",
    pace: "-",
    filler_words: "-"
  });

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => audioChunksRef.current.push(event.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        audioChunksRef.current = [];
      };
      mediaRecorder.start();
      setRecording(true);
    } catch (error) {
      console.error("Microphone error:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const toggleRecording = () => {
    if (recording) stopRecording();
    else startRecording();
  };

  const analyzeAudio = async () => {
    if (!audioBlob) return;
    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const response = await API.post(`/speech/analyze`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const { feedback_object } = response.data;
      if (feedback_object && feedback_object.ai_evaluation) {
        setLiveMetrics(feedback_object.ai_evaluation);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setProcessing(false);
      setAudioBlob(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Viva Simulation</h2>
          <p className="text-gray-400 mt-2">Test your skills in a realistic AI mockup session.</p>
        </div>

        {!started ? (
          <div className="bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-xl border border-pink-500/20 rounded-3xl p-16 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] group-hover:bg-pink-500/20 transition-all -z-10"></div>

            <span className="text-7xl mb-8 block">🔥</span>
            <h3 className="text-3xl font-bold mb-4 text-white">Ready for the heat?</h3>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              You will be asked 4 randomized questions based on your profile. Speak clearly and confidently.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="px-10 py-5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)] hover:-translate-y-1"
            >
              Start Simulation
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Question Card */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] group-hover:bg-blue-500/20 transition-all -z-10"></div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                  <span>🤖</span> AI Interviewer
                </h3>
                <span className="bg-black/50 border border-gray-800 text-gray-400 px-4 py-1 rounded-full text-sm font-medium">Question 1 of 4</span>
              </div>
              <p className="text-3xl font-medium text-white leading-relaxed">
                "Tell me about a time you had to learn a new technology quickly to complete a project."
              </p>
            </div>

            {/* Recording Section */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-16 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
              <p className="text-xl text-gray-300 mb-10 font-medium">
                {recording ? "Analyzing your answer..." : "Click microphone to respond"}
              </p>

              {/* Centered Mic */}
              <div className="flex justify-center items-center w-full mb-10 relative">
                {recording && (
                  <>
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-ping"></div>
                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse"></div>
                  </>
                )}
                <button
                  onClick={toggleRecording}
                  className={`relative z-10 w-36 h-36 rounded-full flex items-center justify-center text-6xl transition-all duration-300 shadow-2xl ${recording
                      ? "bg-red-600 text-white shadow-[0_0_40px_rgba(220,38,38,0.6)] scale-110"
                      : "bg-gray-800 border border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white hover:border-gray-500"
                    }`}
                >
                  🎤
                </button>
              </div>

              <div className="flex justify-center gap-6 mt-12">
                <button
                  onClick={analyzeAudio}
                  disabled={!audioBlob || processing}
                  className="px-8 py-4 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:-translate-y-1"
                >
                  {processing ? "Analyzing..." : "Submit & Next Question"}
                </button>

                <button
                  onClick={() => setStarted(false)}
                  className="px-8 py-4 bg-transparent border border-gray-700 hover:bg-gray-800 text-red-400 hover:text-red-300 rounded-xl font-bold transition-all"
                >
                  End Session
                </button>
              </div>
            </div>

            {/* Performance Preview */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8">
              <h3 className="text-xl font-bold text-gray-300 mb-6 flex items-center gap-2">
                <span>📊</span> Live Performance Metrics
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">Fluency</p>
                  <p className="text-4xl font-bold text-green-400">{liveMetrics.speech_clarity}<span className="text-xl">%</span></p>
                </div>
                <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">Pace</p>
                  <p className="text-4xl font-bold text-blue-400">{liveMetrics.pace}<span className="text-xl">%</span></p>
                </div>
                <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">Confidence</p>
                  <p className="text-4xl font-bold text-purple-400">{liveMetrics.confidence_score}<span className="text-xl">%</span></p>
                </div>
                <div className="bg-black/40 border border-gray-800 rounded-2xl p-6 text-center">
                  <p className="text-gray-400 text-sm mb-2 uppercase tracking-wider font-semibold">Filler Words</p>
                  <p className="text-4xl font-bold text-red-400">{liveMetrics.filler_words}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VivaSimulation;