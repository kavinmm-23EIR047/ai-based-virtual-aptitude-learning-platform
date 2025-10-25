
const User = require("../models/User");

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password }); // TODO: hash password
    await user.save();

    // Return only the user object
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Signup failed", details: err });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password }); // TODO: verify hash
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    // Return only the user object
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};
