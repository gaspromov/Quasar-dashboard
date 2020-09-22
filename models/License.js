const { Schema, model, Types } = require('mongoose')

const schema = new Schema(
	{
		key: {
			type: String,
			required: true,
			unique: true,
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
		expiresIn: {
			type: Date,
			required: function () {
				return this.status === 'renewal' || this.status === 'expired'
			},
		},
		user: {
			type: Types.ObjectId,
			ref: 'User',
		},
		paymentId: String,
		card: Object,
	},
	{ versionKey: false },
)

schema.statics.clear = async function () {
	try {
		const licenses = await this.find()
		const promises = licenses.map(license => {
			if (license.expiresIn <= new Date()) {
				license.status = 'expired'
				license.save()
			}
		})
		await Promise.all(promises)
	} catch (e) {
		console.log('Не удалось обновить статусы ключей:', e.message)
	}
}

module.exports = model('License', schema)
