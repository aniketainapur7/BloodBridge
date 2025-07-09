const jwt = require('jsonwebtoken');
const User = require("../models/user.model.js");

const verifyjwt = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization ;
    // console.log(authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECERT);

    const user = await User.findById(decoded.userid).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;

    next();
  } catch (error) {
    console.log("Error in verifyjwt middleware:", error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyjwt;
