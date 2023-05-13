const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../../models/userSchema");
const {
  authenticate,
  authorize,
} = require("../../middleware/authenticate_mid");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;
    const user = new User({ name, email, password, contact, role });
    await user.save();
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) throw new Error("Invalid email or password");
    const token = jwt.sign({ id: user.id, role: user.role }, secretKey);
    // console.log(token)
    // localStorage.setItem('token', token);
    res.status(200).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

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

module.exports = router;
