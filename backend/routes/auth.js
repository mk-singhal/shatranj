const express = require("express");
const router = express.Router();
const loginController = require("../controllers/auth/login.controller");
const logoutController = require("../controllers/auth/logout.controller");
const refreshTokenController = require("../controllers/auth/refreshToken.controller");
const registerController = require("../controllers/auth/register.controller");

router.post("/register", registerController.handleNewUser);
router.post("/login", loginController.handleLogin);
router.get("/logout", logoutController.handleLogout);
router.get("/refresh", refreshTokenController.handleRefreshToken);

module.exports = router;
