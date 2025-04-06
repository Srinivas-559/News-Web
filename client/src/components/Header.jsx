
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import throttle from "lodash.throttle";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const location = useLocation();
  const lastScrollY = useRef(0);
  const isOpenRef = useRef(isOpen);

  // Keep isOpenRef updated
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  // Scroll handlers
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (isOpenRef.current) return;

      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up";
      
      // Show/hide header based on scroll direction
      if (scrollDirection === "down" && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else if (scrollDirection === "up") {
        setIsHeaderVisible(true);
      }

      // Always show header at top
      if (currentScrollY === 0) {
        setIsHeaderVisible(true);
      }

      // Update background opacity
      setIsScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", name: "Home" },
    { path: "/universityNews", name: "Campus News" },
    { path: "/externalNews", name: "World News" },
    { path: "/events", name: "Events" },
    { path: "/about", name: "About" },
    { path: "/dashboard", name: "Dashboard" },
  ];

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 backdrop-blur-md ${
        isScrolled ? "bg-[#1f2937]/90" : "bg-[#1f2937]/50"
      } transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: isHeaderVisible ? 0 : -100 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      {/* Rest of your header content remains the same */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/logo1.webp" 
              className="w-14 h-14 rounded-lg shadow-xl hover:shadow-2xl transition-shadow"
              alt="News Hub Logo"
            />
          </Link>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            UNI NEWS HUB
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                location.pathname === item.path 
                  ? "bg-blue-600/20 text-blue-400"
                  : "hover:bg-gray-700/30 hover:text-blue-300 text-gray-200"
              }`}
            >
              {item.name}
              {item.external && <FiExternalLink className="text-sm" />}
            </Link>
          ))}
          
          {/* User Dropdown */}
          {isAuthenticated && (
            <motion.div 
              className="relative"
              onHoverStart={() => setIsOpen(true)}
              onHoverEnd={() => setIsOpen(false)}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold cursor-pointer text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-12 right-0 bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 w-48 shadow-2xl"
                  >
                    <div className="text-sm space-y-3 text-gray-200">
                      <p className="text-blue-400 truncate">{user?.email}</p>
                      <button
                        onClick={logout}
                        className="w-full flex justify-between items-center px-3 py-2 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
                      >
                        Logout
                        <FaChevronDown className="rotate-90" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </motion.div>
        </button>
      </div>
      {/* Mobile sidebar code... */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="fixed top-0 right-0 h-full w-64 bg-gray-900 border-l border-gray-700/50 shadow-2xl md:hidden z-50"
    >
      <div className="p-6 h-full flex flex-col">
        {/* Close Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-lg transition-colors text-gray-100
                ${
                  location.pathname === item.path
                    ? "bg-blue-600/30 text-blue-400"
                    : "hover:bg-gray-800/70 hover:text-blue-300"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Section */}
        {isAuthenticated && (
          <div className="pt-8 border-t border-gray-700/50">
            <div className="text-sm space-y-3 text-gray-300">
              <p className="text-blue-400 truncate">{user?.email}</p>
              <button
                onClick={logout}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors"
              >
                Logout
                <FaChevronDown className="rotate-90" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </motion.header>
  );
};

export default Header;