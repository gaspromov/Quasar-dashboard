const { Router } = require('express')
const { validationResult } = require('express-validator')

const router = Router()

const authAdmin = require('../middleware/auth.admin.middleware')
const Drop = require('../models/Drop')

const { dropsValidators } = require('../utils/validators')

router.post('/', authAdmin, dropsValidators, async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ message: errors.array()[0].msg })
		const { password, date, quantity } = req.body
		const drop = new Drop({
			password,
			date,
			quantity,
		})
		await drop.save()
		return res.status(201).json({ message: 'Drop создан' })
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
