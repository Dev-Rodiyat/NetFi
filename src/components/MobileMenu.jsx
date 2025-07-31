import { NavLink } from "react-router-dom";

const MobileMenu = ({ navLinks, setMobileOpen }) => {
  return (
    <div className="md:hidden bg-white dark:bg-neutral-900 text-neutral-800 dark:text-white px-6 py-4 space-y-3 rounded-b-2xl shadow-lg">
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          to={link.path}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg transition-colors duration-200 ${
              isActive
                ? "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200 font-semibold"
                : "hover:bg-orange-50 dark:hover:bg-neutral-800 hover:text-orange-500"
            }`
          }
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  );
};

export default MobileMenu;
