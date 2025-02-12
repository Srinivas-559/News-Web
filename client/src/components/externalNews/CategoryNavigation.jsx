import React from 'react';

const CategoryNavigation = ({ categories, selectedCategory, onCategoryChange }) => (
  <div className="text-center py-8">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">External News</h1>
    <div className="flex justify-center space-x-6 text-lg flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white ${
            selectedCategory === category ? 'bg-blue-500 text-white' : 'text-gray-600'
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

export default CategoryNavigation;
