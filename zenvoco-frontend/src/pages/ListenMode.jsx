import React, { useState, useRef, useEffect, memo, useCallback } from "react";
import DashboardLayout from "../layout/DashboardLayout";

const EXAMPLES = [
  {
    id: "self-intro",
    label: "Self Introduction",
    audio: "/audio/self-intro.mp3",
    duration: "1:20",
    transcript: "Good morning. My name is Anil Varma, a final-year CS student. I specialize in building human-centric AI applications that bridge the gap between research and real-world utility. My latest project reduced data processing times by 40%.",
    insights: ["Strong hook with name and specialization", "Quantifiable impact (40%)", "Clear, deliberate pacing"],
    keyTechniques: ["Dynamic Emphasis", "Structural Pausing"]
  },
  {
    id: "interview",
    label: "Interview Answer",
    audio: "/audio/interview.mp3",
    duration: "1:45",
    transcript: "In my third year, I led a team of four to win the state hackathon. The challenge was building a disaster management system in 36 hours. I managed the backend and ensured real-time synchronization under high-pressure conditions.",
    insights: ["Follows the STAR framework clearly", "Demonstrates leadership and collaboration", "Confident tone throughout"],
    keyTechniques: ["STAR Structure", "Quantification"]
  },
  {
    id: "presentation",
    label: "Presentation Opening",
    audio: "/audio/presentation.mp3",
    duration: "0:45",
    transcript: "Imagine spending four years building a product no one uses. That's the reality for 90% of startups. Today, I'll show you how we can flip that statistic using empathy-driven design. Let's dive in.",
    insights: ["Shock statistic used as a hook", "Strong roadmap established early", "High-energy delivery"],
    keyTechniques: ["Hook Sentence", "Audience Engagement"]
  },
];

const TechniqueBadge = memo(({ label }) => (
  <span className="px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] italic">
     {label}
  </span>
));

const ListenMode = () => {
    const [selectedId, setSelectedId] = useState("self-intro");
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showTranscript, setShowTranscript] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef(null);
    const example = EXAMPLES.find((e) => e.id === selectedId);

    useEffect(() => {
       resetPlayback();
    }, [selectedId]);

    const togglePlayback = useCallback(() => {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }, [isPlaying]);

    const resetPlayback = useCallback(() => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        setShowTranscript(false);
      }
    }, []);

    const handleTimeUpdate = useCallback(() => {
      if (!audioRef.current) return;
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      setCurrentTime(current);
      if (dur) {
        setDuration(dur);
        setProgress((current / dur) * 100);
      }
    }, []);

    const formatTime = useCallback((time) => {
      const min = Math.floor(time / 60);
      const sec = Math.floor(time % 60).toString().padStart(2, "0");
      return `${min}:${sec}`;
    }, []);

    const seek = useCallback((e) => {
      if (!audioRef.current || !audioRef.current.duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pct * audioRef.current.duration;
    }, []);

    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto py-10 px-4">
          <header className="mb-20 animate-fade-in">
              <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 italic">
                Listen <span className="premium-gradient-text not-italic">Mode</span>
              </h2>
              <p className="text-zinc-500 text-xl font-medium tracking-wide">Analyze archival metadata of professional phonetic transmissions.</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-16 items-start">
             {/* Sidebar */}
             <div className="space-y-4">
                <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-6 italic">Archival selection</p>
                {EXAMPLES.map((ex) => (
                   <button
                    key={ex.id}
                    onClick={() => setSelectedId(ex.id)}
                    className={`group w-full text-left px-8 py-6 rounded-[2rem] transition-all duration-500 border-2 transform active:scale-95 ${
                      selectedId === ex.id
                        ? "bg-blue-600 border-blue-500 text-white shadow-2xl shadow-blue-600/20 shadow-xl ring-4 ring-blue-500/10"
                        : "bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/10 hover:text-white"
                    }`}
                   >
                     <div className="flex items-center justify-between">
                        <div>
                           <p className={`text-xs font-black uppercase tracking-widest mb-1 ${selectedId === ex.id ? "text-blue-200" : "text-zinc-600"}`}>Module Item</p>
                           <h4 className="text-xl font-black italic tracking-tight uppercase">{ex.label}</h4>
                        </div>
                        <span className={`text-sm font-black italic uppercase ${selectedId === ex.id ? "text-white" : "text-zinc-700 font-bold"}`}>{ex.duration}</span>
                     </div>
                   </button>
                ))}

                <div className="mt-12 glass-card p-10 bg-zinc-900/40 border-white/5 shadow-2xl ring-1 ring-white/5 italic">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">Listening Objective</h4>
                  <p className="text-lg text-zinc-400 font-medium leading-relaxed">
                    Focus on the <span className="text-white font-black italic">tonal cadence</span> and <span className="text-white font-black italic">dynamic emphasis</span> of these transmissions.
                  </p>
                </div>
             </div>

             {/* Player Arena */}
             <div className="lg:col-span-2 space-y-16 animate-fade-in">
                <div className="glass-card p-12 md:p-24 border-2 border-white/5 bg-zinc-950/80 backdrop-blur-3xl shadow-[0_40px_80px_-40px_rgba(37,99,235,0.2)] overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] -z-10" />
                   
                   <audio
                    ref={audioRef}
                    src={example.audio}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                   />

                   <div className="flex flex-col items-center gap-12 text-center">
                      <div className="text-9xl mb-4 relative">
                        🎧
                        {isPlaying && (
                          <div className="absolute -inset-10 border-4 border-blue-600/20 rounded-full animate-ping -z-10" />
                        )}
                      </div>
                      <div className="space-y-4">
                        <span className="px-5 py-2 rounded-full bg-blue-600/20 text-blue-400 text-xs font-black uppercase tracking-[0.4em] italic ring-1 ring-blue-500/20">Archival Signal</span>
                        <h3 className="text-4xl md:text-7xl font-black italic text-white tracking-tighter uppercase">{example.label}</h3>
                      </div>

                      <div className="w-full space-y-6">
                        <div 
                          onClick={seek}
                          className="w-full h-8 md:h-12 bg-zinc-900 border border-white/10 rounded-[1.5rem] cursor-pointer relative group overflow-hidden shadow-inner p-1 md:p-2"
                        >
                          <div 
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300 relative"
                            style={{ width: `${progress}%` }}
                          >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-white rounded-full shadow-2xl ring-4 ring-blue-600/30 group-hover:scale-125 transition-transform" />
                          </div>
                        </div>
                        <div className="flex justify-between text-xl font-black italic text-zinc-600 tabular-nums">
                          <span>{formatTime(currentTime)}</span>
                          <span>{formatTime(duration || 0)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <button
                          onClick={togglePlayback}
                          className="h-28 w-28 md:h-40 md:w-40 rounded-[2.5rem] bg-blue-600 text-white flex items-center justify-center text-4xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.6)] hover:bg-white hover:text-blue-600 hover:-translate-y-2 transition-all duration-500 active:scale-90 italic ring-8 ring-blue-500/10"
                        >
                          {isPlaying ? "PAUSE" : "ENGAGE"}
                        </button>
                        <button
                          onClick={resetPlayback}
                          className="h-20 w-20 md:h-24 md:w-24 rounded-3xl bg-zinc-900 border border-white/5 text-zinc-500 flex items-center justify-center text-2xl hover:bg-zinc-800 hover:text-white transition-all active:scale-90 shadow-2xl"
                        >
                          ⟲
                        </button>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="glass-card p-10 md:p-14 space-y-8 border-white/5 ring-1 ring-white/5">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 italic">Core Techniques</h4>
                      <div className="flex flex-wrap gap-4">
                         {example.keyTechniques.map((t, i) => <TechniqueBadge key={i} label={t} />)}
                      </div>
                   </div>
                   <div className="glass-card p-10 md:p-14 space-y-8 border-white/5 ring-1 ring-white/5">
                      <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 italic">Performance Insights</h4>
                      <ul className="space-y-6">
                         {example.insights.map((ins, i) => (
                           <li key={i} className="flex gap-4 group">
                              <span className="text-blue-500 font-black italic">✦</span>
                              <span className="text-zinc-500 font-medium group-hover:text-zinc-300 transition-colors italic">{ins}</span>
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>

                <div className="glass-card overflow-hidden transition-all duration-700 ring-1 ring-white/10 shadow-2xl">
                   <button 
                    onClick={() => setShowTranscript(!showTranscript)}
                    className="w-full p-8 bg-zinc-950 border-b border-white/5 flex items-center justify-between hover:bg-zinc-900 transition-colors group"
                   >
                     <span className="text-xl font-black italic uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">Neural Transcript</span>
                     <span className={`text-4xl transition-transform duration-500 ${showTranscript ? "rotate-180" : ""}`}>↓</span>
                   </button>
                   {showTranscript && (
                     <div className="p-10 md:p-20 bg-zinc-950/40 animate-fade-in">
                        <p className="text-3xl md:text-5xl font-black text-white italic leading-[1.2] max-w-5xl tracking-tight transition-all">
                          "{example.transcript}"
                        </p>
                        <div className="mt-16 pt-8 border-t border-white/5 text-zinc-600 font-black tracking-widest text-xs uppercase italic pl-2">Signal processed by Zenvoco Synthesis Engine</div>
                     </div>
                   )}
                </div>
             </div>
          </div>
        </div>
      </DashboardLayout>
    );
};

export default memo(ListenMode);