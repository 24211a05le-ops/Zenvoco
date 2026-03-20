import React, { useState, useRef } from "react";
import DashboardLayout from "../layout/DashboardLayout";

// ─── Example library ────────────────────────────
const EXAMPLES = [
  {
    id: "self-intro",
    label: "Self Introduction",
    audio: "/audio/self-intro.mp3", // ✅ LINKED
    icon: "🙋",
    badge: "Beginner",
    badgeColor: "bg-green-500/20 text-green-400 border border-green-500/30",
    duration: "1:20",
    description: "A confident, structured self-introduction for an interview or networking setting.",
    transcript:
      "Good morning. My name is Anil Varma...",
    insights: [],
    keyTechniques: [],
  },
  {
    id: "interview",
    label: "Interview Answer (STAR)",
    audio: "/audio/interview.mp3",
    icon: "💼",
    badge: "Intermediate",
    badgeColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    duration: "1:45",
    description: "A behavioural interview answer using the STAR framework.",
    transcript: "In my third year...",
    insights: [],
    keyTechniques: [],
  },
  {
    id: "presentation",
    label: "Presentation Opening",
    audio: "/audio/presentation.mp3",
    icon: "🎤",
    badge: "Advanced",
    badgeColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    duration: "0:45",
    description: "A hook-driven opening for a technical presentation.",
    transcript: "Imagine you spend four years...",
    insights: [],
    keyTechniques: [],
  },
];

const ListenMode = () => {
  const [selectedId, setSelectedId] = useState("self-intro");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const audioRef = useRef(null);

  const example = EXAMPLES.find((e) => e.id === selectedId);

  const selectExample = (id) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setSelectedId(id);
    setProgress(0);
    setShowTranscript(false);
    setIsPlaying(false);
  };

  // ▶️ Play / Pause
  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // 🔁 Reset
  const resetPlayback = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
      setShowTranscript(false);
    }
  };

  // ⏱ Progress update
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const duration = audioRef.current.duration;

    if (duration) {
      setProgress((current / duration) * 100);
    }
  };

  // ⏱ Time display (same UI logic preserved)
  const [durMin, durSec] = example.duration.split(":").map(Number);
  const totalSec = durMin * 60 + durSec;
  const elapsed = Math.round((progress / 100) * totalSec);
  const elMin = Math.floor(elapsed / 60).toString().padStart(1, "0");
  const elSec = (elapsed % 60).toString().padStart(2, "0");

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10">

        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Listen & Observe</h2>
          <p className="text-gray-400 mt-2">
            Listen to expert examples, read the transcript, and study the technique breakdown.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-3">
            {EXAMPLES.map((ex) => (
              <button
                key={ex.id}
                onClick={() => selectExample(ex.id)}
                className={`block w-full text-left px-5 py-5 rounded-2xl transition-all duration-300 border ${selectedId === ex.id
                    ? "bg-blue-600 border-blue-500 text-white font-bold"
                    : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{ex.icon}</span>
                  <span className="font-semibold">{ex.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main */}
          <div className="lg:col-span-2 space-y-6">

            {/* 🎧 AUDIO ELEMENT */}
            <audio
              ref={audioRef}
              src={example.audio}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => {
                setIsPlaying(false);
                setShowTranscript(true);
              }}
            />

            {/* Audio Player */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8">

              <div className="flex items-center gap-6">
                <button
                  onClick={togglePlayback}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${isPlaying ? "bg-red-600" : "bg-blue-600"
                    }`}
                >
                  {isPlaying ? "⏸" : progress >= 100 ? "↺" : "▶"}
                </button>

                <div className="flex-1 space-y-3">
                  <div
                    className="h-2.5 w-full bg-gray-800 rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      if (!audioRef.current) return;

                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = (e.clientX - rect.left) / rect.width;

                      audioRef.current.currentTime =
                        pct * audioRef.current.duration;
                    }}
                  >
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>{elMin}:{elSec}</span>
                    <span>{example.duration}</span>
                  </div>
                </div>

                <button onClick={resetPlayback} className="text-gray-500">
                  ↺
                </button>
              </div>
            </div>

            {/* Transcript */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8">
              <button onClick={() => setShowTranscript(!showTranscript)}>
                {showTranscript ? "Hide" : "Show"} Transcript
              </button>

              {showTranscript && (
                <p className="text-gray-300 mt-4">{example.transcript}</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ListenMode;