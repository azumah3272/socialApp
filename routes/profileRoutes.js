const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController.js");
const authMiddleware = require("../middleware/authMiddleware.js"); // Ensures User is logged in
const multer = require("multer");

// Multer Storage
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        if (file.fieldname === "profilePhoto") cb(null, "uploads/profilePics");
        else if (file.fieldname === "coverPhoto") cb(null, "uploads/coverPhotos");
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({storage});

//Routes
router.get("/:id", authMiddleware, profileController.getProfile);

router.post("/update/:id", authMiddleware , 
    upload.fields([
        {name: "profilePhoto", maxCount: 1},
        {name: "coverPhoto", maxCount: 1}
    ]),
    profileController.updateProfile, 
);

module.exports = router;


