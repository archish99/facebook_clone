const jwt = require("jsonwebtoken");

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader) throw new Error("User is not logged in");

  // The authorization header is of the form 'Bearer "token"'
  const token = authHeader.split(" ")[1];

  if (!token) throw new Error("Authentication token must be provided");

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    throw new Error("Invalid/Expired token");
  }
};
