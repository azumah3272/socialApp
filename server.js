const express = require("express");
const dotenv = require( "dotenv");
const cookieParser = require( "cookie-parser");
const connectDB = require( "./config/db.js");
const authRoutes = require( "./routes/authRoutes.js");
const profileRoutes = require("./routes/profileRoutes.js")

dotenv.config();
connectDB();

const app = express();

//EJS SETUP
app.set("view engine", "ejs");

//MIDDLEWARES
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

//ROUTES
app.use("/", authRoutes);
app.use("/profile", profileRoutes);

app.listen(process.env.PORT, () => 
console.log(`✅ Server running on port ${process.env.PORT}`)
);