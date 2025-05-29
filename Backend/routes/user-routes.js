const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/user-controller")


router.get("/", (req, res) => {
	res.send("user route");
})

router.post("/register", [
	body(`fullname`).isEmpty().withMessage("First Name is required"),
	body(`email`).isEmail().withMessage("Email is invalid"),
	body(`password`).isEmpty().withMessage("Password is required"),
],
	registerUser
);

router.post("/login", [
	body(`email`).isEmail().withMessage("Email or Password is invalid"),
	body(`password`).isEmpty().withMessage("Email or Password is invalid"),
], loginUser);

module.exports = router;