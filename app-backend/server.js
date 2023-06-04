const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("dotenv").config();

const NotificationRouter = require("./routes/NotificationRoutes/notificationRoutes.js");
const SearchRouter = require("./routes/searchRoutes/searchRoute.js");
const SubscriptionRouter = require("./routes/subscriptionRoutes/subRoutes.js");
const WeatherRouter = require("./routes/weatherRoutes/weatherRoute.js");

const adminRouter = require("./routes/adminRoutes/adminRoutes.js");
const UserRouter = require("./routes/UserRoutes/userRoutes.js");
const authorRouter = require("./routes/AuthorRoutes/authorRoutes.js");

const articleRouter = require("./routes/ArticleRoutes/articleRoutes.js");
const approvalRouter = require("./routes/ArticleRoutes/approvalRoutes.js");
const forumRouter = require("./routes/ForumRoutes/forumRoutes.js");
const commentRouter = require("./routes/ArticleRoutes/commentRoutes.js");

const PORT = 3000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use("/api/notification", NotificationRouter);
app.use("/api/search", SearchRouter);
app.use("/api/subscription", SubscriptionRouter);
app.use("/api/weather", WeatherRouter);

app.use("/api/admin", adminRouter);
app.use("/api/user", UserRouter);
app.use("/api/author", authorRouter);

app.use("/api/articles", articleRouter);
app.use("/api/approval", approvalRouter);
app.use("/api/forum", forumRouter);
app.use("/api/comments", commentRouter);

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

app.get("/", (req, res) => {
  res.send("Hello JEE! LAHORE LINK BACKEND");
});
