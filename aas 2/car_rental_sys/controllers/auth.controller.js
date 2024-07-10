const router = require("express").Router();
const authServices = require("../services/auth.service");

router.post("/signin", authServices.signin);
router.post("/signup", authServices.signup);

module.exports = {
  authController: router,
};
