// In controllers/userController.js
const User = require("../models/User");

// Fetch managers
exports.getManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: "manager" }).select("_id name email");
    res.status(200).json(managers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch managers" });
  }
};
// Fetch managers
exports.getEmployee = async (req, res) => {
  try {
    const users = await User.find({ role: "employee" }).select("_id name email");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
