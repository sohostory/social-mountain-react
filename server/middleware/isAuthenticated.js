require("dotenv").config(); // able to use the .env file
const jwt = require("jsonwebtoken");
const { SECRET } = process.env;

module.exports = {
  // this middleware verifies the logged in users token to make sure they are valid for any request
  isAuthenticated: (req, res, next) => {
    const headerToken = req.get("Authorization");

    // if the token is missing it will send 401 response
    if (!headerToken) {
      console.log("ERROR IN auth middleware");
      res.sendStatus(401);
    }

    let token;

    // this will verify the token against the secret key we have

    try {
      token = jwt.verify(headerToken, SECRET);
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }

    if (!token) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }

    // if everything passes, it'll move to the request
    next();
  },
};
