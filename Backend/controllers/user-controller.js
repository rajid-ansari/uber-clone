const BlacklistToken = require("../models/blacklist-token-model");
const User = require("../models/user-model");
const hashPassword = require("../utils/HashPassword");
const comparePassword = require("../utils/ComparePassword");
const generateAuthToken = require("../utils/GenerateAuthToken");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname.first || !email || !password) {
        throw new Error("All fields are required.");
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const isAlreadyExist = await User.findOne({ email });
    if (isAlreadyExist)
        return res
            .status(409)
            .json({ error: "This email is already registered." });

    // console.log("userInfo", fullname, email, password);
    const hashedPassword = await hashPassword(password);
    // console.log("hashed -", hashedPassword);
    try {
        const user = await User.create({
            fullname: {
                first: fullname.first,
                last: fullname.last,
            },
            email,
            password: hashedPassword,
        });

        // generating jwt token
        const token = generateAuthToken(user);
        res.cookie("token", token);
        res.status(201).json({ success: "user registered successfully" });
    } catch (err) {
        console.log("register user ::", err.message);
        res.status(400).json({ error: "user registeration failed" });
    }
};

module.exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("Both fields are required");
    }

    try {
        const user = await User.findOne({ email });

        if (user) {
            const isMatched = await comparePassword(password, user.password);
            if (isMatched) {
                const token = generateAuthToken(user);
                if (token) {
                    res.cookie("token", token);
                    res.status(200).json({ success: "logged in successfully" });
                }
            }
        } else {
            res.status(501).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        console.log("login user ::", err.message);
        res.status(501).json({ error: "Invalid email or password" });
    }
};

module.exports.logoutUser = async (req, res) => {
    const token =
        req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "unauthorized" });

    try {
        const blacklistedToken = await BlacklistToken.create({ token });
        res.clearCookie("token").json({ success: "logged out successfully" });
    } catch (error) {
        console.log("logoutUser ::", error.message);
        res.status(401).json({ error: "unauthorized" });
    }
};

module.exports.userProfile = (req, res) => {
    const user = req.user;
    res.send(user);
};
