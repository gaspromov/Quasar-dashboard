// Dependencies
const { Router } = require('express')
const axios = require('axios')

// Middleware
const authUser = require('../middleware/auth.user.middleware')

// Models
const User = require('../models/User')
const License = require('../models/License')
const Drop = require('../models/Drop')
const Notification = require('../models/Notification')

const { payment } = require('../utils/payment')
const { v4 } = require('uuid')

// Variables
const router = Router()

// GET /api/v1/users/@me
router.get('/@me', authUser, async (req, res) => {
	try {
		await License.clear()
		const user = await User.findById(req.user.id)
			.select('-_id -accessToken -refreshToken')
			.populate({
				path: 'license',
				select: '-_id',
				match: {
					status: ['lifetime', 'renewal'],
				},
			})
		if (user) {
			return res.status(200).json(user)
		} else {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

// POST /api/v1/users/license
router.post('/license', authUser, async (req, res) => {
	try {
		await License.clear()
		const { key } = req.body
		const license = await License.findOne({
			key,
			status: ['lifetime', 'renewal'],
			user: null,
		})
		const user = await User.findOne({ _id: req.user.id, license: null })
		if (license && user) {
			const notification = new Notification({
				user: user.fullName,
				license: license.key,
				type: 'Bind',
			})
			user.license = license.id
			license.user = user.id
			await user.save()
			await license.save()
			await notification.save()
			const config = {
				method: 'put',
				url: `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${user.discordId}`,
				headers: {
					Authorization: `Bot ${process.env.BOT_TOKEN}`,
				},
				body: {
					access_token: user.accessToken,
				},
			}
			await axios(config)
			return res.status(200).json({ message: 'Ключ успешно добавлен' })
		} else {
			return res.status(400).json({ message: 'Не удалось добавить ключ' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

// DELETE /api/v1/users/license
router.delete('/license', authUser, async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
		const license = await License.findById(req.user.license)
		if (user.license && license.user && !license.subscribe) {
			const notification = new Notification({
				user: user.fullName,
				license: license.key,
				type: 'Unbind',
			})

			user.license = undefined
			license.user = undefined
			await user.save()
			await license.save()
			await notification.save()
			return res.status(200).json({ message: 'Ключ удален' })
		} else {
			return res
				.status(200)
				.json({ message: 'Невозможно сделать отвязку ключа' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/drop', authUser, async (req, res) => {
	try {
		if (req.user.license) {
			return res.status(400).json({ message: 'У вас уже есть подписка' })
		}
		const { password } = req.body
		const drop = await Drop.findOne({ password, status: 'active' })

		if (drop) {
			if (drop.date < new Date()) {
				await drop.save()
				return res.status(200).json({ message: 'Вы добавлены к drop' })
			} else {
				return res.status(400).json({ message: 'Еще рано' })
			}
		} else {
			return res.status(400).json({ message: 'Неверный пароль' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.patch('/license/:type', authUser, async (req, res) => {
	try {
		const { type } = req.params
		const user = await User.findById(req.user.id)
		const license = await License.findById(user.license)
		if (type === 'subscribe' && user && license) {
			if (license.subscribe) {
				license.card = undefined
				license.paymentId = undefined
				license.subscribe = false
				await license.save()
				return res.status(200).json({ message: 'Изменено' })
			} else {
				const { confirmation } = await payment(
					1,
					`Ключ для ${user.fullName} ${user.email}`,
					{
						licenseId: license._id,
						userId: req.user.id,
						type: 'change-card',
						username: user.fullName,
						key: license.key,
						email: user.email,
					},
					v4(),
				)
				return res
					.status(200)
					.json({ confirmationToken: confirmation.confirmation_token })
			}
		} else if (type === 'card' && user && license) {
			const { confirmation } = await payment(
				1,
				`Ключ для ${user.fullName} ${user.email}`,
				{
					licenseId: license._id,
					userId: req.user.id,
					type: 'change-card',
					username: user.fullName,
					key: license.key,
					email: user.email,
				},
				v4(),
			)
			return res
				.status(200)
				.json({ confirmationToken: confirmation.confirmation_token })
		} else {
			return res.status(400).json({ message: 'Вы не можете изменить данные' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})
module.exports = router
