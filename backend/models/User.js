const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  phoneNumber: { type: String },
  bio: { type: String },
  preferences: {
    notifications: { type: Boolean, default: true },
    newsletter: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
