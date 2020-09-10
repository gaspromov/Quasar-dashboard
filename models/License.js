const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		key: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		status: {
			type: String,
			required: true,
			enum: ['lifetime', 'renewal', 'expired'],
		},
		expiresIn: Date,
	},
	{ versionKey: false },
)

module.exports = model('License', schema)
