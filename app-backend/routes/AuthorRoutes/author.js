const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Author = require('../../models/AuthorModel/authorSchema')
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())


//Signup Route
app.post("/signup", async (req, res) => {
  try {
    const author = await new Author(req.body);
    author
      .save()
      .then((response) => {
        console.log(response);
        res.status(200).json({ status: response });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.json({ status: "error" });
  }
});


// Login Route
app.post("/login", async (req, res) => {
  const author = await Author.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .then((obj) => {
      if (obj) {
        res.json({ found: true, object: obj });
      } else {
        res.json({ found: false });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});


module.exports = app;
