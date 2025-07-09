const jwt = require("jsonwebtoken");

const generatejwt = async (userid) => {
  const token = await jwt.sign(
    { userid },
    process.env.JWT_TOKEN_SECERT,
    { expiresIn: process.env.JWT_TOKEN_EXPIRY }
  );
  return token;
};

module.exports = generatejwt;
