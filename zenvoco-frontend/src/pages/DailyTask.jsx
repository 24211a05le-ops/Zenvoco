import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const DailyTask = () => {
  const [completed, setCompleted] = useState(false);
  const streak = 5;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Daily Task</h2>
          <p className="text-gray-400 mt-2">Complete your daily challenge to maintain your streak.</p>
        </div>

        {/* Streak Counter */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 text-center flex flex-col items-center justify-center">
          <p className="text-orange-400/80 uppercase tracking-widest text-sm font-bold mb-2">Current Streak</p>
          <div className="text-6xl font-bold text-white flex items-center justify-center gap-4">
            <span className="text-orange-500">🔥</span> {streak} <span className="text-3xl text-gray-400 font-medium">Days</span>
          </div>
        </div>

        {/* Today's Task */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all -z-10"></div>

          <h3 className="text-2xl font-bold mb-4 text-blue-400 flex items-center gap-3">
            <span className="text-3xl">🎯</span> Today’s Speaking Challenge
          </h3>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed max-w-2xl">
            Speak for 2 minutes about a challenging situation you faced
            and explain how you solved it. Focus on clarity and structure.
          </p>

          <button
            onClick={() => setCompleted(true)}
            disabled={completed}
            className={`px-8 py-4 rounded-xl font-bold transition-all text-lg shadow-[0_0_20px_rgba(0,0,0,0.2)] ${completed
                ? "bg-green-600/20 text-green-500 border border-green-500/50 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 text-white hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              }`}
          >
            {completed ? "Task Completed ✓" : "Mark as Completed"}
          </button>
        </div>

        {/* Task History */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-10">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="text-gray-400">📅</span> Recent Tasks
          </h3>

          <div className="space-y-4 text-gray-300">
            <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-gray-800">
              <span className="font-medium">Self Introduction Practice</span>
              <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-lg">Completed ✓</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-gray-800">
              <span className="font-medium">Interview Question</span>
              <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-lg">Completed ✓</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-black/40 rounded-xl border border-gray-800">
              <span className="font-medium">Presentation Opening</span>
              <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-lg">Completed ✓</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DailyTask;
