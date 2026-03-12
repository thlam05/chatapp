import { NavLink } from "react-router-dom";

export default function SidebarItem({ icon, text, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-lg cursor-pointer transition
        ${isActive
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