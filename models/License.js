const { Schema, model, Types } = require('mongoose')
const { subscribe } = require('../utils/payment')
const User = require('./User')

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
		const now = new Date()
		if (now.getHours() === 17 && now.getMinutes() === 0) {
			try {
				await this.clear()
				const date = new Date()
				const licenses = await this.find({ status: 'renewal' }).populate('user')
				const promises = licenses.map(async license => {
					if (license.expiresIn <= date && license.paymentId) {
						await subscribe(
							license.paymentId,
							2000,
							`Продление ключа ${license.key}`,
							{
								type: 'subscribe',
								licenseId: license._id,
								username: license.user.fullName,
								discordId: license.user.discordId,
								key: license.key,
								email: license.user.email,
							},
						)

						console.log(
							`Продление ключа ${
								license.key
							} ${date.getHours()}.${date.getMinutes()} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
						)
					}
				})
				await Promise.all(promises)
				console.log(
					`Автоплатежи сделаны ${date.getHours()}.${date.getMinutes()} ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
				)
			} catch (e) {
				console.log('Не удалось произвести автоплатеж:', e.message)
			}
		}
	}, 30000)
}

module.exports = model('License', schema)
