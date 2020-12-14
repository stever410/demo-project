const validate = require("validate.js");

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
      let constraints = {
        email: {
          presence: true,
          email: {
            message: "is invalid",
          },
        },
        name: {
          presence: true,
        },
        password: {
          presence: true,
          length: {
            minimum: 5,
            tooShort: "must be at least 5",
          },
        },
        confirm: {
          presence: true,
          equality: {
            attribute: "password",
            message: "password doesn't match",
          },
        },
      };
      let errors = validate.validate(req.body, constraints);
      if (errors != null) {
        res.render("register", {errors});
      } else {
        res.json(req.body);
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
