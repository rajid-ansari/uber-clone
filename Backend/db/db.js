const mongoose = require("mongoose");

async function connectDB() {
	await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
	.then(() => {
		console.log("DB Connected.");
	})
	.catch((err) => {
		console.log(`DB :: ${err.message}`);
	})
}

module.exports = connectDB;