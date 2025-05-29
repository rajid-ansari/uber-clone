const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10);
}


module.exports.comparePassword = async function (password, hashedPassword) {
	return await bcrypt.compare(password, hashedPassword);
}


module.exports.generateAuthToken = function (user) {
	const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
	return token;
}
