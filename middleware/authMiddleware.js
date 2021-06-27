const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check jwt exists and is verifies
  if (token) {
    jwt.verify(token, "sauravbhisesecret", (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  }

  res.redirect("/login");
};

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "sauravbhisesecret", async (error, decodedToken) => {
      if (error) {
        console.log(error.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
