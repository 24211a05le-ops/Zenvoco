import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const examples = [
  {
    title: "Self Introduction Example",
    transcript:
      "Good morning. My name is Anil. I am a Computer Science student with strong interest in AI and software development...",
    insights:
      "Notice clear structure: greeting → background → skills → goals."
  },
  {
    title: "Interview Answer Example",
    transcript:
      "In my final year project, I developed an AI-based communication system using React and FastAPI...",
    insights:
      "Uses STAR method: Situation → Task → Action → Result."
  },
  {
    title: "Presentation Opening Example",
    transcript:
      "Today I will present Zenvoco, an AI-powered communication confidence analytics system...",
    insights:
      "Clear introduction and topic framing."
  }
];

const ListenMode = () => {
  const [selected, setSelected] = useState(examples[0]);

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Listen & Observe</h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Example List */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          {examples.map((item) => (
            <button
              key={item.title}
              onClick={() => setSelected(item)}
              className={`block w-full text-left px-4 py-3 rounded-lg transition ${
                selected.title === item.title
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">

          {/* Audio Player (UI Only) */}
          <div>
            <h3 className="text-blue-400 mb-3">Audio Example</h3>
            <audio controls className="w-full">
              <source src="" type="audio/mpeg" />
              Your browser does not support audio playback.
            </audio>
          </div>

          {/* Transcript */}
          <div>
            <h3 className="text-green-400 mb-3">Transcript</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {selected.transcript}
            </p>
          </div>

          {/* Insights */}
          <div>
            <h3 className="text-purple-400 mb-3">Speaking Insights</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {selected.insights}
            </p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
};

export default ListenMode;