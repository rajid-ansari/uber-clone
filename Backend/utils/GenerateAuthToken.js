const jwt = require("jsonwebtoken");

module.exports = function (user) {
	const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
	return token;
}