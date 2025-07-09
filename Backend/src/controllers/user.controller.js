// controllers/user.controller.js
const User = require("../models/user.model.js");

const profile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "fullName email bloodType phonenumber role"
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { profile };
