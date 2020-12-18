const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
class UserController {
  // [POST] /register
  register(req, res, next) {
    try {
      const errors = validationResult(req);
      let user = new User(req.body);
      if (errors.isEmpty()) {
        // init user from req body
        // hash password
        bcrypt.hash(user.password, 10, async (err, hash) => {
          if (err) throw err;
          user.password = hash;
          // Store user in database
          await user.save({ user });
          res.render("login", {
            success_msg: "Register successfully",
          });
        });
      } else {
        res.render("register", {
          email: user.email,
          name: user.name,
          errors: errors.array(),
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // [POST] /login
  login(req, res, next) {
    try {
      passport.authenticate('local', {
        successRedirect: `admin`,
        failureRedirect: '/',
        failureFlash: true
      })(req, res, next);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new UserController();
