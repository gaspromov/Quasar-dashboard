const { Router } = require('express')

const router = Router()

const auth = require('../middleware/auth.admin.middleware')
const DiscordUser = require('../models/DiscordUser')
const License = require('../models/License')

router.get('/users', auth, async (req, res) => {})

router.post('/license', auth, async (req, res) => {
	try {
		let { key, status, expiresIn } = req.body
		if (status === 'lifetime') {
			expiresIn = null
		}
		const license = new License({
			key,
			status,
			expiresIn,
		})
		await license.save()
		return res.status(201).json({ message: `Ключ ${key} успешно создан` })
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})
module.exports = router
