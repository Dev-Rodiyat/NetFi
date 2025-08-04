import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Dashboard", to: "/dashboard" },
];

const Footer = () => {
  const linkClasses = ({ isActive }) =>
    `relative px-4 py-2 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:text-blue-400 hover:bg-white/5 ${
      isActive
        ? "text-blue-400 bg-blue-500/10 shadow-lg shadow-blue-500/20"
        : "text-white"
    }`;

  return (
    <footer
      className="relative bg-slate-900 backdrop-blur-xl text-white py-8 px-4 border-t border-white/10 shadow-2xl shadow-black/20"
    >
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-cyan-600/5 opacity-0 hover:opacity-100 transition-opacity duration-500" />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Copyright text with subtle animation */}
        <div className="relative group">
          <p className="text-sm md:text-base font-medium bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 transform group-hover:scale-105">
            © {new Date().getFullYear()} NetFi. All rights reserved.
          </p>
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Navigation links */}
        <nav className="flex gap-2 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
          {navLinks.map(({ label, to }) => (
            <NavLink key={label} to={to} className={linkClasses}>
              {({ isActive }) => (
                <>
                  <span className="relative z-10">{label}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Subtle bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;