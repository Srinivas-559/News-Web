import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import FeaturedCarousel from "../components/universityNews/FeaturedCrousel";
import Tabs from "../components/universityNews/Tabs";
import ArticlesList from "../components/universityNews/ArticleList";
import ArticleDialog from "../components/universityNews/ArticleDialogue";
import { useAuth } from "../context/AuthContext";

const UniversityNewsPage = () => {
  const { user } = useAuth();
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [categorizedArticles, setCategorizedArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("Featured");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    if (!user) return; // Early return inside useEffect is fine

    const socket = io("http://localhost:5005");

    // Listen for real-time updates
    socket.on("articleAdded", (newArticle) => {
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

    // ... rest of your socket event handlers ...

    return () => {
      socket.disconnect();
    };
  }, [user]); // Add user to dependency array

  useEffect(() => {
    if (!user) return; // Early return inside useEffect is fine

    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/articles/getArticles",
          {
            withCredentials: true,
          }
        );
        const articles = response.data.articles;
        const featured = articles.filter((article) => article.isFeatured);
        setFeaturedArticles(featured.slice(0, 5));
        
        const categories = [
          "Science",
          "Sports",
          "Entertainment",
          "Technology",
          "Others",
        ];
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
  }, [user]); // Add user to dependency array

  if (!user) {
    return (
      <div className="text-5xl text-center w-full h-full">
        <h1 className="mt-[40vh] font-bold text-[#90939a] animate-pulse">
          Login with your university mail!
        </h1>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 mt-[7rem]">
      {/* Featured Carousel */}
      <div className="mb-8">
        <FeaturedCarousel featuredArticles={featuredArticles} />
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <Tabs
          activeTab={activeTab}
          tabs={[
            "Featured",
            "Science",
            "Entertainment",
            "Technology",
            "Sports",
            "Others",
          ]}
          onTabClick={handleTabClick}
        />
      </div>

      {/* Articles List */}
      <div className="flex flex-wrap gap-4  w-[100%]">
        {activeCategory && (
          <ArticlesList
            articles={activeCategory.articles}
            onReadMore={handleOpenDialog}
          />
        )}
      </div>

      {/* Article Dialog */}
      <ArticleDialog
        open={openDialog}
        article={selectedArticle}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default UniversityNewsPage;