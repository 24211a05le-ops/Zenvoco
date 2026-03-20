import React, { useState, useEffect, memo, useCallback } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../api/api";
import AudioInput from "../components/AudioInput";

const DailyTask = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [completing, setCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await API.get("/tasks/today");
        console.log("Daily Task API Response:", response.data);
        if (response.data?.message) {
          setTask(null);
        } else {
          setTask(response.data);
        }
      } catch (error) {
        console.error("Error fetching daily task:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  const handleAudioReady = useCallback((blob, dur) => {
    setAudioBlob(blob);
    setAudioDuration(dur);
  }, []);

  const submitTask = async () => {
    if (!audioBlob || !task) return;
    setCompleting(true);
    try {
      // Simulate backend processing and saving
      await API.post("/tasks/submit", {
        task_id: task.id,
        audio_path: "uploads/daily_task_answer.webm"
      });
      setIsCompleted(true);
    } catch (err) {
      console.error("Task submission failed:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-10">
          <div className="w-16 h-16 border-8 border-blue-600 border-t-transparent rounded-full animate-spin shadow-2xl"></div>
          <p className="text-zinc-600 font-black tracking-[0.4em] uppercase text-sm italic">Synchronizing daily curriculum data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <header className="mb-20 animate-fade-in">
          <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 italic italic">
            Daily <span className="premium-gradient-text not-italic">Task</span>
          </h2>
          <p className="text-zinc-500 text-xl font-medium tracking-wide">
            {isCompleted 
              ? "Synthesis confirmed. Daily quota fulfilled." 
              : "Synchronizing your neural pathways with the daily objective."}
          </p>
        </header>

        {isCompleted ? (
          <div className="glass-card p-12 md:p-32 text-center animate-fade-in shadow-2xl border-white/5 ring-1 ring-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-50" />
            <div className="w-32 h-32 bg-blue-600 rounded-[2.5rem] flex items-center justify-center text-white text-6xl shadow-2xl shadow-blue-600/30 mx-auto mb-16 ring-8 ring-blue-500/10">
              ✓
            </div>
            <h3 className="text-4xl md:text-7xl font-black italic mb-6 tracking-tight">Mission Success</h3>
            <p className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-2xl mx-auto leading-relaxed px-4">
              Your transmission has been logged and the performance metadata has been synthesized into the central matrix.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <button 
                onClick={() => window.location.href = "/dashboard"} 
                className="px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xl italic transition-all shadow-xl active:scale-95 ring-4 ring-blue-500/10"
              >
                Return to Matrix
              </button>
              <button 
                onClick={() => setIsCompleted(false)} 
                className="px-12 py-5 text-zinc-600 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors italic border border-white/5 bg-zinc-900 rounded-2xl active:scale-95"
              >
                Redo Transmission
              </button>
            </div>
          </div>
        ) : task ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch animate-fade-in">
            <div className="flex flex-col gap-10">
              <div className="glass-card p-12 md:p-24 flex-1 border-l-8 border-blue-600 shadow-2xl ring-1 ring-white/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />
                 <p className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-10 pl-2">Daily Objective: {new Date().toLocaleDateString()}</p>
                 <h3 className="text-3xl md:text-6xl font-black text-white italic leading-[1.1] max-w-3xl">
                   "{task.title || task.topic || "Explain why you chose your professional field today."}"
                 </h3>
                 <div className="mt-16 space-y-8 max-w-xl">
                   <p className="text-zinc-500 text-lg md:text-xl font-medium tracking-wide leading-relaxed italic">
                     Focus on clarity, cadence, and structural integrity.
                   </p>
                   <div className="flex flex-column gap-6 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-3xl ring-1 ring-white/5 shadow-inner">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 text-2xl shrink-0">💡</div>
                      <p className="text-zinc-600 font-bold text-sm tracking-tight italic">
                        The AI Interviewer is analyzing your phonetic patterns for fluency and confidence. Avoid filler word repetition.
                      </p>
                   </div>
                 </div>
              </div>
            </div>

            <div className="flex flex-col gap-10">
               <div className="glass-card p-12 md:p-14 shadow-2xl border-white/10 ring-1 ring-blue-500/20 flex flex-col items-center justify-center flex-1 min-h-[500px]">
                 <p className="text-xs font-black uppercase tracking-[0.4em] text-zinc-500 mb-16 italic text-center w-full">Input Transmission Protocol</p>
                 <AudioInput
                    onAudioReady={handleAudioReady}
                    onReset={() => { setAudioBlob(null); setAudioDuration(0); }}
                    disabled={completing}
                 />
                 {audioBlob && !completing && (
                    <div className="pt-20 animate-fade-in w-full flex justify-center">
                      <button
                        onClick={submitTask}
                        className="w-full md:w-auto px-20 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-3xl font-black text-2xl transition-all shadow-xl active:scale-95 italic ring-4 ring-blue-500/20"
                      >
                        Commit Transmission <span className="text-3xl ml-4">→</span>
                      </button>
                    </div>
                 )}
                 {completing && (
                  <div className="pt-20 flex flex-col items-center gap-10 animate-fade-in text-center w-full">
                    <div className="w-16 h-16 border-8 border-blue-600 border-t-transparent rounded-full animate-spin shadow-2xl" />
                    <span className="text-blue-500 font-black text-2xl italic tracking-tight uppercase">Logging Metadata into Core Matrix...</span>
                  </div>
                 )}
               </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-24 text-center animate-fade-in shadow-2xl border-white/5 ring-1 ring-white/5 flex flex-col items-center gap-10">
             <span className="text-9xl grayscale opacity-30 italic">💤</span>
             <div>
               <h3 className="text-4xl md:text-7xl font-black italic mb-6 tracking-tight uppercase">Quota Finalized</h3>
               <p className="text-xl md:text-3xl text-zinc-500 font-medium max-w-2xl px-4">The matrix has synchronized all daily objectives. Synchronizing again tomorrow.</p>
             </div>
             <button
               onClick={() => window.location.href = "/dashboard"}
               className="mt-10 px-16 py-6 bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-2xl font-black text-xl italic transition-all shadow-xl active:scale-95 ring-1 ring-white/10"
             >
                Return to Overview
             </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default memo(DailyTask);
