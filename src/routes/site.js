const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const validator = require("../utils/validator");

router.get("/", (req, res, next) => res.render("login"));
router.get("/admin", (req, res, next) => {
    console.log(req.user);
    res.render('admin', {user: req.user});
});
router.post("/login", userController.login);
router.get("/register", (req, res, next) => res.render("register"));
router.post(
  "/register",
  validator.validateRegisterUser(),
  userController.register
);

module.exports = router;
