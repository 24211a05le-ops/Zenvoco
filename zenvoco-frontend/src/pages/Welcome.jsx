import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

function Welcome() {
  const [stats, setStats] = useState({
    total_users: 0,
    total_sessions: 0,
    avg_confidence_improvement: 0,
    satisfied_users_percent: 0
  });
  const [displayStats, setDisplayStats] = useState({
    total_users: 0,
    total_sessions: 0,
    avg_confidence_improvement: 0,
    satisfied_users_percent: 0
  });
  const [userData, setUserData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchPlatformStats = async () => {
    try {
      const response = await API.get("/dashboard/platform/stats");
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching platform stats:", err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined" && token !== "null") {
        try {
          const response = await API.get("/dashboard/user");
          setUserData(response.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    const fetchFeedbacks = async () => {
      try {
        const response = await API.get("/dashboard/feedbacks");
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
      }
    };

    fetchPlatformStats();
    fetchUserData();
    fetchFeedbacks();

    // Poll for platform stats every 30 seconds to keep it dynamic
    const interval = setInterval(fetchPlatformStats, 30000);
    return () => clearInterval(interval);
  }, []);

  // Animate numbers when stats change
  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const frameRate = 1000 / 60;
    const totalFrames = duration / frameRate;

    let frame = 0;
    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Cubic ease out

      setDisplayStats({
        total_users: Math.floor(stats.total_users * easeOut),
        total_sessions: Math.floor(stats.total_sessions * easeOut),
        satisfied_users_percent: Math.floor(stats.satisfied_users_percent * easeOut)
      });

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setDisplayStats(stats);
      }
    };

    requestAnimationFrame(animate);
  }, [stats]);

  // Keep mockup data static regardless of login status for consistent landing page aesthetic
  const mockupData = {
    clarity: 92,
    confidence: 88,
    overall: 85,
    fillerWords: 3,
    pace: "PERFECT",
    feedback: "Good clarity! Try reducing filler words and maintain a steady pace to sound completely authoritative."
  };

  // Predefined colors for dynamic testimonials
  const testimonialColors = ["bg-[#0ea5e9]", "bg-[#2dd4bf]", "bg-[#8b5cf6]", "bg-[#f59e0b]", "bg-[#10b981]", "bg-[#ec4899]"];

  return (
    <>
      <Navbar />

      <div className="bg-gradient-to-br from-[#e8f4f8] via-[#eaf6fc] to-[#d6eff8] dark:from-gray-900 dark:via-gray-950 dark:to-black text-slate-900 dark:text-white selection:bg-blue-500/30 overflow-x-hidden transition-colors duration-300 font-sans">
        
        {/* 1. HERO SECTION */}
        <section id="home" className="relative h-auto min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-32 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none -z-10"></div>

          <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center w-full">
            <div className="inline-block px-4 py-1.5 sm:px-5 sm:py-2 bg-[#e0eff8]/60 dark:bg-gray-800/60 rounded-full text-[#0ea5e9] dark:text-blue-400 text-[10px] sm:text-xs md:text-sm font-bold tracking-widest uppercase mb-8 sm:mb-10 backdrop-blur-md shadow-sm">
              ✨ Join {displayStats.total_users}+ Students Mastering Communication
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-[-0.04em] leading-[1.1] mb-8 text-[#0f172a] dark:text-white px-2">
              {userData ? `Welcome back, ${userData.user_profile.name.split(' ')[0]}` : "Master the Art of"} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf]">
                {userData ? "Continue Your Journey" : "Fearless Communication"}
              </span>
            </h1>

            <p className="text-slate-600 dark:text-gray-300 text-base sm:text-lg md:text-2xl md:leading-relaxed mb-10 md:mb-12 max-w-3xl px-4 font-medium">
              {userData 
                ? "You're doing great! Jump back into your sessions and keep building that unshakeable confidence."
                : "Zenvoco is an AI-powered system designed for students to conquer anxiety, structure their thoughts, and speak with absolute confidence."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full sm:w-auto px-4 mb-20">
              {(localStorage.getItem("token") && localStorage.getItem("token") !== "undefined" && localStorage.getItem("token") !== "null") ? (
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto bg-[#0284c7] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0369a1] shadow-[0_8px_30px_rgb(2,132,199,0.25)] hover:shadow-[0_8px_30px_rgb(2,132,199,0.4)] transition-all duration-300 transform hover:-translate-y-1 text-center"
                >
                  Return to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto bg-[#0284c7] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0369a1] shadow-[0_8px_30px_rgb(2,132,199,0.25)] hover:shadow-[0_8px_30px_rgb(2,132,199,0.4)] transition-all duration-300 transform hover:-translate-y-1 text-center"
                  >
                    Start Training Free
                  </Link>
                  <Link
                    to="/login"
                    className="w-full sm:w-auto bg-white/70 dark:bg-gray-800/90 backdrop-blur-md border border-[#0ea5e9]/20 px-10 py-4 rounded-full font-bold text-lg text-slate-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 shadow-sm hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all duration-300 transform hover:-translate-y-1 text-center"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Illustration / Mockup Area */}
            <div className="w-full max-w-5xl mx-auto relative group perspective-[1000px] px-2 sm:px-4">
              <div className="absolute inset-0 bg-gradient-to-t from-[#eaf6fc] dark:from-gray-950 via-transparent to-transparent z-10 pointer-events-none translate-y-[60%]"></div>
              
              <div className="bg-white/80 dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#020617] border border-[#0ea5e9]/20 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl transition-all duration-700 hover:rotate-x-1 relative overflow-hidden backdrop-blur-3xl">
                
                {/* Glowing Background Elements */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#0ea5e9]/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none"></div>

                {/* Window Controls */}
                <div className="absolute top-4 sm:top-5 left-4 sm:left-5 flex gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400 dark:bg-red-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-400 dark:bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-400 dark:bg-green-500"></div>
                </div>

                <div className="pt-8 sm:pt-10 pb-4 flex flex-col items-center relative z-10">
                  
                  {/* Top: Mic & Title */}
                  <div className="flex flex-col items-center mb-8 sm:mb-12 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 sm:w-24 sm:h-24 bg-[#0ea5e9]/20 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#0ea5e9] to-[#2dd4bf] rounded-full flex items-center justify-center shadow-[0_0_30px_rgb(14,165,233,0.4)] relative z-10 mb-4">
                      <span className="text-3xl sm:text-4xl text-white drop-shadow-md">🎤</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-800 dark:text-white tracking-wide text-center">Real-Time Analysis Simulator</h3>
                    <p className="text-[#0ea5e9] text-xs sm:text-sm mt-1 font-medium animate-pulse">Analysis in progress...</p>
                  </div>

                  {/* Middle: Metrics Grid & Waveform */}
                  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10 px-2">
                    
                    {/* Left: Progress Bars */}
                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-md">
                        <div className="flex justify-between text-xs sm:text-sm mb-2 font-bold text-slate-800 dark:text-white">
                          <span className="whitespace-nowrap">Clarity</span>
                          <span className="text-[#2dd4bf] whitespace-nowrap">{mockupData.clarity}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf] h-2 rounded-full transition-all duration-1000" style={{ width: `${mockupData.clarity}%` }}></div>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm backdrop-blur-md">
                        <div className="flex justify-between text-xs sm:text-sm mb-2 font-bold text-slate-800 dark:text-white">
                          <span className="whitespace-nowrap">Confidence</span>
                          <span className="text-[#0ea5e9] whitespace-nowrap">{mockupData.confidence}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-blue-500 to-[#0ea5e9] h-2 rounded-full transition-all duration-1000" style={{ width: `${mockupData.confidence}%` }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Center: Waveform */}
                    <div className="hidden md:flex flex-col justify-center items-center h-full min-h-[100px]">
                       <div className="flex items-end justify-center gap-1.5 h-16 sm:h-24 w-full">
                          {[40, 70, 45, 90, 60, 85, 30, 75, 50, 95, 65, 40].map((h, i) => (
                            <div key={i} className="w-1.5 sm:w-2 rounded-full bg-gradient-to-t from-[#0ea5e9] to-[#2dd4bf] animate-[pulse_1s_ease-in-out_infinite]" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                          ))}
                       </div>
                    </div>

                    {/* Right: Badges */}
                    <div className="space-y-4 sm:space-y-6 flex flex-col justify-center">
                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
                         <span className="text-slate-800 dark:text-white font-bold text-xs sm:text-sm">Pace</span>
                         <span className="px-2.5 py-1 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 text-[10px] sm:text-xs font-black rounded-full border border-green-200 dark:border-green-500/30 uppercase">{mockupData.pace}</span>
                      </div>
                      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
                         <span className="text-slate-800 dark:text-white font-bold text-xs sm:text-sm">Filler Words</span>
                         <span className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-black text-xs sm:text-sm">
                           {mockupData.fillerWords} <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                         </span>
                      </div>
                    </div>

                  </div>

                  {/* Bottom: Feedback & Score */}
                  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 sm:px-2">
                    
                    {/* Score Circle */}
                    <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-md flex flex-col items-center justify-center relative hover:bg-slate-100 dark:hover:bg-white/10 transition-colors py-8">
                       <div className="absolute top-0 right-0 w-20 h-20 bg-[#2dd4bf]/20 dark:bg-[#2dd4bf]/10 rounded-full blur-2xl"></div>
                       <svg className="w-24 h-24 sm:w-28 sm:h-28 transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-gray-800" />
                          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="264" strokeDashoffset={264 - (264 * mockupData.overall / 100)} className="text-[#2dd4bf] transition-all duration-1000 ease-out" strokeLinecap="round" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center flex-col pb-4">
                          <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">{mockupData.overall}</span>
                          <span className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 tracking-widest font-bold">/100</span>
                       </div>
                       <p className="mt-4 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest text-center">Overall<br/>Performance</p>
                    </div>

                    {/* AI Feedback */}
                    <div className="md:col-span-2 bg-gradient-to-r from-slate-50 to-white dark:from-white/10 dark:to-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm backdrop-blur-md flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:border-[#0ea5e9]/50 transition-colors">
                       <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl shrink-0 border border-blue-200 dark:border-blue-500/30">🤖</div>
                       <div className="text-center sm:text-left">
                         <h4 className="text-xs sm:text-sm font-black text-[#0ea5e9] mb-2 uppercase tracking-widest">Live AI Feedback</h4>
                         <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                           "{mockupData.feedback}"
                         </p>
                       </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. LOGO CLOUD / STATS IMPACT SECTION */}
        <section className="py-12 sm:py-16 md:py-20 bg-white/40 backdrop-blur-md dark:bg-gray-950/40 border-y border-[#0ea5e9]/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 text-center md:divide-x divide-[#0ea5e9]/10">
              <div className="py-6 sm:py-8 md:p-4 transform hover:scale-105 transition-transform border-b md:border-b-0 border-[#0ea5e9]/5">
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf] mb-2">93%</p>
                <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wide">Confidence Improvement</p>
              </div>
              <div className="py-6 sm:py-8 md:p-4 transform hover:scale-105 transition-transform border-b md:border-b-0 border-[#0ea5e9]/5">
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf] mb-2">{displayStats.total_sessions}+</p>
                <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wide">Sessions Completed</p>
              </div>
              <div className="py-6 sm:py-8 md:p-4 transform hover:scale-105 transition-transform">
                <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf] mb-2">{displayStats.satisfied_users_percent}%</p>
                <p className="text-slate-600 dark:text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-wide">Positive Feedback</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRODUCT DEMO / PREVIEW SECTION */}
        <section id="demo" className="py-20 sm:py-24 md:py-32 flex flex-col justify-center items-center px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 tracking-tight text-[#0f172a] dark:text-white">
            See Zenvoco in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf]">Action</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-12 sm:mb-16 max-w-2xl text-base sm:text-lg font-medium">Experience real-time AI feedback that guides your tone, pace, and delivery as you speak.</p>
          
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/70 dark:bg-gray-900 border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all">
              <div className="text-3xl sm:text-4xl mb-4">🏆</div>
              <h3 className="font-black text-lg sm:text-xl mb-2 text-[#0f172a] dark:text-white">Speech Score</h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base font-medium">Get a holistic 0-100 rating based on clarity, pronunciation, and expression immediately after you speak.</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-900 border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all">
              <div className="text-3xl sm:text-4xl mb-4">🛑</div>
              <h3 className="font-black text-lg sm:text-xl mb-2 text-[#0f172a] dark:text-white">Filler Word Detection</h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base font-medium">Identify exactly where you lean on words like "um", "ah", or "like" and learn to substitute them with pauses.</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-900 border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all flex flex-col justify-center">
              <div className="bg-gradient-to-r from-[#0ea5e9]/10 to-transparent p-6 rounded-2xl border border-[#0ea5e9]/20 shadow-inner">
                 <p className="text-xs sm:text-sm font-bold text-[#0ea5e9] uppercase tracking-widest mb-2">Live Insight</p>
                 <p className="font-medium text-slate-700 dark:text-gray-300 text-xs sm:text-sm">"{mockupData.feedback}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 sm:py-24 md:py-32 flex flex-col justify-center items-center px-4 sm:px-6 text-center bg-white/30 backdrop-blur-md dark:bg-gray-950 transition-colors duration-300">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-[#0f172a] dark:text-white px-2">
            How does it <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf]">work?</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-12 sm:mb-16 max-w-xl text-base sm:text-lg font-medium px-4">A simple three-step methodology to build your speaking muscles.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full">
            <div className="bg-white/70 dark:bg-gray-900 border border-[#0ea5e9]/10 rounded-3xl p-8 sm:p-10 transition-all duration-300 group text-left shadow-sm hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0ea5e9]/10 rounded-2xl flex items-center justify-center text-[#0ea5e9] text-2xl sm:text-3xl mb-8 group-hover:scale-110 transition-transform">
                📖
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight mb-4">1. Learn</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base font-medium">
                Study guided frameworks for interviews, presentations, and viva. Understand the "why" before the "how."
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-900 border border-[#0ea5e9]/10 rounded-3xl p-8 sm:p-10 transition-all duration-300 group text-left shadow-sm hover:shadow-[0_8px_30px_rgb(168,85,247,0.15)] hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center text-[#8b5cf6] text-2xl sm:text-3xl mb-8 group-hover:scale-110 transition-transform">
                🎤
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight mb-4">2. Practice</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base font-medium">
                Speak safely into our AI simulator. Make mistakes without judgment and follow on-screen hints.
              </p>
            </div>

            <div className="bg-white/70 dark:bg-gray-900 border border-[#0ea5e9]/10 rounded-3xl p-8 sm:p-10 transition-all duration-300 group text-left shadow-sm hover:shadow-[0_8px_30px_rgb(34,197,94,0.15)] hover:-translate-y-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#2dd4bf]/10 rounded-2xl flex items-center justify-center text-[#2dd4bf] text-2xl sm:text-3xl mb-8 group-hover:scale-110 transition-transform">
                📈
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight mb-4">3. Improve</h3>
              <p className="text-slate-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base font-medium">
                Get instant analytics on fluency, clarity, and filler words. Track your growth visually.
              </p>
            </div>
          </div>
        </section>

        {/* 5. FEATURES SECTION */}
        <section id="features" className="py-20 sm:py-24 md:py-32 flex flex-col justify-center items-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight text-[#0f172a] dark:text-white text-center">
            Powerful features to build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf]">Habits</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 mb-12 sm:mb-16 max-w-2xl text-base sm:text-lg font-medium text-center">Beyond generic advice, Zenvoco gives you the exact tools you need to level up.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl w-full">
            {[
              { icon: "🎙️", title: "Real-time Analysis", desc: "Speak and receive instant processing of your voice, pitch, and clarity metrics." },
              { icon: "🧠", title: "AI-Powered Feedback", desc: "Actionable, tailored suggestions mimicking a real speaking coach." },
              { icon: "🎓", title: "Interview Simulation", desc: "Customized environments tailored to mimic high-stakes interviews and panel vivas." },
              { icon: "📊", title: "Progress Dashboard", desc: "Track improvements, historical performance, and streak counts over time." },
              { icon: "✨", title: "Personalized Insights", desc: "Machine-guided recommendations predicting the exact areas you should target next." },
              { icon: "📚", title: "Guided Modules", desc: "Step-by-step reading frameworks designed specifically for core public speaking aspects." }
            ].map((f, i) => (
              <div key={i} className="bg-white/60 dark:bg-gray-900/60 border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(14,165,233,0.1)] transition-all duration-300">
                <div className="text-2xl sm:text-3xl mb-4 bg-white dark:bg-gray-800 shadow-sm w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border border-[#0ea5e9]/5">{f.icon}</div>
                <h3 className="font-black text-[#0f172a] dark:text-white text-base sm:text-lg mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 font-medium text-xs sm:text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. BENEFITS SECTION */}
        <section className="py-20 sm:py-24 bg-white/40 backdrop-blur-md dark:bg-gray-950/50 border-y border-[#0ea5e9]/10 overflow-hidden relative">
          <div className="absolute left-[-10%] top-[20%] w-64 h-64 sm:w-96 sm:h-96 bg-[#0ea5e9]/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"></div>
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 tracking-tight text-[#0f172a] dark:text-white">
                Transform anxiety into <span className="text-[#0ea5e9]">Authority</span>
              </h2>
              <ul className="space-y-4 sm:space-y-6">
                {[
                  { title: "Build Real Confidence", desc: "Practice consistently to lock in muscle memory without pressure." },
                  { title: "No Fear of Judgment", desc: "Fail safely. Talk to an AI that just wants to see you succeed." },
                  { title: "Instant Improvement", desc: "See EXACTLY what needs adjusting immediately." },
                  { title: "Designed for Students", desc: "Curated specifically for academic and early-career scenarios." }
                ].map((b, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center font-bold shrink-0 text-sm sm:text-base">✓</div>
                    <div>
                      <h4 className="font-black text-[#0f172a] dark:text-white text-base sm:text-lg">{b.title}</h4>
                      <p className="text-slate-600 dark:text-gray-400 font-medium text-xs sm:text-sm mt-1">{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gradient-to-tr from-[#0ea5e9]/20 to-[#2dd4bf]/20 rounded-3xl p-1">
              <div className="bg-white/80 dark:bg-gray-900 rounded-[23px] h-full p-8 sm:p-10 shadow-inner flex flex-col justify-center items-center text-center">
                <div className="text-6xl sm:text-7xl mb-6">🚀</div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] dark:text-white tracking-tight mb-4">"I used to freeze during vivas. Now I actually look forward to them."</h3>
                <p className="text-[#0ea5e9] font-bold text-sm sm:text-base">— CS Major, Final Year</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. TESTIMONIALS SECTION */}
        <section className="py-20 sm:py-24 md:py-32 flex flex-col justify-center items-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-12 sm:mb-16 tracking-tight text-[#0f172a] dark:text-white text-center">
            Trusted by Students <span className="text-[#2dd4bf]">Worldwide</span>
          </h2>
          <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbacks.length > 0 ? (
              feedbacks.map((t, i) => (
                <div key={i} className="bg-white/70 dark:bg-gray-900/60 border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-[0_8px_30px_rgb(14,165,233,0.1)] transition-all">
                  <p className="text-slate-600 dark:text-gray-300 font-medium italic mb-6 leading-relaxed text-sm sm:text-base">"{t.comment}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${testimonialColors[i % testimonialColors.length]} flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-inner uppercase`}>
                      {t.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <h4 className="font-black text-[#0f172a] dark:text-white text-xs sm:text-sm">{t.name}</h4>
                      <p className="text-slate-500 dark:text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Zenvoco Member</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              [
                { text: "Helped me crack my viva confidently! I was able to defend my project smoothly without stuttering.", name: "Rahul S.", role: "Engineering Student", initial: "R", color: "bg-[#0ea5e9]" },
                { text: "The filler word tracking is a game-changer. I never realized how often I said 'like' until Zenvoco caught it.", name: "Sara M.", role: "Business Major", initial: "S", color: "bg-[#2dd4bf]" },
                { text: "Best platform for interview preps. The STAR method module combined with AI analysis completely rewired how I speak.", name: "David L.", role: "Recent Graduate", initial: "D", color: "bg-[#8b5cf6]" }
              ].map((t, i) => (
                <div key={i} className="bg-white/70 dark:bg-gray-900/60 border border-[#0ea5e9]/10 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-[0_8px_30px_rgb(14,165,233,0.1)] transition-all">
                  <p className="text-slate-600 dark:text-gray-300 font-medium italic mb-6 leading-relaxed text-sm sm:text-base">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${t.color} flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-inner`}>{t.initial}</div>
                    <div>
                      <h4 className="font-black text-[#0f172a] dark:text-white text-xs sm:text-sm">{t.name}</h4>
                      <p className="text-slate-500 dark:text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* 8. ABOUT SECTION */}
        <section id="about" className="py-20 sm:py-24 md:py-32 flex flex-col justify-center items-center px-4 sm:px-6 text-center relative overflow-hidden bg-white/30 backdrop-blur-md dark:bg-gray-950 transition-colors duration-300">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-[#0ea5e9]/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none -z-10"></div>
          <div className="relative z-10 max-w-4xl bg-white/70 dark:bg-gray-900/40 border border-[#0ea5e9]/10 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-20 shadow-sm dark:shadow-none">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 text-[#0f172a] dark:text-white tracking-tight">
              Why we built Zenvoco
            </h2>
            <p className="text-slate-700 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed text-left md:text-center font-medium">
              Zenvoco is <span className="text-slate-900 dark:text-white font-black">not</span> just an English learning app.
              <br className="hidden md:block" /><br className="hidden md:block" />
              It is a confidence-building communication system designed strictly for students facing high-stakes situations. Through structured learning, guided speaking practice, AI-powered feedback, and personalized insights, it helps you overcome speaking anxiety and build real-world confidence.
            </p>
          </div>
        </section>

        {/* 9. FAQ SECTION */}
        <section id="faq" className="py-20 flex flex-col items-center px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-12 sm:mb-16 tracking-tight text-[#0f172a] dark:text-white text-center">
            Frequently Asked <span className="text-[#0ea5e9]">Questions</span>
          </h2>
          <div className="max-w-3xl w-full space-y-4">
            {[
              { q: "Is Zenvoco free?", a: "Zenvoco offers a free tier which gives you access to basic modules and limited simulations. Premium unlocks deeper analytics and unlimited simulations." },
              { q: "How does AI feedback work?", a: "Our system listens to your audio locally, processes text structure and vocal features, and compares them against high-quality communication frameworks to give you a score." },
              { q: "Who can use this?", a: "It is specifically tailored for unversity students preparing for vivas, freshers preparing for interviews, and anyone wanting to overcome presentation anxiety." },
              { q: "Do I need prior skills?", a: "Absolutely not! Zenvoco provides absolute beginner 'Listen & Observe' and 'Learn' modules to build up your baseline before you even begin practicing." }
            ].map((faq, i) => (
              <div key={i} className="bg-white/60 dark:bg-gray-900/40 border border-[#0ea5e9]/10 rounded-2xl p-5 sm:p-6 hover:bg-white/80 transition-colors shadow-sm cursor-pointer group">
                <h3 className="font-black text-[#0f172a] dark:text-white text-base sm:text-lg group-hover:text-[#0ea5e9] transition-colors">{faq.q}</h3>
                <p className="text-slate-600 dark:text-gray-400 font-medium text-xs sm:text-sm mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. FINAL CTA SECTION */}
        <section className="py-24 sm:py-32 relative overflow-hidden flex flex-col justify-center items-center px-6 text-center border-t border-[#0ea5e9]/10 bg-gradient-to-b from-transparent to-[#e8f4f8] dark:to-gray-950">
           <div className="absolute inset-0 bg-[#0ea5e9]/5 rounded-full blur-[100px] scale-150 pointer-events-none -z-10"></div>
           <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-[-0.03em] leading-tight mb-8 text-[#0f172a] dark:text-white">
              Ready to Speak with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf]">Confidence?</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 w-full sm:w-auto">
               <Link
                    to="/register"
                    className="w-full sm:w-auto bg-[#0284c7] text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg hover:bg-[#0369a1] shadow-[0_8px_30px_rgb(2,132,199,0.3)] hover:shadow-[0_8px_30px_rgb(2,132,199,0.5)] transition-all duration-300 transform hover:-translate-y-1 text-center"
                  >
                    Start Training Now
                  </Link>
                  <Link
                    to="#demo"
                    className="w-full sm:w-auto bg-white/80 dark:bg-gray-800/90 backdrop-blur-md border border-[#0ea5e9]/20 px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg text-slate-800 dark:text-white hover:bg-white dark:hover:bg-gray-700 shadow-sm hover:shadow-[0_8px_30px_rgb(14,165,233,0.15)] transition-all duration-300 transform hover:-translate-y-1 text-center"
                  >
                    Try Demo
                  </Link>
            </div>
        </section>

        {/* 11. FOOTER */}
        <footer className="border-t border-[#0ea5e9]/10 dark:border-gray-800 py-10 sm:py-12 px-6 bg-[#eaf6fc]/80 dark:bg-black transition-colors duration-300">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 text-center md:text-left">
             <div className="mb-4 md:mb-0">
               <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf] tracking-tight">Zenvoco</span>
               <p className="text-slate-500 dark:text-gray-500 font-bold text-xs sm:text-sm mt-1">Master the art of speaking.</p>
             </div>
             <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-xs sm:text-sm font-bold text-slate-600 dark:text-gray-400">
               <a href="#about" className="hover:text-[#0ea5e9] transition-colors">About</a>
               <a href="#home" className="hover:text-[#0ea5e9] transition-colors">Contact</a>
               <a href="#home" className="hover:text-[#0ea5e9] transition-colors">Privacy Policy</a>
             </div>
             <div className="flex gap-4">
                 <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 dark:bg-gray-800 text-slate-600 dark:text-gray-400 flex items-center justify-center font-bold hover:bg-[#0ea5e9] hover:text-white transition-all cursor-pointer">X</div>
                 <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200 dark:bg-gray-800 text-slate-600 dark:text-gray-400 flex items-center justify-center font-bold hover:bg-[#0ea5e9] hover:text-white transition-all cursor-pointer">In</div>
             </div>
          </div>
          <div className="max-w-6xl mx-auto text-center border-t border-[#0ea5e9]/10 dark:border-gray-800 mt-8 pt-8 px-4">
             <p className="font-bold text-slate-400 text-[10px] sm:text-xs tracking-widest uppercase leading-loose">© 2026 Zenvoco. Master Communication. Conquer Anxiety. <br className="sm:hidden" /> All Rights Reserved.</p>
          </div>
        </footer>

      </div>
    </>
  );
}

export default Welcome;