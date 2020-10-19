const { Router } = require('express')
const axios = require('axios')
const authUser = require('../middleware/auth.user.middleware')

const router = Router()

const { payment, getPayments } = require('../utils/payment')

const License = require('../models/License')
const User = require('../models/User')
const Drop = require('../models/Drop')
const Notification = require('../models/Notification')
const authAdmin = require('../middleware/auth.admin.middleware')
const { v4 } = require('uuid')

let queue = 0

router.post('/', authUser, async (req, res) => {
	try {
		const { dropId, key } = req.body

		const user = await User.findById(req.user.id)
		const drop = await Drop.findOne({ _id: dropId, status: 'active' })
		queue = drop.idempotences.length <= queue ? 0 : queue
		const idempotence =
			drop.idempotences[queue].status === 'active'
				? drop.idempotences[queue]
				: drop.idempotences.find(i => i.status === 'active')

		if (user && !user.license && drop && idempotence) {
			drop.idempotences = drop.idempotences.filter(
				i => i.key !== idempotence.key,
			)
			if (drop.idempotences.length === 0) {
				queue = 0
				drop.status = 'finished'
			}
			await drop.save()
			queue++
			const { confirmation } = await payment(
				2000,
				`Ключ для ${user.fullName} ${user.email}`,
				{
					dropId,
					key,
					userId: req.user.id,
					idempotence: idempotence.key,
					type: 'buy',
					username: user.fullName,
					email: user.email,
				},
				idempotence.key,
			)
			return res
				.status(200)
				.json({ confirmationToken: confirmation.confirmation_token })
		} else {
			return res
				.status(400)
				.json({ message: 'У вас нет возможности купить ключ' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/webhook', async (req, res) => {
	try {
		const nextMonth = new Date()
		nextMonth.setMonth(nextMonth.getMonth() + 1)
		const { object } = req.body
		const { payment_method, metadata, status } = object
		if (status === 'succeeded' && metadata.type === 'buy') {
			const license = new License({
				key: metadata.key,
				status: 'renewal',
				expiresIn: nextMonth,
				user: metadata.userId,
				paymentId: payment_method.id,
				card: payment_method.card,
				subscribe: true,
			})
			await license.save()

			const user = await User.findById(metadata.userId)
			user.license = license._id
			await user.save()

			const notification = new Notification({
				user: user.fullName,
				license: license.key,
				type: 'Bind',
			})
      await notification.save()
      
			res.status(200).json()

			const config = {
				method: 'put',
				url: `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${user.discordId}`,
				headers: {
					Authorization: `Bot ${process.env.BOT_TOKEN}`,
				},
				data: {
					access_token: user.accessToken,
				},
			}
			await axios(config)
		} else if (status === 'succeeded' && metadata.type === 'change-card') {
			const user = await User.findById(metadata.userId)
			const license = await License.findById(metadata.licenseId)

			user.license = license._id

			license.user = metadata.userId
			license.paymentId = payment_method.id
			license.card = payment_method.card
			license.subscribe = true

			await license.save()
			await user.save()

			return res.status(200).json()
		} else if (status === 'succeeded' && metadata.type === 'subscribe') {
			const nextDate = new Date()
			nextDate.setMonth(nextDate.getMonth() + 1)
			const license = await License.findById(metadata.licenseId)
			const user = await User.findOne({ discordId: metadata.discordId })
			if (license && user) {
				license.expiresIn = nextDate
				await license.save()
				const getDMId = {
					method: 'post',
					url: 'https://discord.com/api/users/@me/channels',
					headers: {
						Authorization: `Bot ${process.env.BOT_TOKEN}`,
					},
					data: {
						recipient_id: user.discordId,
					},
				}
				const { data } = await axios(getDMId)
				const message = {
					method: 'post',
					url: `https://discord.com/api/channels/${data.id}/messages`,
					headers: {
						Authorization: `Bot ${process.env.BOT_TOKEN}`,
					},
					data: {
						content: `Ваш ключ ${
							license.key
						} продлен успешно до ${nextDate.getDate()}/${nextDate.getMonth()}/${nextDate.getFullYear()}}`,
					},
				}
				await axios(message)
				return res.status(200).json()
			}
		} else if (status === 'canceled' && metadata.type === 'buy') {
			const drop = await Drop.findById(metadata.dropId)
			drop.idempotences = drop.idempotences.filter(i => i.key !== metadata.key)
			drop.idempotences.push({
				key: v4(),
				status: 'active',
			})
			await drop.save()
			return res.status(200).json()
		} else if (status === 'canceled' && metadata.type === 'subscribe') {
			const license = await License.findById(metadata.licenseId)
			const user = await User.findOne({ discordId: metadata.discordId })
			const payDate = new Date()
			payDate.setDate(payDate.getDate() + 1)
			if (license && user) {
				const getDMId = {
					method: 'post',
					url: 'https://discord.com/api/users/@me/channels',
					headers: {
						Authorization: `Bot ${process.env.BOT_TOKEN}`,
					},
					data: {
						recipient_id: user.discordId,
					},
				}
				const { data } = await axios(getDMId)
				const message = {
					method: 'post',
					url: `https://discord.com/api/channels/${data.id}/messages`,
					headers: {
						Authorization: `Bot ${process.env.BOT_TOKEN}`,
					},
					data: {
						content: `Ошибка оплаты ключа ${
							license.key
						} следующая оплата 17:00 ${payDate.getDate()}/${payDate.getMonth()}/${payDate.getFullYear()}`,
					},
				}
				await axios(message)
				return res.status(200).json()
			}
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.get('/', authAdmin, async (req, res) => {
	try {
		const { data } = await getPayments()
		return res.status(200).json(data)
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
