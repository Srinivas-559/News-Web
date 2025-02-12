import React, { useEffect, useRef, useState } from "react";
import ArticleCard from "./ArticleCard";

const ArticlesList = ({ articles, onReadMore }) => {
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  useEffect(() => {
    setVisibleArticles(articles.slice(0, 6));
  }, [articles]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreArticles();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [visibleArticles, hasMore]);

  const loadMoreArticles = () => {
    const currentLength = visibleArticles.length;
    const moreArticles = articles.slice(currentLength, currentLength + 6);

    if (moreArticles.length === 0) {
      setHasMore(false);
    } else {
      setVisibleArticles((prev) => [...prev, ...moreArticles]);
    }
  };

  // ✅ Function to update likes globally
  const handleLikeUpdate = (updatedArticle) => {
    setVisibleArticles((prevArticles) =>
      prevArticles.map((article) =>
        article._id === updatedArticle._id ? updatedArticle : article
      )
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleArticles.map((article, index) => (
          <ArticleCard key={index} article={article} onReadMore={onReadMore} />
        ))}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="mt-6 flex justify-center">
          <span className="text-gray-500">Loading more articles...</span>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
