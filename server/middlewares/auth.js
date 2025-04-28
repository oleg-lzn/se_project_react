const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const serverStatuses = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(serverStatuses.unauthorized)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(serverStatuses.unauthorized)
      .send({ message: "Invalid or expired token" });
  }

  req.user = payload;
  return next();
};
