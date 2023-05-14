const express = require("express");
const app = express();
const port = 3000;
var mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
app.use(express.json());


require("dotenv").config();

const authorRouter = require('./routes/AuthorRoutes/author.js')
const articleRouter = require('./routes/ArticleRoutes/articleRoutes.js')
const approvalRouter = require('./routes/ArticleRoutes/approvalRoutes.js')

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


//Routes
app.use("/api/author", authorRouter)
app.use("/api/articles", articleRouter)
app.use("/api/approval", approvalRouter)


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});