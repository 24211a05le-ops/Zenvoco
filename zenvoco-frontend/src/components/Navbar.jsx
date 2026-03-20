import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, memo, useCallback } from "react";

const NavLink = memo(({ href, children, onClick }) => {
  const isExternal = href.startsWith("#");
  const Component = isExternal ? "a" : Link;
  return (
    <Component
      href={isExternal ? href : undefined}
      to={isExternal ? undefined : href}
      onClick={onClick}
      className="text-zinc-400 hover:text-white transition-all duration-300 font-bold text-sm tracking-widest uppercase italic group flex items-center gap-2"
    >
      <span className="w-0 group-hover:w-2 h-[2px] bg-blue-500 transition-all duration-300" />
      {children}
    </Component>
  );
});

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : 'unset';
      return next;
    });
  }, []);

  return (
    <nav className={`fixed top-0 left-0 z-[100] w-full transition-all duration-500 ${scrolled || menuOpen ? "py-4 bg-black/80 backdrop-blur-3xl border-b border-white/5 shadow-2xl" : "py-8 bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-14">
        <Link to="/" className="group flex items-center gap-3">
          <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-blue-600 flex items-center justify-center font-black text-white text-xl md:text-2xl shadow-lg ring-1 ring-blue-400/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">Z</div>
          <span className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">Zenvoco</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-10 lg:flex animate-fade-in pl-10 border-l border-white/10 ml-10">
          <NavLink href="#home">Home</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#about">About</NavLink>
          <div className="w-[1px] h-6 bg-white/10" />
          <NavLink href="/login">Sign In</NavLink>
          <Link to="/register" className="rounded-2xl bg-blue-600 px-8 py-3.5 font-black text-sm uppercase tracking-widest text-white transition-all hover:bg-white hover:text-blue-600 hover:shadow-2xl hover:shadow-blue-500/20 active:scale-95 shadow-xl shadow-blue-600/10 italic">
            Register
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={toggleMenu}
          className={`relative z-[110] flex h-12 w-12 items-center justify-center rounded-2xl border transition-all active:scale-90 lg:hidden ${menuOpen ? "bg-white border-white text-black" : "bg-white/5 border-white/10 text-white"}`}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex flex-col justify-center items-center gap-12 p-10 transition-all duration-500 ease-in-out lg:hidden ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-100%] pointer-events-none"}`}>
        <div className="space-y-10 text-center animate-fade-in">
          <NavLink href="#home" onClick={toggleMenu}>Home</NavLink>
          <NavLink href="#how-it-works" onClick={toggleMenu}>How It Works</NavLink>
          <NavLink href="#about" onClick={toggleMenu}>About</NavLink>
          <div className="w-12 h-[1px] bg-white/10 mx-auto" />
          <NavLink href="/login" onClick={toggleMenu}>Sign In</NavLink>
          <Link 
            to="/register" 
            onClick={toggleMenu}
            className="block text-center rounded-[2rem] bg-blue-600 px-16 py-6 font-black text-2xl uppercase tracking-tighter text-white transition-all active:scale-95 italic"
          >
            Join Matrix
          </Link>
        </div>
        <div className="mt-20 text-zinc-600 font-black text-xs uppercase tracking-[0.4em] italic pl-2">Zenvoco Operational Meta</div>
      </div>
    </nav>
  );
}

export default memo(Navbar);
