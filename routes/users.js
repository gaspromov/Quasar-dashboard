// Dependencies
const { Router } = require('express')

// Middleware
const authUser = require('../middleware/auth.user.middleware')

// Models
const User = require('../models/User')
const License = require('../models/License')
const Drop = require('../models/Drop')
const Notification = require('../models/Notification')

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
		if (user.license && license.user) {
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
			return res.status(200).json({ message: 'Ключ не найден' })
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
		const { password } = req.body
		const drop = await Drop.findOne({ password })

		if (drop) {
			if (!drop.participants.includes(req.user.id)) {
				if (drop.date < new Date()) {
					if (drop.participants.length < drop.quantity) {
						drop.participants.push(req.user.id)
						await drop.save()
						return res.status(200).json({ message: 'Вы добавлены к drop' })
					} else {
						return res.status(200).json({ message: 'Нет мест' })
					}
				} else {
					return res.status(200).json({ message: 'Еще рано' })
				}
			} else {
				return res.status(200).json({ message: 'Вы уже в drop' })
			}
		} else {
			return res.status(200).json({ message: 'Неверный пароль' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
