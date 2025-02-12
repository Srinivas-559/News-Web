import React from "react";

const ArticleCard = ({ article, onReadMore }) => (
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <img
      src={article.image}
      alt={article.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold">{article.title}</h3>
      <p className="text-sm text-gray-600 mt-2">
        {article.content.substring(0, 100)}...
      </p>
      <button
        onClick={() => onReadMore(article)}
        className="text-blue-500 mt-4 text-sm"
      >
        Read More
      </button>
    </div>
  </div>
);

export default ArticleCard;
