const express = require("express");
const app = express();
const User = require("../../models/AdminModel/userSchema");
const {
  authenticate,
  authorize,
} = require("../../middleware/authenticate_mid");

app.post("/users", authorize(["admin"]), async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to create a new user" });
  }
});

app.get("/users", authorize(["admin"]), async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

app.get("/users/:email", authorize(["admin"]), async (req, res) => {
  try {
    const user = await User.findById({email: req.params.email});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve the user" });
  }
});

// app.put("/users/:id", authorize(["admin"]), async (req, res) => {
  app.put("/users/:username" ,async (req, res) => {
    
  try {
    const findRecord = req.body._id;
    if (true) {
      const updatedRecord = await User.findByIdAndUpdate(findRecord, {
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age,
        role: req.body.role
      });
      res.json(updatedRecord);
    }
    else {
      res.status(404).send("Article Not Found");
    }
  }

  // try {
    
  //   const user = await User.findByIdAndUpdate(req.params.username, req.body, {
  //     new: true,
  //   });
  //   console.log("Did i Get here")
  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }
  //   res.json(user);
  // }
   catch (error) {
    res.status(500).json({ error: "Failed to update the user" });
  }
});

app.delete("/users/:id", authorize(["admin"]), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the user" });
  }
});

module.exports = app;
