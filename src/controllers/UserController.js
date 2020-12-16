const { validationResult } = require("express-validator");
const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcrypt");
class UserController {
  showLogin(req, res, next) {
    try {
      res.render("login");
    } catch (err) {
      console.log(err);
    }
  }

  showRegister(req, res, next) {
    try {
      res.render("register");
    } catch (err) {
      next(err);
    }
  }

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
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
      })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
