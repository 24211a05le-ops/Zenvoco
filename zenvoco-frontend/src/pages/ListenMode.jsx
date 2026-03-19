import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const examples = ["Self Introduction", "Interview Answer", "Presentation Opening"];

const ListenMode = () => {
  const [selected, setSelected] = useState("Self Introduction");

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Listen & Observe</h2>
          <p className="text-gray-400 mt-2">Listen to examples and absorb the correct structure and tone.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Example List */}
          <div className="lg:col-span-1 space-y-3">
            {examples.map((item) => (
              <button
                key={item}
                onClick={() => setSelected(item)}
                className={`block w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 border ${selected === item
                  ? "bg-blue-600 border-blue-500 text-white font-bold"
                  : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Content Section */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-10 space-y-10 relative overflow-hidden">

            {/* Audio Player Mock */}
            <div className="bg-black/40 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-sm uppercase tracking-widest font-bold text-blue-500 mb-6 flex items-center gap-2">
                <span>🎧</span> Audio Example
              </h3>

              <div className="flex items-center gap-6">
                <button className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center text-xl transition-all shrink-0">
                  ▶
                </button>
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-medium">
                    <span>0:15</span>
                    <span>1:30</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div>
              <h3 className="text-sm uppercase tracking-widest font-bold text-green-500 mb-4 flex items-center gap-2">
                <span>📝</span> Transcript
              </h3>
              <div className="bg-gradient-to-br from-gray-800/50 to-transparent border border-gray-700/50 rounded-2xl p-6 text-gray-300 leading-relaxed text-lg">
                "Good morning. My name is Anil. I am a student with a strong interest in AI and software development. In the past, I have enjoyed building structured web applications that improve user experiences..."
              </div>
            </div>

            {/* Insights */}
            <div>
              <h3 className="text-sm uppercase tracking-widest font-bold text-purple-500 mb-4 flex items-center gap-2">
                <span>✨</span> Speaking Insights
              </h3>
              <ul className="space-y-3 bg-black/40 border border-gray-800 rounded-2xl p-6 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  Clear enunciation and confident tone right from the greeting.
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  Follows a logical structure: background followed by core interests.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ListenMode;