const { Router } = require('express')

const router = Router()

const authAdmin = require('../middleware/auth.admin.middleware')
const User = require('../models/User')
const License = require('../models/License')

router.get('/license', authAdmin, async (req, res) => {
	try {
		const licenses = await License.find()
		return res.status(200).json(licenses)
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/license', authAdmin, async (req, res) => {
  try {
    let { key, status, expiresIn } = req.body
    expiresIn = new Date(expiresIn) 
    expiresIn = status === 'lifetime' ? undefined : expiresIn
		if (expiresIn >= new Date() || status === 'lifetime') {
			const license = new License({
				key,
				status,
				expiresIn,
			})
			await license.save()
			return res.status(201).json({ message: `Ключ ${key} успешно создан` })
		} else {
			return res
				.status(400)
				.json({ message: 'Дата окончания не может быть в прошлом' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
