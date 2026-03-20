import React, { useState, memo } from "react";
import DashboardLayout from "../layout/DashboardLayout";

// ─── Full content library ───────────────────────────────────────────────────
const TOPICS = [
  {
    id: "self-intro",
    label: "Self Introduction",
    icon: "🙋",
    color: "blue",
    tagline: "Your first 60 seconds shape the entire conversation.",
    explanation:
      "A strong self-introduction is concise, confident, and tailored to the audience. It tells them who you are, what you do, and why you matter — without sounding scripted.",
    structure: [
      { step: "Greeting", detail: "Open with a warm, clear greeting and your full name." },
      { step: "Background", detail: "2–3 sentences on your academic or professional background." },
      { step: "Strengths", detail: "Highlight 1–2 key skills with a quick example." },
      { step: "Goal", detail: "Close with your ambition or what you're looking for." },
    ],
    hints: [
      "Time yourself — aim for 60–90 seconds, not longer.",
      "Maintain eye contact or look into the camera on video calls.",
      "Smile naturally; warmth is as important as content.",
      "Avoid starting with 'So…' or 'Um…' — they undercut confidence.",
    ],
    sample:
      "\"Good morning. I'm Anil Varma, a final-year Computer Science student at VIT with a focus on AI and full-stack development. I've built production-level web apps during internships, most recently a real-time analytics dashboard that reduced report time by 40%. I'm passionate about bridging AI research with user-facing products, and I'm excited about the opportunity to contribute here.\"",
    dos: ["Use specific numbers and outcomes", "Practice until it feels natural", "Match tone to the room (formal vs casual)"],
    donts: ["Don't read from a script", "Don't over-explain your entire history", "Avoid filler words like 'basically' or 'like'"],
  },
  {
    id: "interview",
    label: "Interview Questions",
    icon: "💼",
    color: "purple",
    tagline: "Structure beats memory every time.",
    explanation:
      "Behavioural and situational interview questions test how you think and act, not just what you know. Using the STAR framework (Situation, Task, Action, Result) makes every answer compelling and structured.",
    structure: [
      { step: "Situation", detail: "Set the context — where, when, and the key challenge." },
      { step: "Task", detail: "Explain your specific responsibility in that situation." },
      { step: "Action", detail: "Describe what YOU did (use 'I', not 'we')." },
      { step: "Result", detail: "Share the measurable outcome and what you learned." },
    ],
    hints: [
      "Prepare 5–6 strong STAR stories that can adapt to many questions.",
      "Always quantify results when possible (%, time, money, users).",
      "If asked about weaknesses, show growth, not flaws.",
      "Pause briefly before answering — it shows deliberate thinking.",
    ],
    sample:
      "\"Tell me about a time you handled a tight deadline.\" → \"During my final semester, our team was tasked with delivering a working prototype in 48 hours for a hackathon. My task was to build the data pipeline. I prioritised the critical path, skipped non-essential features, and communicated blockers instantly. We finished with 2 hours to spare and won second place among 80 teams.\"",
    dos: ["Use real, specific stories", "Show self-awareness and growth", "End with what you learned"],
    donts: ["Don't be vague — 'we did stuff' is not an answer", "Don't speak for more than 90 seconds per answer", "Don't bad-mouth previous employers"],
  },
  {
    id: "presentation",
    label: "Presentation Openings",
    icon: "🎤",
    color: "green",
    tagline: "You have 30 seconds to earn their attention.",
    explanation:
      "The opening of any presentation determines whether your audience leans in or tunes out. Great openers hook attention with a question, a bold claim, a surprising fact, or a short story — before the slide content even begins.",
    structure: [
      { step: "Hook", detail: "Open with a question, statistic, or short anecdote." },
      { step: "Relevance", detail: "Tell them why this topic matters to them specifically." },
      { step: "Roadmap", detail: "Give a 1-sentence overview of what you'll cover." },
      { step: "Credibility", detail: "Briefly establish why you're qualified to speak on this." },
    ],
    hints: [
      "Never start with 'Today I will be presenting about…' — it's boring.",
      "Memorize your first 30 seconds word-for-word for maximum confidence.",
      "Vary your pace — slow down for emphasis, speed up for energy.",
      "Use pauses deliberately; silence commands attention.",
    ],
    sample:
      "\"Did you know that 75% of people fear public speaking more than death? Yet the people who speak well consistently earn more, lead more, and influence more. Today I'm going to show you the three techniques that separate forgettable talks from ones people remember for years. Let's begin.\"",
    dos: ["Open with energy and conviction", "Make eye contact with the audience immediately", "Use a pause right after your hook"],
    donts: ["Don't apologise at the start ('Sorry if this is boring…')", "Don't look at your slides when speaking", "Don't rush through the opening"],
  },
  {
    id: "viva",
    label: "Viva & Oral Exams",
    icon: "🎓",
    color: "pink",
    tagline: "Demonstrate understanding, not just memorisation.",
    explanation:
      "A viva (oral examination) tests your depth of understanding and ability to think on your feet. Examiners aren't looking for perfection — they want to see how you reason, how you handle uncertainty, and how deeply you understand your own work.",
    structure: [
      { step: "Clarify", detail: "If unsure, repeat the question back to confirm understanding." },
      { step: "Think Aloud", detail: "Narrate your reasoning even as you work through it." },
      { step: "Anchor to Evidence", detail: "Reference your work, experiments, or literature." },
      { step: "Acknowledge Limits", detail: "Confidently admit what's out of scope or uncertain." },
    ],
    hints: [
      "Review your own submission in detail — examiners often quote it directly.",
      "Saying 'I don't know, but here's how I'd find out' > bluffing.",
      "Speak to all examiners, not just the one who asked the question.",
      "Defend your choices; examiners respect conviction backed by reasoning.",
    ],
    sample:
      "Examiner: 'Why did you choose MongoDB over a relational database?' → \"Good question. My primary consideration was schema flexibility — the user-generated content in my app varied widely in structure, which would have required many nullable columns in SQL. MongoDB let me iterate faster during development, and since my data access patterns were document-centric rather than relational, it was a natural fit for the use case.\"",
    dos: ["Back every claim with a reason", "Stay calm if challenged — it's part of the process", "Speak clearly and at a measured pace"],
    donts: ["Don't say 'because it's better' without justification", "Don't try to bluff technical knowledge", "Don't rush answers — think first"],
  },
];

const COLOR_MAP = {
  blue:   { 
    active: "bg-blue-600 border-blue-500 shadow-blue-600/20",   
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",   
    dot: "bg-blue-500 shadow-blue-500/40",   
    heading: "text-blue-400",   
    glow: "bg-blue-500/5",
    accent: "border-blue-500/50"
  },
  purple: { 
    active: "bg-purple-600 border-purple-500 shadow-purple-600/20", 
    badge: "bg-purple-500/10 text-purple-400 border-purple-500/20", 
    dot: "bg-purple-500 shadow-purple-500/40", 
    heading: "text-purple-400", 
    glow: "bg-purple-500/5",
    accent: "border-purple-500/50"
  },
  green:  { 
    active: "bg-green-600 border-green-500 shadow-green-600/20",  
    badge: "bg-green-500/10 text-green-400 border-green-500/20",  
    dot: "bg-green-500 shadow-green-500/40",  
    heading: "text-green-400",  
    glow: "bg-green-500/5",
    accent: "border-green-500/50"
  },
  pink:   { 
    active: "bg-pink-600 border-pink-500 shadow-pink-600/20",    
    badge: "bg-pink-500/10 text-pink-400 border-pink-500/20",    
    dot: "bg-pink-500 shadow-pink-500/40",   
    heading: "text-pink-400",   
    glow: "bg-pink-500/5",
    accent: "border-pink-500/50"
  },
};

const LearnMode = () => {
    const [selectedId, setSelectedId] = useState("self-intro");
    const [activeTab, setActiveTab]   = useState("guide"); 

    const topic = TOPICS.find((t) => t.id === selectedId);
    const c     = COLOR_MAP[topic.color];

    return (
      <DashboardLayout>
        <div className="max-w-6xl mx-auto py-10 px-4">
          <header className="mb-20 animate-fade-in">
              <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 italic">
                Learn <span className="premium-gradient-text not-italic">Mode</span>
              </h2>
              <p className="text-zinc-500 text-xl font-medium tracking-wide">Study guided frameworks for every high-stakes speaking scenario.</p>
          </header>

          <div className="grid lg:grid-cols-4 gap-12 items-start">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-4 sticky top-10">
               <p className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-6 italic">Core Curriculum</p>
               <div className="space-y-3">
                  {TOPICS.map((t) => {
                    const isActive = selectedId === t.id;
                    const tc = COLOR_MAP[t.color];
                    return (
                      <button
                        key={t.id}
                        onClick={() => { setSelectedId(t.id); setActiveTab("guide"); }}
                        className={`group flex items-center justify-between w-full text-left px-6 py-4.5 rounded-[1.5rem] transition-all duration-300 border-2 transform active:scale-95 ${
                          isActive
                            ? `${tc.active} text-white font-black shadow-xl ring-4 ring-${t.color}-500/10`
                            : "bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/10 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                           <span className={`text-2xl transition-transform duration-500 ${isActive ? "scale-125" : "group-hover:scale-110"}`}>{t.icon}</span>
                           <span className="text-sm font-bold tracking-tight uppercase italic">{t.label}</span>
                        </div>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                      </button>
                    );
                  })}
               </div>

               <div className="mt-12 glass-card p-8 bg-blue-600/5 border-blue-500/10 ring-1 ring-blue-500/10 italic">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-3">Study Tip</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                    Internalize the structure, then use <span className="text-white font-black">Guided Practice</span> to perform real-time neural mapping.
                  </p>
               </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-10 animate-fade-in">
               {/* Hero */}
               <div className={`relative rounded-[2.5rem] p-10 md:p-20 border-2 ${c.accent} bg-zinc-950/80 backdrop-blur-3xl overflow-hidden shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]`}>
                  <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${c.glow} rounded-full blur-[130px] -z-10`} />
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mb-12">
                     <span className="text-7xl md:text-9xl shadow-2xl rounded-3xl p-4 bg-white/5 ring-1 ring-white/10">{topic.icon}</span>
                     <div className="space-y-4">
                        <span className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] ${c.badge}`}>{topic.id.replace("-", " ")} Matrix</span>
                        <h3 className={`text-4xl md:text-7xl font-black italic tracking-tighter text-white leading-none`}>{topic.label}</h3>
                        <p className="text-zinc-500 text-lg md:text-xl font-bold tracking-wide italic">"{topic.tagline}"</p>
                     </div>
                  </div>
                  <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed font-medium max-w-4xl">{topic.explanation}</p>
               </div>

               {/* Tabs */}
               <div className="flex p-1.5 bg-zinc-900/50 border border-white/5 rounded-[2rem] shadow-inner backdrop-blur-3xl w-fit">
                  {[
                    { key: "guide",  label: "Framework", icon: "📐" },
                    { key: "dos",    label: "Do's & Don'ts", icon: "✅" },
                    { key: "sample", label: "Sample", icon: "💬" },
                  ].map(({ key, label, icon }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`px-8 py-3.5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all ${
                        activeTab === key
                          ? "bg-white text-black shadow-2xl shadow-white/10"
                          : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      <span className="mr-2 text-sm">{icon}</span> {label}
                    </button>
                  ))}
               </div>

               <div className="animate-fade-in min-h-[500px]">
                  {activeTab === "guide" && (
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="glass-card p-10 md:p-14 space-y-10 border-white/5 ring-1 ring-white/5 shadow-2xl">
                           <h4 className="text-xs uppercase tracking-[0.4em] font-black text-zinc-500 italic pl-1">Structural Sequence</h4>
                           <div className="space-y-10">
                              {topic.structure.map(({ step, detail }, i) => (
                                <div key={i} className="flex gap-8 group">
                                   <span className={`shrink-0 w-12 h-12 rounded-2xl ${c.dot} text-white font-black text-xl flex items-center justify-center italic shadow-lg ring-4 ring-white/5 transition-transform group-hover:scale-110`}>
                                      {i + 1}
                                   </span>
                                   <div className="space-y-2">
                                      <p className="text-white font-black text-xl italic tracking-tight uppercase">{step}</p>
                                      <p className="text-zinc-500 font-medium text-lg leading-relaxed">{detail}</p>
                                   </div>
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="glass-card p-10 md:p-14 space-y-10 border-white/5 ring-1 ring-white/5 shadow-2xl bg-zinc-950/40">
                           <h4 className="text-xs uppercase tracking-[0.4em] font-black text-zinc-500 italic pl-1">AI Cognitive Hints</h4>
                           <ul className="space-y-10">
                              {topic.hints.map((hint, i) => (
                                <li key={i} className="flex items-start gap-6 group">
                                   <span className={`text-4xl transition-transform duration-500 group-hover:rotate-12`}>🧠</span>
                                   <span className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed group-hover:text-white transition-colors italic">{hint}</span>
                                </li>
                              ))}
                           </ul>
                        </div>
                    </div>
                  )}

                  {activeTab === "dos" && (
                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="glass-card p-10 md:p-14 border border-green-500/10 bg-green-500/[0.02] shadow-2xl ring-1 ring-green-500/10">
                           <h4 className="text-xs uppercase tracking-[0.4em] font-black text-green-500 italic mb-12 pl-1">Transmission Validations</h4>
                           <ul className="space-y-10">
                              {topic.dos.map((item, i) => (
                                <li key={i} className="flex items-start gap-6 group">
                                   <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0 font-black italic">✓</div>
                                   <span className="text-zinc-400 text-xl font-medium leading-relaxed group-hover:text-white transition-colors">{item}</span>
                                </li>
                              ))}
                           </ul>
                        </div>
                        <div className="glass-card p-10 md:p-14 border border-red-500/10 bg-red-500/[0.02] shadow-2xl ring-1 ring-red-500/10">
                           <h4 className="text-xs uppercase tracking-[0.4em] font-black text-red-500 italic mb-12 pl-1">System Rejections</h4>
                           <ul className="space-y-10">
                              {topic.donts.map((item, i) => (
                                <li key={i} className="flex items-start gap-6 group">
                                   <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 shrink-0 font-black italic">✗</div>
                                   <span className="text-zinc-400 text-xl font-medium leading-relaxed group-hover:text-white transition-colors">{item}</span>
                                </li>
                              ))}
                           </ul>
                        </div>
                    </div>
                  )}

                  {activeTab === "sample" && (
                    <div className="glass-card p-12 md:p-24 bg-gradient-to-br from-blue-900/10 via-zinc-950 to-transparent border-2 border-white/5 relative overflow-hidden ring-1 ring-white/5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] group">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] -z-10 group-hover:scale-110 transition-transform duration-1000" />
                        <h4 className="text-xs uppercase tracking-[0.4em] font-black text-zinc-500 mb-12 italic pl-1 flex items-center gap-3">
                           <span className="h-2 w-2 rounded-full bg-blue-500" />
                           Optimal Response Template
                        </h4>
                        <p className="text-3xl md:text-5xl font-black text-white italic leading-[1.2] tracking-tight group-hover:text-blue-200 transition-colors drop-shadow-2xl">
                          "{topic.sample}"
                        </p>
                        <div className="mt-20 pt-10 border-t border-white/5 flex items-center gap-6">
                           <div className="w-12 h-12 rounded-xl bg-zinc-900 flex items-center justify-center text-2xl font-black italic">📌</div>
                           <p className="text-sm text-zinc-500 font-black uppercase tracking-widest italic leading-relaxed">
                             Template status: UNLOCKED. Personalize with real-world metadata before physical performance.
                           </p>
                        </div>
                    </div>
                  )}
               </div>

               {/* CTA */}
               <div className="glass-card p-10 md:p-16 border-2 border-white/5 bg-zinc-950 shadow-2xl ring-1 ring-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="space-y-4 text-center md:text-left">
                    <p className="text-2xl font-black text-white italic uppercase tracking-tight">Cognitive readiness confirmed</p>
                    <p className="text-zinc-500 font-medium text-lg italic">Ready to engage the simulation matrix?</p>
                  </div>
                  <a
                    href="/practice"
                    className="w-full md:w-auto px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 text-center italic group"
                  >
                    Initiate Practice <span className="text-3xl ml-4 inline-block group-hover:translate-x-3 transition-transform">→</span>
                  </a>
               </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
};

export default memo(LearnMode);