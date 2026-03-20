import React, { useState, memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../api/api";
import AudioInput from "../components/AudioInput";

const TOPICS = [
  {
    label: "Describe a challenging situation you faced and how you handled it.",
    category: "Behavioural",
    color: "blue",
    difficulty: "Moderate",
    icon: "🧩"
  },
  {
    label: "Give a 60-second self-introduction for a professional setting.",
    category: "Introduction",
    color: "green",
    difficulty: "Beginner",
    icon: "👤"
  },
  {
    label: "Open a 5-minute presentation on a technology you're passionate about.",
    category: "Presentation",
    color: "purple",
    difficulty: "Advanced",
    icon: "📊"
  },
  {
    label: "Describe a project you're proud of and explain the impact it had.",
    category: "Project Pitch",
    color: "pink",
    difficulty: "Moderate",
    icon: "🚀"
  },
  {
    label: "Answer: 'Where do you see yourself in 5 years?' clearly and confidently.",
    category: "Career",
    color: "cyan",
    difficulty: "Beginner",
    icon: "🗺️"
  },
];

const TopicCard = memo(({ topic, onSelect }) => (
  <button
    onClick={() => onSelect(topic)}
    className={`group w-full glass-card p-10 md:p-14 text-left border-2 border-transparent transition-all duration-500 hover:border-${topic.color}-500/50 hover:-translate-y-2 hover:bg-zinc-900 shadow-2xl animate-fade-in ring-1 ring-white/5`}
  >
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          <span className="text-3xl md:text-5xl group-hover:scale-125 transition-transform duration-500">{topic.icon}</span>
          <span className={`px-5 py-2 rounded-full font-black text-[10px] md:text-xs tracking-[0.2em] uppercase bg-${topic.color}-500/10 text-${topic.color}-400 ring-1 ring-${topic.color}-500/20`}>
            {topic.category}
          </span>
          <span className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] md:text-xs italic">{topic.difficulty}</span>
        </div>
        <h3 className="text-2xl md:text-4xl font-black text-white italic leading-tight group-hover:text-${topic.color}-400 transition-colors">
          "{topic.label}"
        </h3>
      </div>
      <div className={`w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-2xl group-hover:bg-${topic.color}-500 group-hover:text-white group-hover:border-${topic.color}-500 transition-all duration-500 shrink-0`}>
        →
      </div>
    </div>
  </button>
));

const GuidedPractice = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [uploading, setUploading] = useState(false);

  const selectTopic = useCallback((topic) => {
    setSelectedTopic(topic);
    setAudioBlob(null);
    setAudioDuration(0);
  }, []);

  const handleAudioReady = useCallback((blob, dur) => {
    setAudioBlob(blob);
    setAudioDuration(dur);
  }, []);

  const submitAudio = async () => {
    if (!audioBlob) return;
    setUploading(true);
    try {
      const sessionRes = await API.post("/practice/start", { topic: selectedTopic.label });
      const sessionId = sessionRes.data.session_id;

      const formData = new FormData();
      formData.append("audio", audioBlob, "practice.webm");
      formData.append("session_id", sessionId);
      formData.append("duration", audioDuration || 1);

      const response = await API.post("/practice/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/result", { state: response.data });
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Analysis failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <header className="mb-20 animate-fade-in flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 italic italic">
              Guided <span className="premium-gradient-text not-italic">Practice</span>
            </h2>
            <p className="text-zinc-500 text-xl font-medium tracking-wide">
              {selectedTopic 
                ? `Topic Locked: ${selectedTopic.category}` 
                : "Choose a curriculum item to initiate neural adaptation."}
            </p>
          </div>
          {selectedTopic && (
            <button
              onClick={() => { setSelectedTopic(null); setAudioBlob(null); }}
              className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 italic ring-1 ring-white/10"
            >
              ← Terminate Subject
            </button>
          )}
        </header>

        {!selectedTopic && (
          <div className="space-y-10 animate-fade-in">
            <p className="text-blue-500 font-black text-xs uppercase tracking-[0.4em] mb-10 pl-2">Selection Logic: Pending Speaker Input</p>
            {TOPICS.map((topic, i) => (
              <TopicCard key={i} topic={topic} onSelect={selectTopic} />
            ))}
          </div>
        )}

        {selectedTopic && (
          <div className="animate-fade-in space-y-16">
            <div className={`glass-card p-12 md:p-24 border-l-8 border-${selectedTopic.color}-500 relative overflow-hidden ring-1 ring-white/5 shadow-2xl`}>
               <div className={`absolute top-0 right-0 w-[400px] h-[400px] bg-${selectedTopic.color}-500/5 rounded-full blur-[100px] -z-10`} />
               <div className="flex items-center gap-6 mb-10">
                  <span className="text-5xl md:text-7xl">{selectedTopic.icon}</span>
                  <div>
                    <span className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] bg-${selectedTopic.color}-500/10 text-${selectedTopic.color}-400 ring-1 ring-${selectedTopic.color}-500/20`}>
                      {selectedTopic.category}
                    </span>
                    <p className="text-zinc-600 font-bold uppercase tracking-widest text-[10px] mt-2 pl-1 italic">{selectedTopic.difficulty}</p>
                  </div>
               </div>
               <h3 className="text-3xl md:text-6xl font-black text-white italic leading-tight max-w-4xl">
                 "{selectedTopic.label}"
               </h3>
               <p className="text-zinc-500 text-lg md:text-xl font-medium mt-10 max-w-2xl leading-relaxed italic">
                 Observe the prompt. Record your transmission. We will synthesize performance metadata in real-time.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
               <div className="lg:col-span-2 glass-card p-10 md:p-14 shadow-2xl border-white/5 ring-1 ring-white/10">
                 <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 mb-10 italic">Input Transmission Controller</p>
                 <AudioInput
                    onAudioReady={handleAudioReady}
                    onReset={() => { setAudioBlob(null); setAudioDuration(0); }}
                    disabled={uploading}
                 />
                 {audioBlob && !uploading && (
                    <div className="pt-16 animate-fade-in">
                      <button
                        onClick={submitAudio}
                        className="w-full md:w-auto px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-2xl transition-all shadow-xl active:scale-95 italic ring-4 ring-blue-500/20"
                      >
                        Initiate Analysis Synthesis <span className="text-3xl ml-4">→</span>
                      </button>
                    </div>
                 )}
                 {uploading && (
                  <div className="pt-16 flex items-center gap-6 animate-fade-in">
                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg" />
                    <span className="text-blue-500 font-black text-xl italic tracking-tight uppercase">Neural Synthesis in Progress...</span>
                  </div>
                 )}
               </div>

               <div className="glass-card p-10 md:p-14 bg-zinc-950/80 shadow-2xl border-white/5">
                 <h4 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-600 mb-10 pl-1">💡 COGNITIVE ASSISTANT</h4>
                 <ul className="space-y-10">
                  <li className="flex gap-6 group">
                    <span className="text-blue-500 font-black text-3xl transition-transform group-hover:scale-125 duration-500 italic">01</span>
                    <p className="text-zinc-500 font-medium text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">Articulate complete thought patterns — minimize divergence.</p>
                  </li>
                  <li className="flex gap-6 group">
                    <span className="text-purple-500 font-black text-3xl transition-transform group-hover:scale-125 duration-500 italic">02</span>
                    <p className="text-zinc-500 font-medium text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">Leverage static pauses as structural reinforcement.</p>
                  </li>
                  <li className="flex gap-6 group">
                    <span className="text-cyan-500 font-black text-3xl transition-transform group-hover:scale-125 duration-500 italic">03</span>
                    <p className="text-zinc-500 font-medium text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">Maintain Context → Action → Result hierarchy.</p>
                  </li>
                 </ul>
               </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default memo(GuidedPractice);