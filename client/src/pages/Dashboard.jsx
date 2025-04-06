import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  FiPlus, FiFileText, FiCalendar, FiBarChart, FiSettings 
} from 'react-icons/fi';
import CreateArticle from '../components/dashboard/CreateArticle';
import ViewArticles from '../components/dashboard/ViewArticles';
import CreateEvent from '../components/dashboard/CreateEvent';
import ViewEvents from '../components/dashboard/ViewEvents';

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('articles');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const navigationItems = [
    { id: 'create-article', icon: <FiPlus />, label: 'New Article' },
    { id: 'articles', icon: <FiFileText />, label: 'Articles' },
    { id: 'create-event', icon: <FiPlus />, label: 'New Event' },
    { id: 'events', icon: <FiCalendar />, label: 'Events' },
    { id: 'analytics', icon: <FiBarChart />, label: 'Analytics' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-20">
      {/* Dashboard Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">News Portal Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <FiSettings className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Navigation Sidebar */}
        <motion.nav 
          className={`md:w-64 bg-white rounded-xl shadow-lg p-4 h-fit sticky top-8
            ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${
                      activeTab === item.id
                        ? 'bg-blue-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </motion.nav>

        {/* Main Content */}
        <main className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            {activeTab === 'create-article' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Article</h2>
                <CreateArticle />
              </div>
            )}

            {activeTab === 'articles' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Manage Articles</h2>
                  <button
                    onClick={() => setActiveTab('create-article')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <FiPlus className="w-5 h-5" />
                    New Article
                  </button>
                </div>
                <ViewArticles />
              </div>
            )}

            {activeTab === 'create-event' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Event</h2>
                <CreateEvent />
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Manage Events</h2>
                  <button
                    onClick={() => setActiveTab('create-event')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <FiPlus className="w-5 h-5" />
                    New Event
                  </button>
                </div>
                <ViewEvents />
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <FiBarChart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-gray-600">
                    Detailed analytics and insights coming soon. Stay tuned!
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;