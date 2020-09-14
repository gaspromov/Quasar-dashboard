const { Schema, model, Types } = require('mongoose')

const schema = new Schema(
	{
		user: {
			type: String,
			required: true,
		},
		license: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			default: Date.now,
			required: true,
		},
		type: {
			type: String,
			enum: ['Bind', 'Unbind', 'Expired'],
			required: true,
		},
	},
	{ versionKey: false },
)

module.exports = model('Notification', schema)
