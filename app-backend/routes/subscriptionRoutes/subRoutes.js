const express = require("express");
const router = express.Router();
const Subscription = require("../../models/SubscriptionModel/subSchema");
const User = require("../../models/UserModel/userSchema");
const {
  authenticate,
  authorize,
} = require("../../middleware/authenticate_mid");

// GET /subscriptions
router.get("/subs", authorize(["admin", "super admin"]), async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve subscriptions" });
  }
});

//tested with postman
// POST /subscriptions
router.post("/post", authorize(["admin", "super admin"]), async (req, res) => {
  const { username, plan, endMonth } = req.body;

  try {
    const user = await User.findOne({ username: username });

    const subscription = await Subscription.create({
      user,
      plan,
      endMonth,
    });
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ error: "Failed to create subscription" });
  }
});

// GET /subscriptions/:id
router.get(
  "/subs/:id",
  authorize(["admin", "super admin"]),
  async (req, res) => {
    const { id } = req.params;

    try {
      const subscription = await Subscription.findById(id);
      if (!subscription) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        res.json(subscription);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to retrieve subscription" });
    }
  }
);

// PUT /subscriptions/:id
router.put(
  "/subs/:id",
  authorize(["admin", "super admin"]),
  async (req, res) => {
    const { id } = req.params;
    const { plan, endMonth } = req.body;

    try {
      const subscription = await Subscription.findByIdAndUpdate(
        id,
        { plan, endMonth },
        { new: true }
      );
      if (!subscription) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        res.json(subscription);
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to update subscription" });
    }
  }
);

// DELETE /subscriptions/:id
router.delete(
  "/subs/:id",
  authorize(["admin", "super admin"]),
  async (req, res) => {
    const { id } = req.params;

    try {
      const subscription = await Subscription.findByIdAndDelete(id);
      if (!subscription) {
        res.status(404).json({ error: "Subscription not found" });
      } else {
        res.json({ message: "Subscription deleted successfully" });
      }
    } catch (err) {
      res.status(500).json({ error: "Failed to delete subscription" });
    }
  }
);

module.exports = router;
