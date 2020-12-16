const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const validator = require("../utils/validator");

router.get("/", userController.showLogin);
router.get("/login", userController.login);
router.get("/register", userController.showRegister);
router.post("/register", validator.validateRegisterUser(), userController.register);

module.exports = router;
