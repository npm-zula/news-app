const express = require("express");
const router = express.Router();
const Article = require("../../models/ArticleModel/articleSchema");

// GET /articles/search?tags=tag1,tag2,tag3
router.get("/articles", async (req, res) => {
  const { tags } = req.query;

  try {
    const tagArray = tags.split(",").map((tag) => tag.trim());
    const articles = await Article.find({ tags: { $in: tagArray } });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: "Failed to search for articles" });
  }
});

module.exports = router;
