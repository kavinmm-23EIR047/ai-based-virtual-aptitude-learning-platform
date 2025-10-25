import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-700">404</h1>
      <p className="text-xl text-gray-600 mt-2">Page not found</p>
      <Link
        to="/dashboard"
        className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Go Home
      </Link>
    </div>
  );
}
