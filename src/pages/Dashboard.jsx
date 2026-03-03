import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const data = {
    labels: ["Session 1", "Session 2", "Session 3", "Session 4", "Session 5"],
    datasets: [
      {
        label: "Confidence Score",
        data: [60, 65, 70, 75, 78],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59,130,246,0.2)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "#1f2937" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#1f2937" },
      },
    },
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
          <h3 className="text-gray-400 text-sm">Current Confidence Score</h3>
          <p className="text-3xl font-bold mt-2 text-blue-500">78%</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500 transition">
          <h3 className="text-gray-400 text-sm">Sessions Completed</h3>
          <p className="text-3xl font-bold mt-2 text-green-500">12</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition">
          <h3 className="text-gray-400 text-sm">Average Fluency</h3>
          <p className="text-3xl font-bold mt-2 text-purple-500">82%</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-pink-500 transition">
          <h3 className="text-gray-400 text-sm">Anxiety Reduction</h3>
          <p className="text-3xl font-bold mt-2 text-pink-500">+15%</p>
        </div>
      </div>
      
      <div className="mt-10 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Last Practice Session</h3>
        <div className="flex justify-between text-gray-300">
          <span>Topic: Self Introduction</span>
          <span>Confidence: 78%</span>
          <span>Duration: 1m 45s</span>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="mt-12 bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-2xl">
        <h3 className="text-xl font-semibold mb-6">Confidence Trend</h3>
        <Line data={data} options={options} />
      </div>

    </DashboardLayout>
  );
};

export default Dashboard;