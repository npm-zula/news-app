const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Forum = require('../../models/ForumModel/ForumSchema')
const { find } = require('../../models/AuthorModel/authorSchema')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())


//Creating a New Article to the Database
app.post('/createForum', async (req, res) => {
    const newForum = new Forum({
        question: req.body.question,
        questionID: req.body.questionID,
        userID: req.body.userID,
        answer: req.body.answer
    });

    try {
        const savedForum = await newForum.save();
        res.status(201).json(savedForum);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error saving new Forum');
    }
});


//Retrieveing all the Articles from the Database
app.get('/retrieveArticles', async (req, res) => {
    try {
        const articles = await Forum.find({});
        res.json(
            articles.map((article) => ({
                articleID: article.articleID,
                title: article.title,
                body: article.body,
                published: article.published,
                tags: article.tags,
                authorUserName: article.authorUserName
            }))
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving articles');
    }
});





//Deleting the Articles
app.delete('/deleteArticle/:articleId', async (req, res) => {
    try {
        findRecord = await Forum.findOne({ articleID: req.params.articleId })
        if(findRecord){
            const removedRecord = await Forum.findByIdAndRemove(findRecord._id);
            res.json(removedRecord);
        }
        else{
            res.status(404).send("Article Not Found")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting article');
    }
});



module.exports = app