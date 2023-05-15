const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  plan: {
    type: String,
    enum: ["basic", "advanced", "premium"],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endMonth: {
    type: String,
    required: true,
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
