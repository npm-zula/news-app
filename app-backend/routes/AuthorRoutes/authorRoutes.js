const express = require("express");
const app = express();
const User = require("../../models/UserModel/userSchema");

// tested with postman
app.post("/register", async (req, res) => {
  try {
    if (req.body.role !== "author")
      throw new Error("You are not allowed to register as author");

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

module.exports = app;
