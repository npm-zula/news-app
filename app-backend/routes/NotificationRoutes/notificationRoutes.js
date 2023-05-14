const express = require("express");
const router = express.Router();
const Notification = require("../models/notificationSchema");
const {
  authenticate,
  authorize,
} = require("../../middleware/authenticate_mid");

// GET /notifications
router.get("/notifications", authorize([""]), async (req, res) => {
  try {
    const notifications = await Notification.find().populate("recipient");
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve notifications" });
  }
});

// POST /notifications
router.post("/notifications", async (req, res) => {
  const { title, message, recipient } = req.body;

  try {
    const notification = await Notification.create({
      title,
      message,
      recipient,
    });
    await notification.populate("recipient").execPopulate();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// GET /notifications/:id
router.get("/notifications/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id).populate("recipient");
    if (!notification) {
      res.status(404).json({ error: "Notification not found" });
    } else {
      res.json(notification);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve notification" });
  }
});

// PUT /notifications/:id
router.put("/notifications/:id", async (req, res) => {
  const { id } = req.params;
  const { title, message, recipient } = req.body;

  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { title, message, recipient },
      { new: true }
    ).populate("recipient");
    if (!notification) {
      res.status(404).json({ error: "Notification not found" });
    } else {
      res.json(notification);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification" });
  }
});

// DELETE /notifications/:id
router.delete("/notifications/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndDelete(id);
    if (!notification) {
      res.status(404).json({ error: "Notification not found" });
    } else {
      res.json({ message: "Notification deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

module.exports = router;
