import React, { useState, memo, useCallback } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../api/api";
import AudioInput from "../components/AudioInput";

const VIVA_QUESTIONS = [
  "Tell me about a time you had to learn a new technology quickly to complete a project.",
  "Describe a situation where you had to collaborate with a difficult team member. How did you handle it?",
  "Walk me through a project you're especially proud of and explain the impact it had.",
  "How do you handle tight deadlines and competing priorities? Give a specific example.",
];

const TOTAL_QUESTIONS = VIVA_QUESTIONS.length;

const MetricCard = memo(({ label, value, unit, color }) => (
  <div className="glass-card p-6 md:p-8 flex flex-col items-center text-center ring-1 ring-white/5 shadow-2xl animate-fade-in transition-all hover:scale-[1.03] group">
    <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 group-hover:text-zinc-300 transition-colors">{label}</h4>
    <p className={`text-3xl md:text-5xl font-black italic tracking-tighter text-${color}-500 group-hover:drop-shadow-[0_0_10px_rgba(var(--primary),0.5)] transition-all`}>
      {value}<span className="text-xl md:text-2xl ml-1 not-italic opacity-50">{unit}</span>
    </p>
  </div>
));

const BreakdownItem = memo(({ index, entry }) => (
  <div className="glass-card p-8 md:p-14 mb-10 overflow-hidden relative group">
    <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-900/40 rounded-full blur-[80px] -z-10 transition-transform duration-1000 group-hover:scale-150 group-hover:opacity-60" />
    <div className="flex flex-col md:flex-row gap-10">
      <div className="flex-1">
        <p className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-4">Question {index + 1}</p>
        <h4 className="text-2xl md:text-4xl font-black italic text-white mb-6 leading-tight">"{entry.question}"</h4>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 shrink-0">
        <MetricCard label="Fluency" value={entry.metrics.speech_clarity} unit="%" color="green" />
        <MetricCard label="Pace" value={entry.metrics.pace} unit="%" color="blue" />
        <MetricCard label="Confidence" value={entry.metrics.confidence_score} unit="%" color="purple" />
        <MetricCard label="Fillers" value={entry.metrics.filler_words} unit="X" color="red" />
      </div>
    </div>
  </div>
));

const VivaSimulation = () => {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const [allMetrics, setAllMetrics] = useState([]);
  const [lastMetrics, setLastMetrics] = useState(null);

  const submitAnswer = useCallback(async () => {
    if (!audioBlob) return;
    setProcessing(true);
    let metrics = { speech_clarity: 0, confidence_score: 0, pace: 0, filler_words: 0 };

    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "answer.webm");
      const response = await API.post("/speech/analyze", formData, { headers: { "Content-Type": "multipart/form-data" } });
      const { feedback_object } = response.data;
      if (feedback_object?.ai_evaluation) metrics = feedback_object.ai_evaluation;
    } catch (err) {
      console.error("Analysis failed:", err);
    }

    const updated = [...allMetrics, { question: VIVA_QUESTIONS[currentQ], metrics }];
    setAllMetrics(updated);
    setLastMetrics(metrics);
    setAudioBlob(null);

    const nextQ = currentQ + 1;
    if (nextQ >= TOTAL_QUESTIONS) {
      setFinished(true);
    } else {
      setCurrentQ(nextQ);
      setInputKey(k => k + 1);
    }
    setProcessing(false);
  }, [audioBlob, currentQ, allMetrics]);

  const resetSession = useCallback(() => {
    setStarted(false); setCurrentQ(0); setAudioBlob(null); setProcessing(false); setFinished(false);
    setAllMetrics([]); setLastMetrics(null); setInputKey(k => k + 1);
  }, []);

  const avgScore = useCallback((key) => {
    if (!allMetrics.length) return 0;
    return Math.round(allMetrics.reduce((a, b) => a + (Number(b.metrics[key]) || 0), 0) / allMetrics.length);
  }, [allMetrics]);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-10 px-4">
        <header className="mb-20 animate-fade-in flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-4 italic italic">
              Viva <span className="premium-gradient-text not-italic">Simulation</span>
            </h2>
            <p className="text-zinc-500 text-xl font-medium tracking-wide">Test your skills in a realistic AI mock interview environment.</p>
          </div>
          {started && !finished && (
            <div className="flex items-center gap-4 bg-zinc-900 border border-white/5 rounded-3xl p-4 px-6 shadow-2xl ring-1 ring-white/10 italic font-black text-xl">
              <span className="flex h-3 w-3 rounded-full bg-blue-500 animate-pulse" />
              SESSION ACTIVE
            </div>
          )}
        </header>

        {!started && !finished && (
          <div className="glass-card p-12 md:p-32 text-center relative overflow-hidden group shadow-2xl border-white/5 animate-fade-in ring-1 ring-white/5">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none group-hover:scale-110 transition-all duration-1000" />
            <span className="text-8xl md:text-9xl mb-12 block group-hover:scale-110 transition-transform duration-500">🔥</span>
            <h3 className="text-4xl md:text-7xl font-black mb-6 italic tracking-tight">Ready for the heat?</h3>
            <p className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-3xl mx-auto leading-relaxed px-4">
              Face {TOTAL_QUESTIONS} high-pressure questions from our AI Interviewer. Maximize your focus, structure your thoughts, and speak with precision.
            </p>
            <button
              onClick={() => setStarted(true)}
              className="px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-2xl transition-all shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] hover:-translate-y-2 active:scale-95 group shadow-xl"
            >
              Start Simulation <span className="inline-block group-hover:translate-x-2 transition-transform italic text-3xl">→</span>
            </button>
          </div>
        )}

        {started && !finished && (
          <div className="space-y-20 animate-fade-in">
            {/* PROGRESS TRACKER */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-2">Progress Mapping</p>
                  <p className="text-3xl font-black text-white italic">Question {currentQ + 1} of {TOTAL_QUESTIONS}</p>
                </div>
                <p className="text-zinc-500 font-black text-xl tabular-nums italic">{Math.round((currentQ / TOTAL_QUESTIONS) * 100)}% COMPLETE</p>
              </div>
              <div className="h-4 bg-zinc-900 border border-white/5 rounded-full overflow-hidden shadow-inner p-1">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${(currentQ / TOTAL_QUESTIONS) * 100}%` }}
                />
              </div>
            </div>

            {/* AI PERSPECTIVE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div className="glass-card p-12 md:p-20 relative overflow-hidden animate-fade-in">
                 <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -z-10" />
                 <div className="flex items-center gap-4 mb-10">
                   <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-3xl">🤖</div>
                   <h3 className="text-xl font-black uppercase tracking-[0.2em] text-zinc-500">Persona: Interviewer Matrix</h3>
                 </div>
                 <p className="text-3xl md:text-5xl font-black text-white leading-[1.1] italic">
                   "{VIVA_QUESTIONS[currentQ]}"
                 </p>
              </div>

              <div className="glass-card p-12 md:p-14 shadow-2xl border-white/10 ring-1 ring-blue-500/20">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 mb-10 italic">Secure Output Console</p>
                <div className="mb-14">
                  <AudioInput 
                    key={inputKey} 
                    onAudioReady={setAudioBlob} 
                    onReset={() => setAudioBlob(null)} 
                    disabled={processing}
                    compact={true}
                  />
                </div>
                <div className="flex flex-col gap-6">
                  <button
                    onClick={submitAnswer}
                    disabled={!audioBlob || processing}
                    className="w-full py-6 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-2xl font-black text-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 italic"
                  >
                    {processing ? (
                      <>Analyzing Matrix...</>
                    ) : (
                      <>{currentQ === TOTAL_QUESTIONS - 1 ? "Submit Final Synthesis" : "Submit & Next Question"}</>
                    )}
                  </button>
                  <button onClick={resetSession} className="w-full py-5 text-zinc-600 hover:text-red-500 font-bold uppercase tracking-widest text-xs transition-colors italic">Terminate Simulation</button>
                </div>
              </div>
            </div>

            {/* LIVE FEEDBACK PREVIEW */}
            {lastMetrics && (
              <div className="glass-card p-12 md:p-16 border-white/5 animate-fade-in ring-1 ring-white/5">
                <h3 className="text-2xl font-black italic mb-10 flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Last Response Metadata
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                  <MetricCard label="Fluency" value={lastMetrics.speech_clarity} unit="%" color="green" />
                  <MetricCard label="Pace" value={lastMetrics.pace} unit="%" color="blue" />
                  <MetricCard label="Confidence" value={lastMetrics.confidence_score} unit="%" color="purple" />
                  <MetricCard label="Fillers" value={lastMetrics.filler_words} unit="X" color="red" />
                </div>
              </div>
            )}
          </div>
        )}

        {finished && (
          <div className="animate-fade-in space-y-20">
             <div className="glass-card p-20 text-center relative overflow-hidden shadow-2xl border-white/5 ring-1 ring-white/5">
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-50" />
               <span className="text-8xl mb-8 block grayscale opacity-60">🎓</span>
               <h3 className="text-5xl md:text-8xl font-black mb-4 italic tracking-tighter uppercase">Synthesis Complete</h3>
               <p className="text-2xl text-zinc-500 font-medium">Session terminated. Reviewing cumulative performance indicators.</p>
             </div>

             <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
               <MetricCard label="Avg Confidence" value={avgScore("confidence_score")} unit="%" color="blue" />
               <MetricCard label="Avg Fluency" value={avgScore("speech_clarity")} unit="%" color="green" />
               <MetricCard label="Avg Pace" value={avgScore("pace")} unit="%" color="purple" />
               <MetricCard label="Total Fillers" value={allMetrics.reduce((s, e) => s + (e.metrics.filler_words || 0), 0)} unit="X" color="red" />
             </div>

             <div className="space-y-12">
               <h3 className="text-3xl font-black mb-12 italic border-l-8 border-blue-600 pl-8">Detailed Itemization</h3>
               {allMetrics.map((entry, i) => (
                 <BreakdownItem key={i} index={i} entry={entry} />
               ))}
             </div>

             <div className="flex justify-center pt-10">
               <button onClick={resetSession} className="px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-2xl transition-all shadow-xl active:scale-95 italic ring-4 ring-blue-500/20">Start New Simulation</button>
             </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default memo(VivaSimulation);