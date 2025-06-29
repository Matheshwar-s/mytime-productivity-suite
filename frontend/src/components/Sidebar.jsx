import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Calendar,
  Code,
  BarChart2,
  Menu,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  ListChecks,
} from "lucide-react";

export default function Sidebar({ darkMode, toggleDarkMode }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: <BarChart2 /> },
    { name: "Calendar", path: "/calendar", icon: <Calendar /> },
    { name: "Compiler", path: "/compiler", icon: <Code /> },
    { name: "Aptitude", path: "/aptitude", icon: <Menu /> },
    { name: "Tasks", path: "/tasks", icon: <ListChecks /> },
  ];

  return (
    <div className={`${collapsed ? "w-20" : "w-64"} bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 h-full flex flex-col transition-all`}>
      <div className="p-4 flex items-center justify-between">
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
        {!collapsed && <span className="font-bold text-lg">MyTime</span>}
      </div>
      <nav className="flex-1 p-4 space-y-3">
        {menuItems.map(item => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded transition hover:bg-gray-300 dark:hover:bg-gray-700 ${
                isActive ? "bg-gray-300 dark:bg-gray-700 font-semibold" : ""
              }`
            }
          >
            {item.icon}
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-300 dark:border-gray-700">
        <button onClick={toggleDarkMode} className="flex items-center gap-2 p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          {darkMode ? <Sun /> : <Moon />}
          {!collapsed && <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>
    </div>
  );
}
