const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
		unique: true,
	},
	
	expiresAt: {
		type: Date,
		default: function() {
			return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
		}
	}
});

module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);