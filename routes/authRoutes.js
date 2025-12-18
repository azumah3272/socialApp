const express = require ("express");
const {
    showRegister,
    showLogin,
    registerUser,
    loginUser,
    logoutUser
} = require ("../controllers/authController.js");
const  authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.get("/", showLogin);
router.get("/register", showRegister);
router.get("/login", showLogin);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/home", authMiddleware, (req,res) => {
    res.render("home", {userId: req.userId});
});
router.get("/logout", logoutUser);

module.exports =  router;