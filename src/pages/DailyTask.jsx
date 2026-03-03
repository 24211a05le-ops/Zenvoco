import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const DailyTask = () => {
  const [completed, setCompleted] = useState(false);
  const streak = 5; // static for now

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Daily Task</h2>

      {/* Today's Task */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-blue-400">
          Today’s Speaking Challenge
        </h3>

        <p className="text-gray-300 mb-6">
          Speak for 2 minutes about a challenging situation you faced
          and explain how you solved it.
        </p>

        <button
          onClick={() => setCompleted(true)}
          disabled={completed}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition disabled:opacity-50"
        >
          {completed ? "Task Completed ✓" : "Mark as Completed"}
        </button>
      </div>

      {/* Streak Counter */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10 text-center">
        <h3 className="text-lg text-gray-400 mb-2">Current Streak</h3>
        <p className="text-4xl font-bold text-orange-400">
          🔥 {streak} Days
        </p>
      </div>

      {/* Task History */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Tasks</h3>

        <ul className="space-y-3 text-gray-300">
          <li className="border-b border-gray-800 pb-2">
            Mar 1 — Self Introduction Practice ✓
          </li>
          <li className="border-b border-gray-800 pb-2">
            Mar 2 — Interview Question ✓
          </li>
          <li>
            Mar 3 — Presentation Opening ✓
          </li>
        </ul>
      </div>

    </DashboardLayout>
  );
};

export default DailyTask;