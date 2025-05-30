const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const BlacklistTokenModel = require("../models/blacklist-token-model");
const Captain = require("../models/captain-model");

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorizaed" });

    const isBlackListed = await BlacklistTokenModel.findOne({ token });

    if (isBlackListed)
        return res.status(401).json({ message: "Invalid token" });

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const user = await User.findOne({ email: decoded.email }).select("-password");
            req.user = user;
            next();
        }
    } catch (err) {
        console.log("authUser ::", err.message);
        res.status(401).json({ message: "Unauthorizaed" });
    }
};


module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorizaed" });

    const isBlackListed = await BlacklistTokenModel.findOne({ token });

    if (isBlackListed)
        return res.status(401).json({ message: "Invalid token" });

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const captain = await Captain.findOne({ email: decoded.email }).select("-password");
            req.captain = captain;
            next();
        }
    } catch (err) {
        console.log("auth captain ::", err.message);
        res.status(401).json({ message: "Unauthorizaed" });
    }
};