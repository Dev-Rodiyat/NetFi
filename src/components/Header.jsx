import { useState } from "react";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { NavLink } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Jobs", path: "/jobs" },
  { name: "Saved Jobs", path: "/saved" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-orange-100 text-orange-600 px-4 py-3 shadow-md rounded-b-2xl fixed w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold tracking-wide">StackJobs</div>

        <nav className="hidden md:flex space-x-6 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-orange-700 ${isActive ? "font-semibold text-orange-800" : ""}`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden focus:outline-none"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <MobileMenu navLinks={navLinks} setMobileOpen={setMobileOpen} />
      )}
    </header>
  );
};

export default Header;
