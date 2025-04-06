import React, { useEffect, useState } from 'react';
import CategoryNavigation from '../components/externalNews/CategoryNavigation';
import ArticleGrid from '../components/externalNews/ArticleGrid';
import PaginationControls from '../components/externalNews/PaginationControls';

const ExternalNewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  const categories = ['All', 'Business', 'Sports', 'Entertainment', 'Science', 'Technology', 'Politics'];
  const articlesPerPage = 15;

  // Fetch articles from the API
  const fetchArticles = async (category, page) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiKey = '0486910e1d3041ca817a0cfae61cf52c';
      const url =
        category === 'All'
          ? `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${articlesPerPage}&apiKey=${apiKey}`
          : `https://newsapi.org/v2/top-headlines?country=us&category=${category.toLowerCase()}&page=${page}&pageSize=${articlesPerPage}&apiKey=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'ok') {
        setArticles(
          data.articles.map((article) => ({
            title: article.title,
            image: article.urlToImage || 'https://via.placeholder.com/300',
            content: article.description || 'No description available.',
            author: article.author || 'Unknown',
            date: article.publishedAt || new Date().toISOString(),
            url: article.url,
          }))
        );
        setTotalResults(data.totalResults);
      } else {
        setError('Failed to fetch articles.');
      }
    } catch (err) {
      setError('An error occurred while fetching articles.');
    }

    setIsLoading(false);
  };

  // Fetch articles when category or page changes
  useEffect(() => {
    fetchArticles(selectedCategory, currentPage);
  }, [selectedCategory, currentPage]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page when changing category
  };

  return (
    <div className="container mx-auto mb-[5rem] px-4 mt-[5rem]">
      <CategoryNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      {isLoading && <div className="text-center text-gray-600 text-lg mt-8">Loading articles...</div>}
      {error && <div className="text-center text-red-500 text-lg mt-8">{error}</div>}
      {!isLoading && !error && <ArticleGrid articles={articles} />}
      <PaginationControls
        currentPage={currentPage}
        totalResults={totalResults}
        articlesPerPage={articlesPerPage}
        onNext={() => setCurrentPage((prevPage) => prevPage + 1)}
        onPrevious={() => setCurrentPage((prevPage) => prevPage - 1)}
      />
    </div>
  );
};

export default ExternalNewsPage;
