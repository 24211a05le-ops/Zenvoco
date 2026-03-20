import React from "react";
import { useLocation, Link } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

const Results = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return <div className="p-6 text-center text-white sm:p-10">No results available</div>;
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-bold sm:text-4xl">Speech Analysis Result</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          <div className="rounded-2xl bg-gray-900 p-5 text-center sm:rounded-3xl sm:p-6">
            <p className="text-3xl font-bold text-blue-400 sm:text-4xl">
              {data.ai_evaluation?.confidence_score || 0}%
            </p>
            <p className="mt-2 text-gray-400">Confidence</p>
          </div>

          <div className="rounded-2xl bg-gray-900 p-5 text-center sm:rounded-3xl sm:p-6">
            <p className="text-3xl font-bold text-green-400 sm:text-4xl">
              {data.ai_evaluation?.speech_clarity || 0}%
            </p>
            <p className="mt-2 text-gray-400">Fluency</p>
          </div>

          <div className="rounded-2xl bg-gray-900 p-5 text-center sm:rounded-3xl sm:p-6">
            <p className="text-3xl font-bold text-purple-400 sm:text-4xl">
              {data.ai_evaluation?.pace || "Normal"}
            </p>
            <p className="mt-2 text-gray-400">Speech Rate</p>
          </div>
        </div>

        <div className="rounded-2xl bg-gray-900 p-5 sm:rounded-3xl sm:p-6">
          <h3 className="mb-3 text-xl font-bold">AI Feedback</h3>
          <p className="leading-relaxed text-gray-300">{data.ai_evaluation?.ai_feedback || "No feedback available."}</p>
        </div>

        <Link
          to="/practice"
          className="inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
        >
          Try Another Session
        </Link>
      </div>
    </DashboardLayout>
  );
};

export default Results;
