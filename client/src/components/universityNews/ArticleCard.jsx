import React from "react";

const ArticleCard = ({ article, onReadMore }) => (
  <div className="  bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full">
    <img
      src={article.image}
      alt={article.title}
      className="w-full h-32 sm:h-48 object-cover"
    />
    <div className="p-3 sm:p-4 flex flex-col flex-grow">
      <h3 className="text-sm sm:text-lg font-semibold">{article.title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
        {article.content.substring(0, 80)}...
      </p>
      <button
        onClick={() => onReadMore(article)}
        className="text-blue-500 mt-2 sm:mt-4 text-xs sm:text-sm self-start"
      >
        Read More
      </button>
    </div>
  </div>
);

export default ArticleCard;