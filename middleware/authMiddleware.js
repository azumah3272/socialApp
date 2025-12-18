// Makes sure User is logged in before accessing home page
const jwt = require ("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect("/login");
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }   catch (error) {
        return res.redirect("/login");
    }
};

module.exports = authMiddleware;