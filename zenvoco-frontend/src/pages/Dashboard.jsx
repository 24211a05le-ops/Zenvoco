import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get(`/dashboard/user`);
        const data = response.data;
        console.log("Dashboard API Response:", data);

        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!dashboardData) {
    return (
      <DashboardLayout>
        <div className="text-gray-900 dark:text-white p-10 font-bold animate-pulse">Loading your dashboard...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 mt-4 md:mt-0">
        <div className="px-1">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0f172a] dark:text-white">
            Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">
            Welcome back, <span className="text-[#0ea5e9] font-bold">{dashboardData.user_profile?.name || "User"}</span>! Track your journey.
          </p>
        </div>

        <Link
          to="/practice"
          className="w-full md:w-auto bg-[#0284c7] hover:bg-[#0369a1] text-white px-8 py-4 rounded-full font-black transition-all shadow-[0_4px_14px_0_rgb(2,132,199,0.39)] transform hover:-translate-y-0.5 text-center"
        >
          Start New Session
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">

        {/* Confidence Score */}
        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] hover:border-[#0ea5e9]/30 transition-all duration-300 group shadow-sm border-b-4 border-b-blue-500/20">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 text-2xl mb-4 group-hover:scale-110 transition-transform">
            🎯
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">Confidence</h3>
          <p className="text-4xl font-black mt-2 text-gray-900 dark:text-white">
            {dashboardData.metrics_preview?.[0]?.confidence_score || 0}
            <span className="text-xl text-blue-500 ml-1">%</span>
          </p>
        </div>

        {/* Total Sessions */}
        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 hover:shadow-[0_8px_30px_rgb(34,197,94,0.15)] hover:border-green-500/30 transition-all duration-300 group shadow-sm border-b-4 border-b-green-500/20">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 text-2xl mb-4 group-hover:scale-110 transition-transform">
            🔥
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">Recent Sessions</h3>
          <p className="text-4xl font-black mt-2 text-gray-900 dark:text-white">
            {dashboardData.history_preview?.length || 0}
            <span className="text-xl text-green-500 ml-1">#</span>
          </p>
        </div>

        {/* Avg Fluency */}
        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 hover:shadow-[0_8px_30px_rgb(168,85,247,0.15)] hover:border-purple-500/30 transition-all duration-300 group shadow-sm border-b-4 border-b-purple-500/20">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 text-2xl mb-4 group-hover:scale-110 transition-transform">
            🎙️
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">Avg Fluency</h3>
          <p className="text-4xl font-black mt-2 text-gray-900 dark:text-white">
            {dashboardData.metrics_preview && dashboardData.metrics_preview.length > 0
              ? Math.round(
                  dashboardData.metrics_preview.reduce((sum, m) => sum + (m.speech_clarity || 0), 0) /
                  dashboardData.metrics_preview.length
                )
              : 0}
            <span className="text-xl text-purple-500 ml-1">%</span>
          </p>
        </div>

        {/* Target Progress */}
        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 hover:shadow-[0_8px_30px_rgb(236,72,153,0.15)] hover:border-pink-500/30 transition-all duration-300 group shadow-sm border-b-4 border-b-pink-500/20">
          <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 text-2xl mb-4 group-hover:scale-110 transition-transform">
            📉
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 font-bold text-sm uppercase tracking-wider">Status</h3>
          <p className="text-3xl sm:text-4xl font-black mt-2 text-gray-900 dark:text-white">
            {dashboardData.metrics_preview?.length ? "Active" : "New"}
          </p>
        </div>

      </div>

      {/* Charts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

        {/* Confidence Chart */}
        <div className="lg:col-span-2 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <h3 className="text-xl font-black text-[#0f172a] dark:text-white mb-8 tracking-tight">Recent Confidence Trend</h3>
          <div className="h-64 flex items-end justify-between gap-3 px-2 sm:px-4 border-b border-l border-[#0ea5e9]/10 dark:border-gray-800 p-4">
            {dashboardData.metrics_preview && dashboardData.metrics_preview.length > 0 ? (
              dashboardData.metrics_preview.slice(0, 7).reverse().map((m, i) => (
                <div key={i} className="flex-1 max-w-[40px] bg-gradient-to-t from-blue-600 to-[#0ea5e9] rounded-t-lg transition-all hover:opacity-80 relative group" style={{ height: `${Math.max(m.confidence_score || 0, 5)}%` }}>
                   <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0f172a] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {m.confidence_score}%
                   </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center w-full pb-10 font-medium">No practice data yet. Start a session!</p>
            )}
          </div>
          <div className="flex justify-between mt-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest px-8">
             <span>Older</span>
             <span>Recent</span>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-[#0f172a] dark:text-white mb-6 tracking-tight">Practice History</h3>
          <div className="space-y-4 flex-1">
            {dashboardData.history_preview && dashboardData.history_preview.length > 0 ? (
              dashboardData.history_preview.map((session, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/50 dark:bg-black/40 p-4 rounded-2xl border border-[#0ea5e9]/5 transition-all hover:border-[#0ea5e9]/20 hover:bg-white dark:hover:bg-black/60 group">
                  <div className="w-10 h-10 rounded-full bg-[#0ea5e9]/10 flex items-center justify-center text-[#0ea5e9] border border-[#0ea5e9]/20 group-hover:scale-110 transition-transform">
                    🎤
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-black text-slate-800 dark:text-white text-sm truncate">{session.topic}</h4>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
                      {new Date(session.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm font-medium">No activity recorded yet.</p>
            )}
          </div>
          <Link
            to="/progress"
            className="block w-full text-center mt-8 py-4 rounded-2xl border border-slate-200 dark:border-gray-800 text-slate-700 dark:text-gray-300 hover:text-[#0ea5e9] hover:border-[#0ea5e9] font-black transition-all hover:bg-white dark:hover:bg-gray-800 shadow-sm"
          >
            Full Analytics
          </Link>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
