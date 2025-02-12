import React, { useState, useEffect } from "react";
import axios from 'axios';
import { io } from 'socket.io-client';
import FeaturedCarousel from "../components/universityNews/FeaturedCrousel";
import Tabs from "../components/universityNews/Tabs";
import ArticlesList from "../components/universityNews/ArticleList";
import ArticleDialog from "../components/universityNews/ArticleDialogue";


const UniversityNewsPage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [categorizedArticles, setCategorizedArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("Featured");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
      const socket = io('http://localhost:5005'); // Connect to the Socket.IO server

      // Listen for real-time updates
      socket.on('articleAdded', (newArticle) => {
          setFeaturedArticles((prev) => [newArticle, ...prev]);
          setCategorizedArticles((prev) => {
              const updatedCategories = prev.map((category) => {
                  if (category.category === newArticle.category) {
                      return { ...category, articles: [newArticle, ...category.articles] };
                  }
                  return category;
              });
              return updatedCategories;
          });
      });

      socket.on('articleDeleted', (deletedArticleId) => {
          setFeaturedArticles((prev) => prev.filter((article) => article._id !== deletedArticleId));
          setCategorizedArticles((prev) => {
              const updatedCategories = prev.map((category) => ({
                  ...category,
                  articles: category.articles.filter((article) => article._id !== deletedArticleId),
              }));
              return updatedCategories;
          });
      });

      socket.on('articleUpdated', (updatedArticle) => {
          setFeaturedArticles((prev) =>
              prev.map((article) => (article._id === updatedArticle._id ? updatedArticle : article))
          );
          setCategorizedArticles((prev) => {
              const updatedCategories = prev.map((category) => ({
                  ...category,
                  articles: category.articles.map((article) =>
                      article._id === updatedArticle._id ? updatedArticle : article
                  ),
              }));
              return updatedCategories;
          });
      });
    
      socket.on('articleLiked', ({ articleId, likes }) => {
        setFeaturedArticles((prev) =>
            prev.map((article) =>
                article._id === articleId ? { ...article, likes } : article
            )
        );
        setCategorizedArticles((prev) =>
            prev.map((category) => ({
                ...category,
                articles: category.articles.map((article) =>
                    article._id === articleId ? { ...article, likes } : article
                ),
            }))
        );
    });

    socket.on('articleCommented', ({ articleId, comment }) => {
        setFeaturedArticles((prev) =>
            prev.map((article) =>
                article._id === articleId ? { ...article, comments: [...article.comments, comment] } : article
            )
        );
        setCategorizedArticles((prev) =>
            prev.map((category) => ({
                ...category,
                articles: category.articles.map((article) =>
                    article._id === articleId ? { ...article, comments: [...article.comments, comment] } : article
                ),
            }))
        );
    });

      return () => {
          socket.disconnect(); // Clean up on unmount
      };
  }, []);

  useEffect(() => {
      const fetchArticles = async () => {
          try {
              const response = await axios.get('http://localhost:5005/api/articles/getArticles', {
                  withCredentials: true,
              });
              const articles = response.data.articles;
              const featured = articles.filter((article) => article.isFeatured);
              setFeaturedArticles(featured.slice(0, 5));

              const categories = ["Science", "Sports", "Entertainment", "Technology", "Others"];
              const grouped = categories.map((category) => ({
                  category,
                  articles: articles.filter((article) => article.category === category),
              }));
              setCategorizedArticles(grouped);
          } catch (error) {
              console.error("Error fetching articles:", error);
          }
      };

      fetchArticles();
  }, []);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenDialog = (article) => {
    setSelectedArticle(article);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedArticle(null);
  };

  const activeCategory =
    activeTab === "Featured"
      ? { category: "Featured", articles: featuredArticles }
      : categorizedArticles.find((category) => category.category === activeTab);

  return (
    <div className="container mx-auto px-4">
      <FeaturedCarousel featuredArticles={featuredArticles} />
      <Tabs
        activeTab={activeTab}
        tabs={["Featured", "Science", "Entertainment", "Technology", "Sports", "Others"]}
        onTabClick={handleTabClick}
      />
      {activeCategory && (
        <ArticlesList
          articles={activeCategory.articles}
          onReadMore={handleOpenDialog}
        />
      )}
      <ArticleDialog open={openDialog} article={selectedArticle} onClose={handleCloseDialog} />
    </div>
  );
};

export default UniversityNewsPage;
