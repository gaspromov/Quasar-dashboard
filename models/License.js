const { Schema, model, Types } = require('mongoose')
const { subscribe } = require('../utils/payment')

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
		subscribe: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false },
)

schema.statics.clear = async function () {
	try {
		const date = new Date()
		date.setDate(date.getDate() - 3)
		const licenses = await this.find()
		const promises = licenses.map(license => {
			if (license.expiresIn <= date) {
				license.status = 'expired'
				license.save()
			}
		})
		await Promise.all(promises)
	} catch (e) {
		console.log('Не удалось обновить статусы ключей:', e.message)
	}
}

schema.statics.subscribePayment = function () {
	setInterval(async () => {
    try {
      await this.clear()
			const prevDate = new Date()
			prevDate.setDate(prevDate.getDate() - 1)
			const licenses = await this.find({ status: 'renewal' }).populate('user')
			const promises = licenses.map(license => {
				if (license.expiresIn <= prevDate && license.paymentId) {
					subscribe(license.paymentId, 2000, `Продление ключа ${license.key}`, {
						type: 'subscribe',
						licenseId: license._id,
						username: license.user.fullName,
						key: license.key,
					})
					console.log(`Продление ключа ${license.key}`)
				}
			})
			await Promise.all(promises)
			console.log('Автоплатежи сделаны')
		} catch (e) {
			console.log('Не удалось произвести автоплатеж:', e.message)
		}
	}, 10000)
}
// 60 * 1000 * 60 * 24
module.exports = model('License', schema)
