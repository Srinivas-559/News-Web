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

  return (
    <div className="w-[100%]">
      <div className=" w-[100%]  flex flex-wrap gap-6 mb-[5rem]">
        {visibleArticles.map((article, index) => (
          <div key={index} className="w-[100%]  sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]">
            <ArticleCard article={article} onReadMore={onReadMore} />
          </div>
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