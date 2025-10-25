
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut } from "lucide-react";

export default function Header() {
  const { user, handleLogout } = useContext(AuthContext);

  // Safe way to get user's name
  const userName = user && user.name ? user.name : "User";

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold">Welcome, {userName}</h2>
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
      >
        <LogOut className="mr-2" /> Logout
      </button>
    </header>
  );
}
