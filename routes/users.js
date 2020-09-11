// Dependencies
const { Router } = require('express')

// Middleware
const authUser = require('../middleware/auth.user.middleware')

// Models
const User = require('../models/User')
const License = require('../models/License')

// Variables
const router = Router()

// GET /api/v1/users/@me
router.get('/@me', authUser, async (req, res) => {
	try {
		await License.clear()
		if (req.user) {
			return res.status(200).json(req.user)
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
			user.license = license.id
			license.user = user.id
			await user.save()
			await license.save()
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

module.exports = router