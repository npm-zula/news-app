const express = require("express");
const app = express();
require("dotenv").config();
const Article = require("../../models/ArticleModel/articleSchema");

//An Article approved by admin will be added in the article collection and will be removed from the approval collection
app.post("/approveArticle", async (req, res) => {
  const newArticle = new Article({
    articleID: req.body.articleID,
    title: req.body.title,
    body: req.body.body,
    published: req.body.published,
    tags: req.body.tags,
    authorUserName: req.body.authorUserName,
  });

  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error saving article");
  }
});

//Retrieveing all the Articles from the Database
app.get("/retrieveArticle", async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(
      articles.map((article) => ({
        articleID: article.articleID,
        title: article.title,
        body: article.body,
        published: article.published,
        tags: article.tags,
        authorUserName: article.authorUserName,
      }))
    );
  } catch (error) {
    console.error(error);
    s;
    res.status(500).send("Error retrieving articles");
  }
});

//Retrieveing all the Articles from the Database
app.get("/retrieveUserArticles/:authorID", async (req, res) => {
  try {
    const articles = await Article.findAll({ authorID: req.params.authorID });
    res.json(
      articles.map((article) => ({
        articleID: article.articleID,
        title: article.title,
        body: article.body,
        published: article.published,
        tags: article.tags,
        authorUserName: article.authorUserName,
      }))
    );
  } catch (error) {
    console.error(error);
    s;
    res.status(500).send("Error retrieving articles");
  }
});

//Updating the Articles
app.put("/editArticle", async (req, res) => {
  try {
    findRecord = await Article.findOne({ articleID: req.body.articleID });
    if (findRecord) {
      const updatedArticle = await Article.findByIdAndUpdate(findRecord._id, {
        articleID: req.body.articleID,
        title: req.body.title,
        body: req.body.body,
        published: req.body.published,
        tags: req.body.tags,
        authorUserName: req.body.authorUserName,
      });
      res.json(updatedArticle);
    } else {
      res.status(404).send("No Such Article Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating Comment");
  }
});

//editing information of the Article other than IDs etc
app.put("/editArticle", async (req, res) => {
  try {
    findRecord = await Article.findOne({ articleID: req.body.articleID });
    if (findRecord) {
      const updatedArticle = await Article.findByIdAndUpdate(findRecord._id, {
        articleID: req.body.articleID,
        title: req.body.title,
        body: req.body.body,
        published: req.body.published,
        tags: req.body.tags,
        authorUserName: req.body.authorUserName,
      });
      res.json(updatedArticle);
    } else {
      res.status(404).send("No Such Article Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating Comment");
  }
});

//This Route will allow both admin and the author to delete an article based on the article ID
app.delete("/deleteArticle/:articleId", async (req, res) => {
  try {
    findRecord = await Article.findOne({ articleID: req.params.articleId });
    if (findRecord) {
      const removedRecord = await Article.findByIdAndRemove(findRecord._id);
      res.json(removedRecord);
    } else {
      res.status(404).send("Article Not Found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting article");
  }
});

module.exports = app;
