const express = require("express");
const router = express.Router();
const Notification = require("../../models/NotificationModel/notificationSchema");
const User = require("../../models/UserModel/userSchema");

const {
  authenticate,
  authorize,
} = require("../../middleware/authenticate_mid");

// tested with postman
// GET /notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find().populate("recipient");
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve notifications" });
  }
});

// tested with postman
// POST /notifications
router.post("/post", async (req, res) => {
  const { title, message, username } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "Recipient not found" });
    }

    const notification = await Notification.create({
      title,
      message,
      recipient: user,
    });

    // console.log(user._id.);

    // await notification.populate("recipient").execPopulate();

    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// tested with postman
// GET /notifications/:id
// router.get("/:id", async (req, res) => {
//   const id = req.params;

//   try {
//     const notification = await Notification.findById(id).populate("recipient");
//     if (!notification) {
//       res.status(404).json({ error: "Notification not found" });
//     } else {
//       res.json(notification);
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Failed to retrieve notification" });
//   }
// });

// GET notifications by recipient ID
router.get("/notification/:id", async (req, res) => {
  const recipientId = req.params.id;
  try {
    const notifications = await Notification.find({ recipient: recipientId });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve notifications" });
  }
});

// tested with postman
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
