import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { memo } from "react";

const FeatureCard = memo(({ icon, title, description, color }) => (
  <div className="group relative bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:bg-zinc-900/60 hover:-translate-y-2 hover:border-white/10 overflow-hidden">
    <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 rounded-full blur-[60px] group-hover:bg-${color}-500/10 transition-all duration-500`} />
    <div className={`w-16 h-16 bg-${color}-500/10 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner ring-1 ring-${color}-500/20`}>
      {icon}
    </div>
    <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-zinc-400 leading-relaxed text-lg group-hover:text-zinc-300 transition-colors">
      {description}
    </p>
  </div>
));

function Welcome() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main>
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-6 pt-32 pb-20 overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none animate-pulse duration-[8000ms]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none animate-pulse duration-[10000ms]"></div>

          <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 bg-white/5 rounded-full text-blue-400 text-sm font-bold mb-10 backdrop-blur-3xl shadow-2xl ring-1 ring-white/10">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
              ✨ The New Standard for Communication
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight leading-[1.05] mb-10 max-w-4xl italic">
              Master the Art of <br />
              <span className="premium-gradient-text not-italic">Fearless Communication</span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed mb-14 max-w-3xl px-4 font-medium">
              Zenvoco is an AI-powered system designed for students to conquer anxiety, structure their thoughts, and speak with absolute confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center w-full sm:w-auto px-6">
              <Link
                to="/register"
                className="w-full sm:w-auto bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.4)] shadow-xl active:scale-95"
              >
                Start Training Free
              </Link>

              <Link
                to="/login"
                className="w-full sm:w-auto bg-zinc-900/50 border border-white/10 backdrop-blur-xl px-12 py-5 rounded-2xl font-black text-xl hover:bg-zinc-800 hover:border-white/20 transition-all duration-300 active:scale-95"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden md:block">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7m14-8l-7 7-7-7"></path></svg>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 md:py-40 flex flex-col justify-center items-center px-6 text-center bg-zinc-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.1),transparent_50%)]"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight">
              How does it <span className="text-blue-500">work?</span>
            </h2>
            <p className="text-zinc-500 mb-20 max-w-2xl mx-auto text-xl md:text-2xl font-medium px-4">A simple three-step methodology to build your speaking muscles.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <FeatureCard 
                icon="📖" 
                title="Learn" 
                description="Study guided frameworks for interviews, presentations, and viva. Understand the 'why' before the 'how'." 
                color="blue"
              />
              <FeatureCard 
                icon="🎤" 
                title="Practice" 
                description="Speak safely into our AI simulator. Make mistakes without judgment and follow on-screen hints." 
                color="purple"
              />
              <FeatureCard 
                icon="📈" 
                title="Improve" 
                description="Get instant analytics on fluency, clarity, and filler words. Track your growth visually." 
                color="green"
              />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 md:py-40 flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none"></div>

          <div className="relative z-10 max-w-5xl glass-card p-12 md:p-24 ring-1 ring-white/10 shadow-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tight">
              Why we built Zenvoco
            </h2>

            <div className="space-y-8 text-zinc-300 text-xl md:text-2xl leading-relaxed font-medium">
              <p>
                Zenvoco is <span className="text-white font-black underline decoration-blue-500 decoration-4 underline-offset-8 outline-none">not</span> an English learning app.
              </p>
              <p>
                It is a confidence-building communication system designed strictly for students facing high-stakes situations. Through structured learning, guided speaking practice, AI-powered feedback, and personalized insights, it helps you overcome speaking anxiety and build real-world confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-16 text-center bg-black">
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-8">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-xl shadow-lg ring-1 ring-blue-400/50">Z</div>
              <span className="text-2xl font-black tracking-tight text-white uppercase italic">Zenvoco</span>
            </div>
            <p className="text-zinc-500 font-medium">© 2026 Zenvoco. Master the art of speaking.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Welcome;