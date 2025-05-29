const User = require("../models/user-model");
const {
    hashPassword,
    comparePassword,
    generateAuthToken,
} = require("../utils/user-config");

module.exports.registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    if (!fullname.first || !email || !password) {
        throw new Error("All fields are required.");
    }

    const isAlreadyExist = await User.findOne({ email });
    if (isAlreadyExist)
        return res
            .status(501)
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
		res.send("user registered");
        res.cookies("token", token);
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

    console.log("login info -", email, password);

    try {
        const user = await User.findOne({ email });
		console.log("hashed user -", user);

        if (user) {
            const isMatched = await comparePassword(password, user.password);
			console.log("password match -", isMatched);
            if (isMatched) {
                const token = generateAuthToken(user);
                if (token) {
					res.send("user logged in");
                    res.cookies("token", token);
                }
            } else {
                res.status(501).json({ error: "Email or Password is invalid" });
            }
        }
    } catch (err) {
        console.log("login user ::", err.message);
    }
};
