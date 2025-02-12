import React from 'react';

const Tabs = ({ activeTab, tabs, onTabClick }) => (
  <div className="mb-6">
    <div className="flex space-x-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`px-4 py-2 rounded-md ${
            activeTab === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-600"
          } transition-colors duration-300`}
        >
          {tab}
        </button>
      ))}
    </div>
  </div>
);

export default Tabs;
