const  User = require ("../models/User.js");
const  bcrypt = require ("bcryptjs");
const  jwt = require ("jsonwebtoken");

const showRegister = (req,res) => {
    res.render("register");
};
const showLogin = (req,res) => {
    res.render("login");
};
const registerUser = async (req,res) => {
    try {
        const {username,email,password, confirmPassword} = req.body;

        
        if (!username || !email || !password || !confirmPassword) {
            return res.send("All fields are required");
        }

        if (password !== confirmPassword) {
            return res.send("Passwords do not match");
        }


        const exists = await User.findOne({email});
        if (exists) return res.send("Email already exists");

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({name: username,email,password: hashedPassword});
        res.redirect("/login");
    }   catch (error) {
        res.send(error.message);
    }
};

const loginUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.send("User not found");

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.send("Incorrect Password");


        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie("token", token, {httpOnly: true});
        res.redirect("/home");
    }   catch (error) {
        res.send(error.message);
    }
};

const logoutUser = (req,res) => {
    res.clearCookie("token");
    res.redirect("/login");
};

module.exports = {
    showRegister,
    showLogin,
    registerUser,
    loginUser,
    logoutUser,
};