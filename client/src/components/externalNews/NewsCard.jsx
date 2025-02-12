import React from 'react';

const NewsCard = ({ article }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800">{article.title}</h2>
      <p className="text-gray-600 mt-2">{article.content.substring(0, 100)}...</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">By {article.author}</span>
        <span className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</span>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => window.open(article.url, '_blank')}
      >
        Read More
      </button>
    </div>
  </div>
);

export default NewsCard;
