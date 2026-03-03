import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const SpeechResult = () => {
  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Speech Analysis Result</h2>

      {/* Score Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Confidence Score</p>
          <p className="text-3xl font-bold text-blue-500 mt-2">78%</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Fluency</p>
          <p className="text-3xl font-bold text-green-500 mt-2">82%</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Clarity</p>
          <p className="text-3xl font-bold text-purple-500 mt-2">75%</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Filler Words</p>
          <p className="text-3xl font-bold text-red-500 mt-2">5</p>
        </div>

      </div>

      {/* Transcript Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h3 className="text-blue-400 mb-4">Transcript</h3>
        <p className="text-gray-300">
          Good morning, my name is Anil. I am currently pursuing Computer Science
          and I have strong interest in Artificial Intelligence...
        </p>
      </div>

      {/* AI Feedback Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
        <h3 className="text-green-400 mb-4">AI Feedback</h3>
        <p className="text-gray-300 mb-4">
          Your speech was well structured and clear. However, you used filler
          words multiple times. Try to reduce hesitation and maintain consistent pace.
        </p>

        <h4 className="text-purple-400 mb-2">Suggestions</h4>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Reduce filler words like "um" and "uh".</li>
          <li>Pause confidently instead of rushing sentences.</li>
          <li>Maintain consistent voice modulation.</li>
        </ul>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition">
          Back to Dashboard
        </button>
      </div>

    </DashboardLayout>
  );
};

export default SpeechResult;