import React from "react";
import ArticleCard from "./ArticleCard";

const ArticleList = () => {
  return (
    <div>
      <h1 className="text-4xl font-bold text-accent_primary">Other Articles</h1>
      <div class="grid grid-cols-3 gap-2 p-4">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </div>
  );
};

export default ArticleList;
