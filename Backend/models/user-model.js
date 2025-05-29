const mongoose = require("mongoose");


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
		// select: false,
	}
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;