const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // (store hashed in real app)
});

module.exports = mongoose.model("User", userSchema);
