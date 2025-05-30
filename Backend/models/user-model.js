const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
	fullname: {
		first: {
			type: String,
			required: true,
			trim: true,
			minlength: [3, "first name doesn't meet minimum length."],
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
		lowercase: true,
		match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
	},
	password: {
		type: String,
		required: true,
		minlength: [6, "Password must be atleast 6 characters long."],
	},

	socketId: {
		type: String,
	}
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
module.exports = User;