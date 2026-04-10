import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const isAuthenticated = token && token !== "undefined" && token !== "null";

  return (
    <nav className="bg-white/70 backdrop-blur-md dark:bg-black/80 border-b border-[#0ea5e9]/10 dark:border-gray-800 px-4 sm:px-6 md:px-12 py-4 flex justify-between items-center text-slate-800 dark:text-white fixed top-0 left-0 w-full z-50 transition-colors duration-300">

      <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
        <img src="/logo.png" alt="Zenvoco Logo" className="h-7 sm:h-8 md:h-10 w-auto object-contain dark:invert" />
        <h1 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0ea5e9] to-[#2dd4bf] tracking-tight">
          Zenvoco
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 font-bold text-sm tracking-wide">
        <a href="#home" className="text-slate-600 dark:text-gray-300 hover:text-[#0ea5e9] dark:hover:text-white transition uppercase tracking-widest text-[11px]">
          Home
        </a>
        <a href="#how-it-works" className="text-slate-600 dark:text-gray-300 hover:text-[#0ea5e9] dark:hover:text-white transition uppercase tracking-widest text-[11px]">
          How It Works
        </a>
        <a href="#features" className="text-slate-600 dark:text-gray-300 hover:text-[#0ea5e9] dark:hover:text-white transition uppercase tracking-widest text-[11px]">
          Features
        </a>
        <a href="#about" className="text-slate-600 dark:text-gray-300 hover:text-[#0ea5e9] dark:hover:text-white transition uppercase tracking-widest text-[11px]">
          About
        </a>
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="bg-[#0284c7] text-white px-6 py-2.5 rounded-full font-black hover:bg-[#0369a1] shadow-[0_4px_14px_0_rgb(2,132,199,0.3)] transition-all transform hover:-translate-y-0.5"
          >
            Dashboard
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-slate-600 dark:text-gray-300 hover:text-[#0ea5e9] transition font-black uppercase tracking-widest text-[11px]">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-[#0284c7] text-white px-6 py-2.5 rounded-full font-black hover:bg-[#0369a1] shadow-[0_4px_14px_0_rgb(2,132,199,0.3)] transition-all transform hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Actions */}
      <div className="flex md:hidden items-center gap-3">
        <ThemeToggle />
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-900 dark:text-white border border-slate-300 dark:border-gray-800 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-sm"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div className="hidden md:block ml-4">
          <ThemeToggle />
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-b border-[#0ea5e9]/10 dark:border-gray-800 z-50 p-8 space-y-6 max-h-[calc(100vh-64px)] overflow-y-auto animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6 text-center">
             <a href="#home" onClick={() => setMenuOpen(false)} className="text-xl font-black text-slate-800 dark:text-white hover:text-[#0ea5e9]">Home</a>
             <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="text-xl font-black text-slate-800 dark:text-white hover:text-[#0ea5e9]">How It Works</a>
             <a href="#features" onClick={() => setMenuOpen(false)} className="text-xl font-black text-slate-800 dark:text-white hover:text-[#0ea5e9]">Features</a>
             <a href="#about" onClick={() => setMenuOpen(false)} className="text-xl font-black text-slate-800 dark:text-white hover:text-[#0ea5e9]">About</a>
          </div>
          <div className="pt-6 border-t border-slate-100 dark:border-gray-800 flex flex-col gap-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="w-full text-center bg-[#0284c7] text-white px-5 py-4 rounded-2xl font-black transition shadow-lg text-lg"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="w-full text-center py-4 rounded-2xl border border-slate-200 dark:border-gray-800 font-black text-lg">Login</Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center bg-[#0284c7] text-white px-5 py-4 rounded-2xl font-black transition shadow-lg text-lg"
                >
                  Join Zenvoco
                </Link>
              </>
            )}
          </div>
        </div>
      )}

    </nav>
  );
}

export default Navbar;