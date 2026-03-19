import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const Progress = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Progress Overview</h2>
          <p className="text-gray-400 mt-2">Track your long-term communication skills growth.</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:-translate-y-1 transition-all hover:border-blue-500/50">
            <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-4">Average Confidence</p>
            <p className="text-5xl font-bold text-blue-500 flex items-center gap-2">
              72<span className="text-2xl">%</span>
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:-translate-y-1 transition-all hover:border-green-500/50">
            <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-4">Total Sessions</p>
            <p className="text-5xl font-bold text-green-500">12</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 hover:-translate-y-1 transition-all hover:border-purple-500/50">
            <p className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-4">Avg Duration</p>
            <p className="text-5xl font-bold text-purple-500 flex items-end gap-2">
              1<span className="text-xl text-gray-400 mb-1">m</span> 45<span className="text-xl text-gray-400 mb-1">s</span>
            </p>
          </div>
        </div>

        {/* Mock Chart Section */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span>📈</span> Confidence Trend
          </h3>

          <div className="h-72 flex flex-col justify-end border-l-2 border-b-2 border-gray-800 p-6 gap-6 relative">
            <div className="absolute top-4 left-4 right-4 border-b border-gray-800/50 border-dashed"></div>
            <div className="absolute top-1/2 left-4 right-4 border-b border-gray-800/50 border-dashed"></div>
            <div className="absolute top-1/4 left-4 right-4 border-b border-gray-800/50 border-dashed"></div>
            <div className="absolute top-3/4 left-4 right-4 border-b border-gray-800/50 border-dashed"></div>

            <div className="relative z-10 w-full h-full flex items-end justify-between px-2">
              {/* Bars */}
              <div className="w-[10%] bg-blue-600/30 hover:bg-blue-600/50 transition-all rounded-t-xl border-t-2 border-blue-500 h-[40%] flex justify-center group relative cursor-pointer"><span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white px-2 py-1 rounded text-xs transition-opacity">60%</span></div>
              <div className="w-[10%] bg-blue-600/40 hover:bg-blue-600/60 transition-all rounded-t-xl border-t-2 border-blue-500 h-[45%] flex justify-center group relative cursor-pointer"><span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white px-2 py-1 rounded text-xs transition-opacity">65%</span></div>
              <div className="w-[10%] bg-blue-600/50 hover:bg-blue-600/70 transition-all rounded-t-xl border-t-2 border-blue-400 h-[55%] flex justify-center group relative cursor-pointer"><span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white px-2 py-1 rounded text-xs transition-opacity">70%</span></div>
              <div className="w-[10%] bg-blue-600/70 hover:bg-blue-600/90 transition-all rounded-t-xl border-t-2 border-blue-400 h-[70%] flex justify-center group relative cursor-pointer"><span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white px-2 py-1 rounded text-xs transition-opacity">75%</span></div>
              <div className="w-[10%] bg-blue-500 hover:bg-blue-400 transition-all rounded-t-xl border-t-4 border-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.5)] h-[78%] flex justify-center group relative cursor-pointer"><span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-black text-white px-2 py-1 rounded text-xs transition-opacity">78%</span></div>
            </div>

            <div className="flex justify-between w-full text-sm text-gray-500 font-medium px-2 mt-2">
              <span>Day 1</span>
              <span>Day 2</span>
              <span>Day 3</span>
              <span>Day 4</span>
              <span className="text-blue-400 font-bold">Day 5</span>
            </div>
          </div>
        </div>

        {/* Practice History Table */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-10">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span>📜</span> Practice History
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-gray-400 border-b-2 border-gray-800">
                  <th className="pb-4 font-bold uppercase tracking-wider text-sm">Date</th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-sm">Topic</th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-sm">Confidence</th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-sm">Duration</th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-sm text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-gray-800/50 hover:bg-black/20 transition-colors">
                  <td className="py-5 font-medium">Mar 1</td>
                  <td>Self Introduction</td>
                  <td className="text-blue-400 font-bold">75%</td>
                  <td>1m 30s</td>
                  <td className="text-right"><button className="text-blue-500 hover:text-white transition-colors">Review</button></td>
                </tr>
                <tr className="border-b border-gray-800/50 hover:bg-black/20 transition-colors">
                  <td className="py-5 font-medium">Mar 2</td>
                  <td>Interview Question</td>
                  <td className="text-blue-400 font-bold">70%</td>
                  <td>2m 10s</td>
                  <td className="text-right"><button className="text-blue-500 hover:text-white transition-colors">Review</button></td>
                </tr>
                <tr className="hover:bg-black/20 transition-colors">
                  <td className="py-5 font-medium">Mar 3</td>
                  <td>Presentation Topic</td>
                  <td className="text-blue-400 font-bold">78%</td>
                  <td>1m 45s</td>
                  <td className="text-right"><button className="text-blue-500 hover:text-white transition-colors">Review</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Progress;