const express = require("express");
const router = express.Router();
const Subscription = require("../models/subSchema");

// POST /subscriptions
router.post("/subscriptions", async (req, res) => {
  const { user, plan, endDate } = req.body;

  try {
    const subscription = await Subscription.create({
      user,
      plan,
      endDate,
    });
    res.status(201).json(subscription);
  } catch (err) {
    res.status(500).json({ error: "Failed to create subscription" });
  }
});

// GET /subscriptions/:id
router.get("/subscriptions/:id", async (req, res) => {
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
});

// PUT /subscriptions/:id
router.put("/subscriptions/:id", async (req, res) => {
  const { id } = req.params;
  const { plan, endDate } = req.body;

  try {
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { plan, endDate },
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
});

// DELETE /subscriptions/:id
router.delete("/subscriptions/:id", async (req, res) => {
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
});

module.exports = router;
