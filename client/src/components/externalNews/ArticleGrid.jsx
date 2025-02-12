import React from 'react';
import NewsCard from './NewsCard';

const ArticleGrid = ({ articles }) => {
  if (articles.length === 0) {
    return <div className="text-center text-gray-600 text-lg">No articles found for this category.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} />
      ))}
    </div>
  );
};

export default ArticleGrid;
