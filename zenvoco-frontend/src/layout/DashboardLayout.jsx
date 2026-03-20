import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, memo } from "react";

// Inline SVG Icons for zero-dependency reliability
const Icons = {
  Menu: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path></svg>,
  Close: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>,
  Dashboard: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><path d="M4 13h6V3H4v10zm0 8h6v-5H4v5zm8 0h6V11h-6v10zm0-18v6h6V3h-6z"></path></svg>,
  Learn: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>,
  Listen: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>,
  Microphone: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>,
  Chart: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>,
  Profile: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
  Home: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
  Chevron: () => <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="1em" width="1em"><polyline points="9 18 15 12 9 6"></polyline></svg>
};

const NavItem = memo(({ item, isActive }) => (
  <Link
    to={item.path}
    className={`group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-all duration-300 transform active:scale-95 ${
      isActive 
        ? "bg-blue-600/90 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-500/50" 
        : "text-zinc-400 hover:bg-zinc-800/80 hover:text-white"
    }`}
  >
    <div className="flex items-center gap-3.5">
      <span className={`text-xl transition-colors duration-300 ${isActive ? "text-white" : "text-zinc-500 group-hover:text-blue-400"}`}>
        {item.icon}
      </span>
      <span>{item.name}</span>
    </div>
    <div className={`text-lg transition-all duration-300 ${isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
      <Icons.Chevron />
    </div>
  </Link>
));

function DashboardLayout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <Icons.Dashboard /> },
    { name: "Learn Mode", path: "/learn", icon: <Icons.Learn /> },
    { name: "Listen Mode", path: "/listen", icon: <Icons.Listen /> },
    { name: "Guided Practice", path: "/practice", icon: <Icons.Microphone /> },
    { name: "Daily Task", path: "/daily-task", icon: <Icons.Chart /> },
    { name: "Progress", path: "/progress", icon: <Icons.Chart /> },
    { name: "Profile", path: "/profile", icon: <Icons.Profile /> },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
        <div className="absolute top-[-10%] left-[-10%] h-[40rem] w-[40rem] rounded-full bg-blue-600/10 blur-[130px] opacity-60 sm:h-[50rem] sm:w-[50rem]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[40rem] w-[40rem] rounded-full bg-cyan-500/5 blur-[130px] opacity-40 sm:h-[50rem] sm:w-[50rem]"></div>
      </div>

      {/* Header (Lg: hidden) */}
      <header className="sticky top-0 z-[60] border-b border-white/5 bg-black/60 backdrop-blur-2xl lg:hidden">
        <div className="mx-auto flex items-center justify-between px-5 py-4">
          <Link to="/dashboard" className="group flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-inner transition-transform group-hover:scale-110">Z</div>
            <span className="text-xl font-bold tracking-tight text-white">Zenvoco</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl text-white transition-all hover:bg-white/10 active:scale-90"
          >
            {menuOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 z-50 bg-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />

      <div className="relative flex min-h-screen">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/5 bg-zinc-950/95 p-6 backdrop-blur-3xl transition-all duration-500 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${menuOpen ? "translate-x-0 shadow-2xl shadow-blue-500/10" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="mb-10 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-xl shadow-lg ring-1 ring-blue-400/50">Z</div>
              <span className="text-2xl font-black tracking-tight text-white">Zenvoco</span>
          </div>

          <nav className="flex-1 space-y-2.5 overflow-y-auto pr-1 custom-scrollbar">
            <p className="px-4 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">Main Menu</p>
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} isActive={location.pathname === item.path} />
            ))}
          </nav>

          <footer className="mt-8 pt-6 border-t border-white/5 pb-4">
            <Link
              to="/"
              className="group flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-4 text-center text-sm font-bold text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white"
            >
              <div className="text-xl group-hover:text-blue-400">
                <Icons.Home />
              </div>
              <span>Exit to Home</span>
            </Link>
          </footer>
        </aside>

        {/* Content */}
        <main className="relative flex-1 px-4 py-8 sm:px-8 sm:py-10 lg:px-14 lg:py-12 overflow-x-hidden">
          <div className="mx-auto w-full max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default memo(DashboardLayout);
