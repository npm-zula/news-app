const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../../models/UserModel/userSchema");
const {
  authenticate,
  authorize,
} = require("../../middleware/authenticate_mid");

// // tested with postman
router.get("/", async (req, res) => {
  // get all users
  try {
    res.send("user routes");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// tested with postman
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, age, role } = req.body;
    const user = new User({ name, username, email, password, age, role });
    await user.save();
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY
    );
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// tested with postman

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) throw new Error("Invalid email or password");
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY
    );
    // console.log(token)
    // localStorage.setItem('token', token);
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// tested with postman
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// tested with postman
router.put("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) throw new Error("User not found");
    const { username, password, age } = req.body;
    user.username = username || user.username;
    user.password = password || user.password;
    user.age = age || user.age;
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get user by username
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) throw new Error("User not found");
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
