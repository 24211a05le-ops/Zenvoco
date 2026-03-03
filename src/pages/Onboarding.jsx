import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const Onboarding = () => {
  const [purpose, setPurpose] = useState("");
  const [level, setLevel] = useState("");

  const purposes = [
    "Interview Preparation",
    "Presentation Skills",
    "Viva Preparation",
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Profile Setup</h2>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-3xl">

        {/* Purpose Selection */}
        <div className="mb-10">
          <h3 className="text-lg text-gray-400 mb-4">
            What is your main purpose?
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {purposes.map((item) => (
              <div
                key={item}
                onClick={() => setPurpose(item)}
                className={`cursor-pointer p-5 rounded-xl border transition ${
                  purpose === item
                    ? "bg-blue-600 border-blue-500"
                    : "bg-gray-800 border-gray-700 hover:border-blue-400"
                }`}
              >
                <p className="text-center font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Comfort Level Selection */}
        <div className="mb-10">
          <h3 className="text-lg text-gray-400 mb-4">
            What is your current comfort level?
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {levels.map((item) => (
              <div
                key={item}
                onClick={() => setLevel(item)}
                className={`cursor-pointer p-5 rounded-xl border transition ${
                  level === item
                    ? "bg-green-600 border-green-500"
                    : "bg-gray-800 border-gray-700 hover:border-green-400"
                }`}
              >
                <p className="text-center font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          disabled={!purpose || !level}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition disabled:opacity-50"
        >
          Save Profile
        </button>

      </div>
    </DashboardLayout>
  );
};

export default Onboarding;