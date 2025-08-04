import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "History", to: "/history" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (to) => {
    navigate(to);
    setMenuOpen(false);
  };

  const linkClasses = (to) =>
    `relative px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
      location.pathname === to
        ? "text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20"
        : "text-white hover:text-blue-400 hover:bg-white/5"
    }`;

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />
      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="relative group">
            <h1
              className="text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent cursor-pointer transition-all duration-300 transform group-hover:scale-105"
              onClick={() => navigate("/")}
            >
              NetFi
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <nav className="hidden md:flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
            {navLinks.map(({ label, to }) => (
              <button
                key={label}
                onClick={() => handleNavClick(to)}
                className={linkClasses(to)}
              >
                <span className="relative z-10">{label}</span>
                {location.pathname === to && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl" />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={toggleMenu}
            className="md:hidden relative p-2 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10 text-white hover:text-blue-400 hover:bg-white/5 transition-all duration-300 transform hover:scale-105 focus:outline-none"
          >
            <div className="relative z-10">
              {menuOpen ? (
                <X
                  size={24}
                  className="transform rotate-0 transition-transform duration-300"
                />
              ) : (
                <Menu
                  size={24}
                  className="transform rotate-0 transition-transform duration-300"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <MobileMenu
          closeMenu={toggleMenu}
          navLinks={navLinks}
          currentPath={location.pathname}
          setCurrentPath={(to) => navigate(to)}
        />
      </div>

      {scrolled && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-ping"
              style={{
                left: Math.random() * 100 + "%",
                top: "50%",
                animationDelay: Math.random() * 2 + "s",
                animationDuration: 1 + Math.random() + "s",
              }}
            />
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;