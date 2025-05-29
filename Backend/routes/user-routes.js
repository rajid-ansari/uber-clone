const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser, logoutUser } = require("../controllers/user-controller")
const { authUser } = require("../middlewares/auth-middleware")


router.get("/", (req, res) => {
	res.send("user route");
})

router.post("/register", [
	body(`fullname`).isEmpty().withMessage("First Name is required"),
	body(`email`).isEmail().withMessage("Email is invalid"),
	body(`password`).isLength({min: 6}).withMessage("Password must be atleast 6 characters long!"),
],
	registerUser
);

router.post("/login", [
	body(`email`).isEmail().withMessage("Email or Password is invalid"),
	body(`password`).isEmpty().withMessage("Email or Password is invalid"),
], loginUser);

router.get("/logout", authUser, logoutUser)

module.exports = router;