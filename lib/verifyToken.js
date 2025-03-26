const jwt = require("jsonwebtoken");

export const verifyAndDecodeToken = (token) => {
  try {
    console.log("token", token);
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
