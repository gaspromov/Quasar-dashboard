const { Schema, model, Types } = require('mongoose')

const schema = new Schema(
	{
		password: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			required: true,
			enum: ['active', 'finished'],
		},
		idempotences: [
			{
				key: {
					type: String,
					required: true,
				},
				status: {
					type: String,
					enum: ['active', 'finished'],
					required: true,
				},
			},
		],
	},
	{ versionKey: false },
)

module.exports = model('Drop', schema)
