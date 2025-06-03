const { validationResult } = require("express-validator");
const Captain = require("../models/captain-model");
const BlacklistTokenModel = require("../models/blacklist-token-model");
const hashPassword = require("../utils/HashPassword");
const comparePassword = require("../utils/ComparePassword");
const generateAuthToken = require("../utils/GenerateAuthToken");

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errros: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
    if (!fullname.first || !email || !password || !vehicle) {
        throw new Error("All fields are required");
    }

    const isCaptainAlreadyExist = await Captain.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(409).json({ error: "This email is already exist" });
    }

    try {
        const hashedPassword = await hashPassword(password);

        const captain = await Captain.create({
            fullname: {
                first: fullname.first,
                last: fullname.last,
            },
            email,
            password: hashedPassword,
            vehicle: {
                vehicleNumber: vehicle.vehicleNumber,
                vehicleType: vehicle.vehicleType,
                vehicleCapacity: vehicle.vehicleCapacity,
                color: vehicle.color,
            },
        });

        if (captain) {
            const token = generateAuthToken(captain);
            if (token) {
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                });
                res.status(201).json({
                    message: "captain registered successfully",
                    data: captain,
                    token,
                });
            }
        }
    } catch (err) {
        console.log("register captain ::", err.message);
        res.status(400).json({ error: "All fields are required" });
    }
};

module.exports.loginCaptain = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errros: errors.array() });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        throw new Error("All fields are required");
    }

    try {
        const captain = await Captain.findOne({ email });

        const isMatched = await comparePassword(password, captain.password);
        if (isMatched) {
            const token = generateAuthToken(captain);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
            });
            
            res.status(200).json({
                message: "captain logged in successfully",
                data: captain,
                token,
            });
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (err) {
        console.log("login captain ::", err.message);
        res.status(401).json({ error: "Invalid email or password" });
    }
};

module.exports.logoutCaptain = async (req, res) => {
    const token =
        req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "unauthorized" });

    try {
        await BlacklistTokenModel.create({ token });
        res.clearCookie("token").json({ success: "logged out successfully" });
    } catch (error) {
        console.log("logoutUser ::", error.message);
        res.status(401).json({ error: "unauthorized" });
    }
};

module.exports.getCaptainProfile = async (req, res) => {
    const captain = req.captain;
    res.send(captain);
};
