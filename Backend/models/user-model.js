const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
	fullname: {
		first: {
			type: String,
			required: true,
			trim: true,
			minLength: [3, "first name doesn't meet minimum length."],
		},
		last: {
			type: String,
			trim: true,
			minLength: [3, "last name doesn't meet minimum length."],
		}
	},

	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minLength: [6, "Password must be atleast 6 characters long."],
		select: false,
	}
}, { timestamps: true });

// methods

userSchema.methods.hashPassword = async function (password) {
	return await bcrypt.hash(password, 10);
}

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
	return token;
}


userSchema.methods.comparePassword = async function (unhashedPassword) {
	return await bcrypt.compare(unhashedPassword, this.password);
}

const User = mongoose.model("User", userSchema);
module.exports = User;