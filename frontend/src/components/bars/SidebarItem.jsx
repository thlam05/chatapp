import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon, text, to, onClick }) {

  const baseClass =
    "flex items-center gap-2 p-2 rounded-lg cursor-pointer transition";

  // nếu là action (logout)
  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseClass} hover:bg-gray-100 text-gray-700 w-full text-left`}
      >
        {icon}
        <span>{text}</span>
      </button>
    );
  }

  // nếu là navigation
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClass} ${isActive
          ? "bg-purple-50 text-purple-600 border border-purple-200"
          : "hover:bg-gray-100 text-gray-700"
        }`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
}