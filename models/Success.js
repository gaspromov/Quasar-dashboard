const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		date: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
)

module.exports = model('Success', schema)