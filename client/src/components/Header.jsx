import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();

  if (loading) {
    return null; // Or a loading spinner/component
  }

  return (
    <header className="bg-gray-800 text-white relative z-50">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold flex-shrink-0">
          <Link to="/">University News</Link>
        </div>

        {/* Navigation Links */}
        <nav className="hidden sm:flex space-x-8">
          {["home", "universityNews", "externalNews", "about", "events", "dashboard"].map((section) => (
            <Link
              key={section}
              to={section === "home" ? "/" : `/${section}`}
              className="hover:text-yellow-400 capitalize"
            >
              {section.replace(/([A-Z])/g, " $1")}
            </Link>
          ))}
        </nav>

        {/* User Profile and Logout */}
        {isAuthenticated && (
          <div className="hidden sm:flex items-center space-x-4">
            {user && user.name && (
              <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
