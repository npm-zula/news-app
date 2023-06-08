const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Comment = require('../../models/ArticleModel/commentSchema')


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())


//Creating a New Article to the Database
app.post('/addComment', async (req, res) => {
    const newComment = new Comment({
        articleID: req.body.articleID,
        userName: req.body.userName,
        commentID: req.body.commentID,
        body: req.body.body 
    });

    try {
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error Adding Comment');
    }
});



//Retrieveing all the Articles from the Database
app.get('/retrieveComments', async (req, res) => {
    try {
        const comments = await Comment.find({});
        res.json(
            comments.map((comment) => ({
                articleID: comment.articleID,
                userName: comment.userName,
                commentID: comment.commentID,
                body: comment.body 
            }))
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving articles');
    }
});


//Retrieveing all the Articles from the Database
app.get('/retrieveUserComments/:username', async (req, res) => {
    try {
        const comments = await Comment.find({userName: req.params.username});
        res.json(
            comments.map((comment) => ({
                articleID: comment.articleID,
                userName: comment.userName,
                commentID: comment.commentID,
                body: comment.body 
            }))
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving articles');
    }
});

//Updating the Articles
app.put('/editComment', async (req, res) => {
    try {

        findRecord = await Comment.findOne({ commentID: req.body.commentID })
        if(findRecord){
            const updatedComment = await Comment.findByIdAndUpdate(
                findRecord._id,
                {
                    articleID: req.body.articleID,
                    userName: req.body.userName,
                    commentID: req.body.commentID,
                    body: req.body.body 
                }
            );
            res.json(updatedComment);
        }
        else{
            res.status(404).send("No Such Comment Found")
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating Comment');
    }
});


//Deleting the Articles
app.delete('/deleteComment/:commentId', async (req, res) => {
    try {
        findRecord = await Comment.findOne({ commentID: req.params.commentId })
        if(findRecord){
            const removedRecord = await Comment.findByIdAndRemove(findRecord._id);
            res.json(removedRecord);
        }
        else{
            res.status(404).send("No Such Comment Found")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting article');
    }
});





module.exports = app