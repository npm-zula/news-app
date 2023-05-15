const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Forum = require('../../models/ForumModel/forumSchema')
const { find } = require('../../models/AuthorModel/authorSchema')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())


//Creating a New Forum to the Database
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


//Retrieveing all the Forums from the Database
app.get('/retrieveForums', async (req, res) => {
    try {
        const forums = await Forum.find({});
        res.json(
            forums.map((forum) => ({
                question: forum.question,
                questionID: forum.questionID,
                userID: forum.userID,
                answer: forum.answer
            }))
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving forums');
    }
});


//Editing the forum
app.put('/updateForum', async (req, res) => {
    try {

        findRecord = await Forum.findOne({ questionID: req.body.questionID })
        if(findRecord){
            const updatedForum = await Forum.findByIdAndUpdate(
                findRecord._id,
                {
                    question: req.body.question,
                    questionID: req.body.questionID,
                    userID: req.body.userID,
                    answer: req.body.answer
                },
            );
            res.json(updatedForum);    
        }else {
            res.send("No Such Record Found")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating Forum');
    }
});


//Deleting a Forum
app.delete('/deleteForum/:questionId', async (req, res) => {
    try {
        findRecord = await Forum.findOne({ questionID: req.params.questionId })
        if(findRecord){
            const removedRecord = await Forum.findByIdAndRemove(findRecord._id);
            res.json(removedRecord);
        }
        else{
            res.status(404).send("Forum Not Found")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting Forum');
    }
});



module.exports = app