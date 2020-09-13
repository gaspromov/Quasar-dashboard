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
		participants: [
			{
				type: Types.ObjectId,
				ref: 'User',
			},
		],
	},
	{ versionKey: false },
)

// schema.pre('', function (next, docs) {
//   console.log('12312313', docs)
// })

module.exports = model('Drop', schema)
