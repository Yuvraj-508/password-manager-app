const mongoose = require("mongoose");

const passwordEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to User
    ref: "User",
    required: true,
  },
  platform: {
    type: String, // e.g., "Gmail", "Instagram", etc.
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String, // Encrypt this before saving
    required: true,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  }
},{timestamps:true});

const passwordEntry = mongoose.model("PasswordEntry", passwordEntrySchema);
module.exports = passwordEntry; // Export the model
