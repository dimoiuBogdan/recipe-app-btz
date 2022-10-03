const HttpError = require("../models/httpError");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // Authorization : "Bearer TOKEN..."

    if (!token) {
      return next(new HttpError("Authentication failed!"), 401);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_STRING);

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (error) {
    console.log(error);

    return next(new HttpError("Authentication failed!"), 401);
  }
};
