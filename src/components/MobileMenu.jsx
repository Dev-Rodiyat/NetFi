// MobileMenu.jsx
import { useState, useEffect } from "react";

const MobileMenu = ({ closeMenu, navLinks, currentPath, setCurrentPath }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true); // Trigger entrance animation
  }, []);

  const handleNavClick = (to) => {
    setCurrentPath(to); // This is now the navigate function
    closeMenu();
  };

  const linkClasses = (to, index) =>
    `relative group block w-full text-left px-6 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:translate-x-2 hover:scale-105 ${
      currentPath === to
        ? "text-blue-400 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg shadow-blue-500/20"
        : "text-white hover:text-blue-400 hover:bg-white/10"
    }`;

  return (
    <div className="md:hidden relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-purple-900/90 to-slate-900/95 backdrop-blur-xl" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-4 right-8 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
        <div
          className="absolute bottom-4 left-8 w-16 h-16 bg-purple-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10 px-6 py-8 space-y-2">
        {navLinks.map(({ label, to }, index) => (
          <div
            key={label}
            className={`transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              animationDelay: `${index * 100}ms`,
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <button
              onClick={() => handleNavClick(to)}
              className={linkClasses(to, index)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {currentPath === to && (
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full shadow-lg shadow-blue-400/50" />
              )}
              <span className="relative z-10 flex items-center">
                <span
                  className={`transition-all duration-300 ${
                    currentPath === to ? "ml-4" : "group-hover:ml-2"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`ml-auto transition-all duration-300 transform ${
                    currentPath === to
                      ? "opacity-100 translate-x-0 text-blue-400"
                      : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-400"
                  }`}
                >
                  →
                </span>
              </span>
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-white/10 rounded-2xl scale-0 group-active:scale-100 transition-transform duration-200" />
              </div>
            </button>
          </div>
        ))}

        <div
          className={`mt-8 pt-6 border-t border-white/10 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-400/60 rounded-full animate-pulse" />
            <div
              className="w-2 h-2 bg-purple-400/60 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="w-2 h-2 bg-cyan-400/60 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <p className="text-center text-slate-400 text-sm mt-4">
            NetFi Analytics Platform
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default MobileMenu;