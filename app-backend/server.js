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
//const inventoryRouter = require('./Routes/inventoryRoutes')

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;


//Routes
app.use("/api/author", authorRouter)
//app.use("/api/inventory", inventoryRouter)


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
