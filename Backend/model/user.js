const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    lastName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
