// Dependencies
const { Router } = require('express')
const shortid = require('shortid')
const path = require('path')

// Middleware
const authAdmin = require('../middleware/auth.admin.middleware')

// Models
const Success = require('../models/Success')

// Utils
const { isAvailableFormat } = require('../utils/validators')

// Variables
const router = Router()

// POST /api/v1/successes
router.post('/', authAdmin, async (req, res) => {
	try {
		const { date, description } = req.body
		const { image } = req.files
		const extname = path.extname(image.name).toLowerCase()
		const name = `images/image-${
			new Date().getMonth() + 1
		}-${new Date().getFullYear()}-${shortid.generate() + extname}`
		if (isAvailableFormat(image)) {
			const success = new Success({
				date,
				description,
				image: name,
			})
			await success.save()
			await image.mv(path.resolve(__dirname, '..', 'public', name))
			return res.status(201).json({ message: 'Success создан' })
		} else {
			return res
				.status(400)
				.json({ message: `Разрешение ${extname} не поддерживается` })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

// GET /api/v1/successes
router.get('/', async (req, res) => {
	try {
		const successes = await Success.find().select('-_id')
		return res.status(200).json(successes)
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
