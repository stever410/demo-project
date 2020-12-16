const { check } = require("express-validator");
const User = require("../models/User");

class CustomValidator {
  validateRegisterUser() {
    return [
      check("email", "Invalid email")
        .isEmail()
        .normalizeEmail()
        .custom(async (email) => {
          try {
            let user = await User.findOne({ email });
            if(user)
              return Promise.reject("Email has already been registered");
          } catch (err) {
            console.log(err);
          }
        }),
      check("name", "Name can't be empty").not().isEmpty(),
      check(
        "password",
        "Password length must be at least 6 characters"
      ).isLength({ min: 6 }),
      check("confirm").custom((confirmPassword, { req }) => {
        const password = req.body.password;
        if (password !== confirmPassword) {
          throw new Error("Passwords must be the same");
        } else {
          return true;
        }
      }),
    ];
  }
}

module.exports = new CustomValidator();
