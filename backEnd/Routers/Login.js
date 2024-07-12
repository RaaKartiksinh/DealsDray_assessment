// const express = require("express");
// const passport = require("passport");
// const loginController = require("../Controller/Login");
// const loginRouter = express.Router();

// loginRouter
//   .post("/signup", loginController.createUser)
//   .post(
//     "/login",
//     passport.authenticate("local", { failureRedirect: "/login" }),
//     loginController.loginUser
//   );

// module.exports = loginRouter;

const express = require("express");
const passport = require("passport");
const loginController = require("../Controller/Login");
const loginRouter = express.Router();

loginRouter
  .post("/signup", loginController.createUser)
  .post("/login", passport.authenticate("local"), loginController.loginUser)
  .get("/checkAuth", loginController.checkAuth);

module.exports = loginRouter;
