import React, { useState, useRef, useEffect, memo, useCallback } from "react";

const ACCEPTED = "audio/webm,audio/mp3,audio/mpeg,audio/wav,audio/ogg,audio/m4a,audio/aac,audio/*";

const Icon = memo(({ path, className = "w-6 h-6" }) => (
  <svg 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2.5" 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    className={className}
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    {path}
  </svg>
));

const AudioInput = ({ onAudioReady, onReset, disabled = false, compact = false }) => {
  const [mode, setMode] = useState("record");
  const [phase, setPhase] = useState("idle");
  const [elapsed, setElapsed] = useState(0);
  const [fileName, setFileName] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current?.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
  }, []);

  const fmtTime = useCallback((s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`, []);

  const handleReset = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current?.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    setPhase("idle");
    setFileName("");
    setElapsed(0);
    onReset?.();
  }, [onReset]);

  const switchMode = useCallback((m) => {
    if (phase === "recording") return;
    handleReset();
    setMode(m);
  }, [phase, handleReset]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      chunksRef.current = [];

      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const recorded = new Blob(chunksRef.current, { type: "audio/webm" });
        const dur = Math.round((Date.now() - startTimeRef.current) / 1000);
        setElapsed(dur);
        setPhase("ready");
        setFileName(`Recording (${fmtTime(dur)})`);
        onAudioReady?.(recorded, dur);
      };

      mr.start();
      startTimeRef.current = Date.now();
      setPhase("recording");
      setElapsed(0);

      timerRef.current = setInterval(() => {
        setElapsed(Math.round((Date.now() - startTimeRef.current) / 1000));
      }, 500);
    } catch (err) {
      console.error("Microphone error:", err);
      alert("Microphone access is required.");
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    mediaRecorderRef.current?.stop();
  };

  const processFile = useCallback((file) => {
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      alert("Please select a valid audio file.");
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert("File is too large (max 50MB).");
      return;
    }

    const url = URL.createObjectURL(file);
    const audio = new Audio(url);
    const finalize = (dur) => {
      URL.revokeObjectURL(url);
      setFileName(file.name);
      setPhase("ready");
      onAudioReady?.(file, dur);
    };

    audio.addEventListener("loadedmetadata", () => finalize(isFinite(audio.duration) ? Math.round(audio.duration) : Math.round(file.size / 16000)));
    audio.addEventListener("error", () => finalize(Math.round(file.size / 16000)));
  }, [onAudioReady]);

  return (
    <div className="w-full space-y-8 animate-fade-in">
      {phase !== "ready" && (
        <div className="inline-flex p-1.5 bg-zinc-900 border border-white/5 rounded-2xl md:rounded-[1.25rem] shadow-inner mb-2 ring-1 ring-white/5 backdrop-blur-3xl transform active:scale-[0.98] transition-all">
          <button
            onClick={() => switchMode("record")}
            disabled={disabled || phase === "recording"}
            className={`px-8 py-3 rounded-xl md:rounded-2xl text-sm font-black tracking-wide uppercase transition-all duration-500 ease-out ${
              mode === "record"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            🎤 Record
          </button>
          <button
            onClick={() => switchMode("upload")}
            disabled={disabled || phase === "recording"}
            className={`px-8 py-3 rounded-xl md:rounded-2xl text-sm font-black tracking-wide uppercase transition-all duration-500 ease-out ${
              mode === "upload"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            📂 Upload
          </button>
        </div>
      )}

      {/* RECORD MODE */}
      {mode === "record" && phase !== "ready" && (
        <div className="flex flex-col items-center gap-10 py-10 transition-all">
          {phase === "recording" && (
            <div className="flex flex-col items-center gap-6">
              <div className="h-14 flex items-center justify-center gap-1.5">
                {[...Array(24)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1 md:w-1.5 rounded-full bg-red-500 animate-pulse" 
                    style={{ 
                      height: `${15 + Math.random() * 35}%`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
              <p className="text-red-500 font-black text-2xl tabular-nums animate-pulse tracking-tight">
                REC • {fmtTime(elapsed)}
              </p>
            </div>
          )}

          <div className="relative group">
            {phase === "recording" && (
              <div className="absolute inset-0 bg-red-600/30 rounded-full blur-[50px] animate-pulse -z-10" />
            )}
            <button
              onClick={phase === "recording" ? stopRecording : startRecording}
              disabled={disabled}
              className={`relative h-32 w-32 md:h-48 md:w-48 rounded-full border-4 flex items-center justify-center transition-all duration-500 transform hover:scale-[1.03] active:scale-90 shadow-2xl ${
                phase === "recording"
                  ? "bg-red-600 border-red-400 rotate-180"
                  : "bg-zinc-900 border-white/5 hover:border-blue-500/50 shadow-blue-600/5 ring-4 ring-white/5"
              } ${disabled && "opacity-50 cursor-not-allowed grayscale"}`}
            >
              <div className={`transition-all duration-500 transform ${phase === "recording" ? "scale-110" : "scale-100"}`}>
                <Icon 
                  path={phase === "recording" 
                    ? <rect x="6" y="6" width="12" height="12" rx="2" fill="white" />
                    : <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zM19 10v2a7 7 0 0 1-14 0v-2M12 19v4m-4 0h8" />
                  } 
                  className={compact ? "w-8 h-8" : "w-10 h-10 md:w-16 md:h-16"}
                />
              </div>
            </button>
          </div>

          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest text-center max-w-[200px] leading-relaxed">
            {phase === "idle" ? "Click to start recording" : "Click to finish and save"}
          </p>
        </div>
      )}

      {/* UPLOAD MODE */}
      {mode === "upload" && phase !== "ready" && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); processFile(e.dataTransfer.files[0]); }}
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`group bg-zinc-950/50 border-2 border-dashed rounded-[2.5rem] p-12 md:p-24 text-center cursor-pointer transition-all duration-500 ${
            dragOver ? "border-blue-500 bg-blue-500/10 scale-[1.01]" : "border-white/10 hover:border-blue-500/30 hover:bg-zinc-900/60"
          } ${disabled && "opacity-50 pointer-events-none"}`}
        >
          <input ref={fileInputRef} type="file" accept={ACCEPTED} onChange={(e) => processFile(e.target.files[0])} className="hidden" />
          <div className="w-24 h-24 bg-blue-600/10 rounded-3xl mx-auto mb-10 flex items-center justify-center text-blue-500 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner italic font-black text-4xl">
            UP
          </div>
          <h3 className="text-2xl md:text-3xl font-black mb-4">DRAG & DROP</h3>
          <p className="text-zinc-500 text-lg md:text-xl font-medium mb-10">or click to browse your files</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["MP3", "WAV", "OGG", "M4A"].map((ext) => (
              <span key={ext} className="text-[10px] md:text-xs bg-white/5 border border-white/5 text-zinc-400 px-4 py-1.5 rounded-full font-black tracking-widest uppercase">{ext}</span>
            ))}
          </div>
        </div>
      )}

      {/* READY STATE */}
      {phase === "ready" && (
        <div className="bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-8 md:p-12 animate-fade-in ring-1 ring-blue-500/20 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-10 transition-all duration-1000 group-hover:bg-blue-500/20" />
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl ring-4 ring-blue-500/20">
                <Icon path={<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>} />
              </div>
              <div className="text-left">
                <p className="text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-1">Status: Ready</p>
                <h4 className="text-xl md:text-2xl font-black text-white truncate max-w-[200px] md:max-w-md">{fileName}</h4>
              </div>
            </div>
            {!disabled && (
              <button
                onClick={handleReset}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-zinc-900 border border-white/10 text-white font-black text-sm uppercase tracking-widest transition-all hover:bg-zinc-800 hover:border-white/20 active:scale-95"
              >
                Clear & Redo
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(AudioInput);
