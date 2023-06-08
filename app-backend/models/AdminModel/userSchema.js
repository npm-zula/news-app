const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["author", "normal", "admin", "superadmin"],
      required: true,
    },
  },
  { timestamps: true }
  );

// const User = mongoose.model("User", userSchema);
module.exports = mongoose.models.User || mongoose.model('User', userSchema)
// module.exports = User;
