import { NavLink } from "react-router-dom";
import { Home, MessageCircle, BarChart2 } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600">AI Tutor</h1>
      </div>
      <nav className="mt-10">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg ${
              isActive ? "bg-indigo-100 text-indigo-600" : ""
            }`
          }
        >
          <Home className="mr-3" /> Dashboard
        </NavLink>

        {/* Chatbot */}
        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            `flex items-center p-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg mt-2 ${
              isActive ? "bg-indigo-100 text-indigo-600" : ""
            }`
          }
        >
          <MessageCircle className="mr-3" /> Chatbot
        </NavLink>

        {/* Progress */}
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `flex items-center p-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg mt-2 ${
              isActive ? "bg-indigo-100 text-indigo-600" : ""
            }`
          }
        >
          <BarChart2 className="mr-3" /> Progress
        </NavLink>
      </nav>
    </aside>
  );
}
