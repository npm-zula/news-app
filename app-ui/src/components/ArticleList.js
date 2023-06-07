import React, { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/articles/retrieveArticle",
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Handle the user data
        setArticles(data);
      } else {
        throw new Error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-accent_primary">Other Articles</h1>
      <div class="grid grid-cols-3 gap-2 p-4">
        {articles.slice(1, 7).map((article) => (
          <ArticleCard article={article} />
        ))}
        {/* <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard /> */}
      </div>
    </div>
  );
};

export default ArticleList;
