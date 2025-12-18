// Creates a user in database
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},

    // Profile Fields
    username: {type: String, default: "New User"},
    bio: {type: String, dafault: ""},
    profilePhoto: {type: String, dafault: "/uploads/profilePics/default.png"},
    coverPhoto: {type: String, default: "/uploads/coverPhotos/default.jpg"},
    dateJoined: {type: String, default: Date.now }
});

module.exports =  mongoose.model("User", userSchema);