import React from "react";

const Tabs = ({ activeTab, tabs, onTabClick }) => (
  <div className="mb-6">
    <div className="flex flex-wrap space-x-2 space-y-2 whitespace-nowrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`px-2 py-1 sm:px-3  sm:py-1.5   rounded-md sm:text-[10px] md:text-[12px] lg:text-[16px]  ${
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