export default function SidebarItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition">

      <div className="text-gray-600">
        {icon}
      </div>

      <span className="text-sm font-medium">
        {text}
      </span>

    </div>
  );
}