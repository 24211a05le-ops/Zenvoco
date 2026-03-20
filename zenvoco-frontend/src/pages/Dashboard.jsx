import React, { useEffect, useState, useMemo, memo } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import { Link } from "react-router-dom";
import API from "../api/api";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const StatCard = memo(({ icon, label, value, unit, color, delay }) => (
  <div className={`glass-card p-10 flex flex-col items-center text-center group interactive-button animate-fade-in ${delay}`}>
    <div className={`w-20 h-20 bg-${color}-500/10 rounded-[2rem] flex items-center justify-center text-4xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner ring-1 ring-${color}-500/20`}>
      {icon}
    </div>
    <h3 className="text-zinc-500 font-black uppercase text-xs tracking-[0.2em] mb-3">{label}</h3>
    <p className="text-5xl font-black tracking-tight text-white italic">
      {value}<span className={`text-2xl text-${color}-500 not-italic ml-1 opacity-70`}>{unit}</span>
    </p>
  </div>
));

const HistoryItem = memo(({ session, delay }) => (
  <div className={`flex items-center gap-6 p-6 rounded-3xl bg-zinc-900/40 border border-white/5 group hover:bg-zinc-900 animate-fade-in ${delay} transition-all duration-300`}>
    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 transition-transform group-hover:scale-110">
      🎤
    </div>
    <div className="flex-1 text-left">
      <h4 className="font-black text-xl text-white truncate max-w-[150px] md:max-w-xs">{session.topic}</h4>
      <p className="text-sm text-zinc-500 font-bold uppercase tracking-wider">{new Date(session.created_at).toLocaleDateString()}</p>
    </div>
    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all">
      →
    </div>
  </div>
));

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get(`/dashboard/user`);
        console.log("Dashboard API Response:", response.data);
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };
    fetchDashboard();
  }, []);

  const chartData = useMemo(() => {
    if (!dashboardData?.metrics_preview?.length) return null;
    const records = [...dashboardData.metrics_preview].reverse();
    return {
      labels: records.map((_, i) => `Session ${i + 1}`),
      datasets: [
        {
          fill: true,
          label: 'Confidence Score',
          data: records.map(m => m.confidence_score || 0),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          pointRadius: 6,
          pointBackgroundColor: 'rgb(59, 130, 246)',
          pointBorderColor: '#000',
          pointBorderWidth: 2,
        },
      ],
    };
  }, [dashboardData]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#09090b',
        titleFont: { size: 14, weight: '900' },
        padding: 16,
        cornerRadius: 16,
        displayColors: false,
      }
    },
    scales: {
      y: { display: false, min: 0, max: 100 },
      x: { grid: { display: false }, ticks: { color: '#52525b', font: { weight: '800' } } }
    }
  };

  if (!dashboardData) {
    return (
      <DashboardLayout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-6">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-black tracking-widest uppercase text-sm italic">Synchronizing your matrix...</p>
        </div>
      </DashboardLayout>
    );
  }

  const avgFluency = dashboardData.metrics_preview?.length > 0
    ? Math.round(dashboardData.metrics_preview.reduce((sum, m) => sum + (m.speech_clarity || 0), 0) / dashboardData.metrics_preview.length)
    : 0;

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 px-2">
        <div className="max-w-2xl px-2">
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-4 italic italic">
            Dashboard <span className="premium-gradient-text not-italic">Overview</span>
          </h2>
          <p className="text-zinc-500 text-xl font-medium tracking-wide">
            Welcome back, <span className="text-white font-black">{dashboardData.user_profile?.name || "User"}</span>! Track your communication journey.
          </p>
        </div>

        <Link
          to="/practice"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-12 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-center group"
        >
          <span className="flex items-center justify-center gap-3">
            Start New Session
            <span className="group-hover:translate-x-2 transition-transform italic text-2xl">→</span>
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        <StatCard icon="🎯" label="Confidence Score" value={dashboardData.metrics_preview?.[0]?.confidence_score || 0} unit="%" color="blue" delay="delay-100" />
        <StatCard icon="🔥" label="Total Sessions" value={dashboardData.history_preview?.length || 0} unit="Sess" color="green" delay="delay-200" />
        <StatCard icon="🎙️" label="Avg Fluency" value={avgFluency} unit="%" color="purple" delay="delay-300" />
        <StatCard icon="📉" label="Progress" value={dashboardData.metrics_preview?.length ? "ON TRACK" : "STARTING"} color="pink" delay="delay-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 glass-card p-10 md:p-14 min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-3xl font-black text-white italic mb-2">Confidence Trend</h3>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">AI Performance Analytics</p>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[300px]">
            {chartData ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-4">
                <span className="text-6xl">📊</span>
                <p className="font-black text-sm uppercase tracking-widest">Insufficient data for trend projection</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass-card p-10 md:p-12 flex flex-col">
          <h3 className="text-3xl font-black mb-10 text-white italic">Recent History</h3>
          <div className="space-y-6 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {dashboardData.history_preview?.length > 0 ? (
              dashboardData.history_preview.map((session, i) => (
                <HistoryItem key={i} session={session} delay={`delay-${(i % 3) * 100 + 100}`} />
              ))
            ) : (
              <p className="text-zinc-600 text-sm font-black uppercase tracking-widest text-center mt-20">No activity logged in the matrix</p>
            )}
          </div>
          <Link
            to="/progress"
            className="mt-12 block w-full text-center py-5 rounded-2xl border border-white/5 bg-white/[0.03] text-zinc-400 font-black tracking-[0.2em] uppercase text-xs hover:border-white/20 hover:text-white transition-all active:scale-95"
          >
            View Full Timeline
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default memo(Dashboard);
