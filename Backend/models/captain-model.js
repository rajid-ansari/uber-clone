const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema({
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
	},

	status: {
		type: String,
		enum: ["active", "inactive"],
		default: "inactive"
	},
	vehicle: {
		vehicleType: {
			type: String,
			required: true,
			enum: ["Bike", "Car", "Auto"],
		},
		vehicleNumber: {
			type: String,
			required: true,
		},
		color: {
			type: String,
		},
		vehicleCapacity: {
			type: Number,
			require: true,
			min: [1, "Capacity must be at least 1"],
		},
	},

	location: {
		latitude: {
			type: Number,
		},
		longitude: {
			type: Number,
		}
	}

	
}, { timestamps: true });



const Captain = mongoose.model("Captain", captainSchema);
module.exports = Captain;