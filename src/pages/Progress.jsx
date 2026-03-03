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

const Progress = () => {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
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
      <h2 className="text-3xl font-bold mb-10">Progress Overview</h2>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Average Confidence</p>
          <p className="text-3xl font-bold text-blue-500 mt-2">72%</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Total Sessions</p>
          <p className="text-3xl font-bold text-green-500 mt-2">12</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Avg Speaking Duration</p>
          <p className="text-3xl font-bold text-purple-500 mt-2">1m 45s</p>
        </div>

      </div>

      {/* Chart Section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-6">Confidence Trend</h3>
        <Line data={data} options={options} />
      </div>

      {/* Practice History */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-6">Practice History</h3>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-gray-800">
              <th className="py-3">Date</th>
              <th>Topic</th>
              <th>Confidence</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            <tr className="border-b border-gray-800">
              <td className="py-3">Mar 1</td>
              <td>Self Introduction</td>
              <td>75%</td>
              <td>1m 30s</td>
            </tr>
            <tr className="border-b border-gray-800">
              <td className="py-3">Mar 2</td>
              <td>Interview Question</td>
              <td>70%</td>
              <td>2m 10s</td>
            </tr>
            <tr>
              <td className="py-3">Mar 3</td>
              <td>Presentation Topic</td>
              <td>78%</td>
              <td>1m 45s</td>
            </tr>
          </tbody>
        </table>

      </div>

    </DashboardLayout>
  );
};

export default Progress;