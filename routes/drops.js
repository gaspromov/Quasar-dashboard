const { Router } = require('express')
const { validationResult } = require('express-validator')

const router = Router()
const { v4: uuidv4 } = require('uuid')

const authAdmin = require('../middleware/auth.admin.middleware')
const authUser = require('../middleware/auth.user.middleware')
const Drop = require('../models/Drop')

const { dropsValidators } = require('../utils/validators')

router.post('/', authAdmin, dropsValidators, async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ message: errors.array()[0].msg })
		const { password, date, quantity } = req.body
		const idempotences = []
		for (let i = 0; i < quantity; i++) {
			idempotences.push({ key: uuidv4(), status: 'active' })
		}
		const drop = new Drop({
			password,
			date,
			quantity,
			status: 'active',
			idempotences,
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

router.get('/:password', authUser, async (req, res) => {
	try {
		if (req.user.license) {
			return res.status(400).json({ message: 'У вас уже есть подписка' })
		}
		const drop = await Drop.findOne({
			password: req.params.password,
			status: 'active',
			date: { $lt: Date.now() },
		})
		if (drop) {
			return res.status(200).json(drop._id)
		} else {
			return res.status(404).json({ message: 'Drop не найден' })
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
		const drops = await Drop.find()
		return res.status(200).json(drops)
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
