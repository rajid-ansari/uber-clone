const bcrypt = require("bcrypt")

module.exports = async function (password, hashedPassword) {
	return await bcrypt.compare(password, hashedPassword);
}