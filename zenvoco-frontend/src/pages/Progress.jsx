import React, { useEffect, useState, useMemo, memo } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../api/api";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const AnalysisCard = memo(({ label, value, unit, color, delay }) => (
  <div className={`glass-card p-12 flex flex-col items-center text-center animate-fade-in ${delay} shadow-2xl transition-all hover:-translate-y-2 ring-1 ring-white/5`}>
    <h4 className="text-zinc-600 font-black uppercase text-xs tracking-[0.4em] mb-4 italic pl-1">{label}</h4>
    <p className={`text-4xl md:text-7xl font-black italic tracking-tighter text-${color}-500 drop-shadow-sm`}>
      {value}<span className="text-xl md:text-2xl not-italic ml-2 opacity-50">{unit}</span>
    </p>
  </div>
));

const TimelineItem = memo(({ record, index, delay }) => (
  <div className={`glass-card p-8 md:p-14 mb-10 overflow-hidden relative group animate-fade-in ${delay} border-l-8 border-blue-600 shadow-2xl transition-all hover:bg-zinc-900/60 ring-1 ring-white/5`}>
    <div className="flex flex-col md:flex-row gap-10 items-stretch">
      <div className="flex-1 flex flex-col justify-center">
        <p className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-4 pl-1">Transmission #{index + 1}</p>
        <h4 className="text-2xl md:text-5xl font-black italic text-white mb-6 leading-tight">"{record.topic || "Practice Session"}"</h4>
        <div className="flex items-center gap-6 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-3xl ring-1 ring-white/10 shadow-inner w-fit">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 text-xl italic font-black">📅</div>
          <p className="text-zinc-500 font-black text-sm uppercase tracking-widest">{new Date(record.date).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 shrink-0 md:border-l border-white/5 md:pl-10">
        <div className="text-center p-6 rounded-[2rem] bg-zinc-950 ring-1 ring-white/5 shadow-inner">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2 italic">Confidence</p>
           <p className="text-3xl md:text-5xl font-black italic text-blue-500">{record.confidence_score}<span className="text-lg ml-1 not-italic opacity-50">%</span></p>
        </div>
        <div className="text-center p-6 rounded-[2rem] bg-zinc-950 ring-1 ring-white/5 shadow-inner">
           <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2 italic">Duration</p>
           <p className="text-3xl md:text-5xl font-black italic text-purple-500">{record.duration}<span className="text-lg ml-1 not-italic opacity-50">S</span></p>
        </div>
      </div>
    </div>
  </div>
));

const Progress = () => {
    const [progressData, setProgressData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
          try {
            const response = await API.get("/progress/");
            console.log("Progress API Response:", response.data);
            setProgressData(response.data);
          } catch (error) {
            console.error("Error fetching progress:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchProgress();
    }, []);

    const chartData = useMemo(() => {
      if (!progressData?.timeline_metrics?.length) return null;
      return {
        labels: progressData.timeline_metrics.slice(-10).map((_, i) => `S-${i + 1}`),
        datasets: [
          {
            fill: true,
            label: 'Confidence Matrix',
            data: progressData.timeline_metrics.slice(-10).map(m => m.confidence_score || 0),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            tension: 0.4,
            pointRadius: 8,
            pointBackgroundColor: 'rgb(59, 130, 246)',
            pointHoverRadius: 12,
            pointBorderColor: '#000',
            pointBorderWidth: 3,
          },
        ],
      };
    }, [progressData]);

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#09090b',
          titleFont: { size: 16, weight: '900' },
          padding: 20,
          cornerRadius: 20,
          displayColors: false,
        }
      },
      scales: {
        y: { display: false, min: 0, max: 100 },
        x: { grid: { display: false }, ticks: { color: '#52525b', font: { weight: '800' } } }
      }
    };

    if (loading) {
      return (
        <DashboardLayout>
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-10">
            <div className="w-20 h-20 border-8 border-blue-600 border-t-transparent rounded-full animate-spin shadow-2xl"></div>
            <p className="text-zinc-600 font-black tracking-[0.5em] uppercase text-sm italic">Accessing cumulative performance metadata...</p>
          </div>
        </DashboardLayout>
      );
    }

    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto py-10 px-4">
          <header className="mb-20 animate-fade-in flex flex-col lg:flex-row justify-between lg:items-end gap-10">
             <div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 italic italic">
                Performance <span className="premium-gradient-text not-italic">Matrix</span>
              </h2>
              <p className="text-zinc-500 text-xl font-medium tracking-wide">Synthesizing cumulative growth metadata across the global matrix.</p>
             </div>
             <div className="flex flex-col gap-4 p-8 rounded-3xl bg-zinc-900 border border-white/5 shadow-2xl ring-1 ring-white/10 italic font-black text-sm uppercase tracking-[0.2em] min-w-[300px] text-center">
                GLOBAL PROGRESS STATUS: ACTIVE
                <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }}></div>
                </div>
             </div>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-24">
             <AnalysisCard label="Synthesis Count" value={progressData.total_sessions} unit="Sess" color="blue" delay="delay-100" />
             <AnalysisCard label="Current Strength" value={progressData.latest_confidence_score} unit="%" color="purple" delay="delay-200" />
             <AnalysisCard label="Avg Duration" value={progressData.avg_duration} unit="Sec" color="cyan" delay="delay-300" />
          </div>

          <div className="glass-card p-10 md:p-20 min-h-[500px] flex flex-col mb-32 relative overflow-hidden animate-fade-in shadow-2xl ring-1 ring-white/10">
            <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -z-10" />
            <h3 className="text-3xl md:text-5xl font-black text-white italic mb-16 border-l-8 border-blue-600 pl-8">Confidence Trajectory</h3>
            <div className="flex-1 min-h-[350px]">
              {chartData ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600">No trajectory logged yet</div>
              )}
            </div>
            <div className="mt-16 text-center">
               <p className="text-zinc-500 font-black uppercase tracking-[0.4em] text-xs italic">Neural Growth Projection Active</p>
            </div>
          </div>

          <div className="space-y-16">
            <h3 className="text-3xl md:text-6xl font-black mb-16 italic text-white flex items-center gap-6">
               <span className="w-16 h-1 bg-zinc-800" />
               Cumulative Timeline
               <span className="w-16 h-1 bg-zinc-800" />
            </h3>
            {progressData.timeline_metrics?.length > 0 ? (
              [...progressData.timeline_metrics].reverse().map((record, i) => (
                <TimelineItem key={i} index={progressData.timeline_metrics.length - 1 - i} record={record} delay={`delay-${(i % 3) * 100 + 100}`} />
              ))
            ) : (
              <div className="glass-card p-24 text-center grayscale opacity-30 italic font-black text-4xl uppercase tracking-[0.2em] shadow-inner text-zinc-500">
                Timeline matrix is current empty
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
    );
};

export default memo(Progress);