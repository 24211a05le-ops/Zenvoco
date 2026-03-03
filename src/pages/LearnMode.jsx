import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const topics = {
  "Self Introduction": {
    explanation:
      "A self introduction should clearly describe who you are, your background, skills, and goals.",
    structure:
      "1. Greeting\n2. Educational Background\n3. Skills\n4. Career Goals",
    sample:
      "Good morning. My name is Anil. I am a Computer Science student with strong interest in AI. I have worked on projects like Zenvoco. My goal is to become an AI engineer.",
    hints:
      "Keep it under 1 minute. Avoid memorized tone. Maintain natural flow."
  },
  "Interview Questions": {
    explanation:
      "Interview answers should be structured and result-oriented.",
    structure:
      "Use STAR Method:\nSituation\nTask\nAction\nResult",
    sample:
      "In my final year project (Situation), I had to build an AI system (Task). I designed the frontend and integrated APIs (Action). The system improved speaking confidence tracking (Result).",
    hints:
      "Focus on measurable results and clear actions."
  },
  "Presentation Topics": {
    explanation:
      "Presentations must follow logical flow and clarity.",
    structure:
      "1. Introduction\n2. Problem\n3. Solution\n4. Conclusion",
    sample:
      "Today I will present Zenvoco, an AI-based communication system. First, I will explain the problem of speech anxiety...",
    hints:
      "Use transition words like Firstly, Moreover, Finally."
  },
  "Viva Questions": {
    explanation:
      "Viva answers should be precise and technically accurate.",
    structure:
      "1. Define concept\n2. Explain working\n3. Give example",
    sample:
      "Zenvoco uses Whisper API for speech-to-text conversion and OpenAI for feedback generation.",
    hints:
      "Be confident. Avoid long unnecessary explanations."
  }
};

const LearnMode = () => {
  const [selectedTopic, setSelectedTopic] = useState("Self Introduction");

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Learn Mode</h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Topic List */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          {Object.keys(topics).map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                selectedTopic === topic
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        {/* Topic Details */}
        <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="text-blue-400 mb-2">Explanation</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {topics[selectedTopic].explanation}
            </p>
          </div>

          <div>
            <h3 className="text-green-400 mb-2">Structure Guide</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {topics[selectedTopic].structure}
            </p>
          </div>

          <div>
            <h3 className="text-purple-400 mb-2">Sample Pattern</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {topics[selectedTopic].sample}
            </p>
          </div>

          <div>
            <h3 className="text-pink-400 mb-2">AI-Generated Hints</h3>
            <p className="text-gray-300 whitespace-pre-line">
              {topics[selectedTopic].hints}
            </p>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default LearnMode;