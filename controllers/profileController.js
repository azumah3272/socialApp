const User = require("../models/User.js")


    // View Profile Page
    const getProfile = async (req,res) => {
        try {
            const user = await User.findById(req.params.id);
            res.render("profile", {user});
        } catch (error) {
            res.status(500).send("Error loading profile");
        }
    };
    

    // UPDATE PROFILE PAGE
    const updateProfile = async (req,res) => {
        try {
            console.log("BODY:", req.body);
            console.log("FILES:", req.files);
            
            const user = await User.findById(req.params.id);

            // Update text fields
            if (req.body && req.body.username) {user.username = req.body.username;}
            if (req.body && req.body.bio) {user.bio = req.body.bio;}

            //  Update Image fields
            if (req.files && req.files.profilePhoto) {
                user.profilePhoto = "/uploads/profilePics/" + req.files.profilePhoto[0].filename;
            }
            if (req.files && req.files.coverPhoto) {
                user.coverPhoto = "/uploads/coverPhotos/" + req.files.coverPhoto[0].filename;
            }

            await user.save();
            res.redirect(`/profile/$ {user._id}`);
        }   catch (error) {
            console.log("PROFILE UPDATE ERROR:", error);
            res.status(500).send("Could not update profile");
        }
    };

module.exports = {getProfile, updateProfile};