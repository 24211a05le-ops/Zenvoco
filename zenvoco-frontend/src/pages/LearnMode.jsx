import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const topics = ["Self Introduction", "Interview Questions", "Presentation Topics", "Viva Questions"];

const LearnMode = () => {
  const [selectedTopic, setSelectedTopic] = useState("Self Introduction");

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Learn Mode</h2>
          <p className="text-gray-400 mt-2">Study guided frameworks for common high-stakes scenarios.</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Topic List */}
          <div className="lg:col-span-1 space-y-3">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`block w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 border ${selectedTopic === topic
                  ? "bg-blue-600 border-blue-500 text-white font-bold"
                  : "bg-gray-900 border-gray-800 text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Topic Details */}
          <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-3xl p-10 space-y-10 relative overflow-hidden">

            <div className="border-b border-gray-800 pb-8">
              <h3 className="text-sm uppercase tracking-widest font-bold text-blue-500 mb-3 flex items-center gap-2">
                <span>📘</span> Explanation
              </h3>
              <p className="text-2xl font-medium text-white leading-relaxed">
                A structured and well-prepared response helps you showcase your strengths without sounding scripted or nervous. Focus on the core message.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-green-500 mb-4 flex items-center gap-2">
                  <span>📐</span> Structure Guide
                </h3>
                <ul className="space-y-3 text-gray-300 font-medium">
                  <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">1</span> Greeting & Introduction</li>
                  <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">2</span> Relevant Background</li>
                  <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">3</span> Key Strengths / Action</li>
                  <li className="flex items-center gap-3"><span className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">4</span> Career Goals / Results</li>
                </ul>
              </div>

              <div className="bg-black/40 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-sm uppercase tracking-widest font-bold text-pink-500 mb-4 flex items-center gap-2">
                  <span>💡</span> AI Hints
                </h3>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 mt-1">✦</span>
                    <span>Keep it under 1-2 minutes to maintain engagement.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 mt-1">✦</span>
                    <span>Focus on measurable metrics and clear outcomes where possible.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-pink-500 mt-1">✦</span>
                    <span>Avoid a memorized tone; practice speaking conversationally.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-8 mt-6">
              <h3 className="text-sm uppercase tracking-widest font-bold text-blue-300 mb-4 flex items-center gap-2">
                <span>💬</span> Sample Pattern
              </h3>
              <p className="text-lg text-blue-100/90 leading-relaxed italic">
                "Good morning/afternoon. My name is [Name], and I specialize in [Field]. Recently, I worked on [Project/Role] where I helped [Action/Result]. My long-term goal is to [Goal]..."
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearnMode;