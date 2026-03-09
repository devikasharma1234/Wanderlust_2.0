const express = require("express");
const router = express.Router(); 
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userConstroller = require("../controllers/users.js");

router.get("/signup", userConstroller.renderSignupFrom);

router.post("/signup", wrapAsync(userConstroller.signup));

router.get("/login", userConstroller.renderLoginForm);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }),
    userConstroller.login
);

router.get("/logout", userConstroller.logout);

module.exports = router;