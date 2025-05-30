const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require("../controllers/captain-controller");
const { authCaptain } = require("../middlewares/auth-middleware");


router.post("/register", [
	body(`fullname.first`).isLength({min: 3}).withMessage("First Name must be atleasr 3 characters long"),
	body(`email`).isEmail().withMessage("Email is invalid"),
	body(`password`).isLength({min: 6}).withMessage("Password must be atleast 6 characters long!"),
	body(`vehicle.vehicleType`).isIn(["Bike", "Car", "Auto"]).withMessage("Invalid vehicle type"),
	body(`vehicle.vehicleNumber`).isLength({min: 4}).withMessage("vehicle number must be atleast 4 characters long"),
	body(`vehicle.vehicleCapacity`).isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
], registerCaptain);


router.post("/login", [
	body(`email`).isEmail().withMessage("Email is invalid"),
	body(`password`).isLength({min: 6}).withMessage("Password must be atleast 6 characters long!"),
], loginCaptain);

router.get("/profile", authCaptain, getCaptainProfile);

router.get("/logout", authCaptain, logoutCaptain);

module.exports = router;