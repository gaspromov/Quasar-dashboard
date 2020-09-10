const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const refresh = require('passport-oauth2-refresh')

const router = Router()

const auth = require('../middleware/auth.admin.middleware')
const Admin = require('../models/Admin')
const User = require('../models/User')

// User

// Переход на авторизацию
router.get('/discord', passport.authenticate('discord'))

// Callback после авторизации
router.get(
	'/discord/redirect',
	passport.authenticate('discord'),
	async (req, res) => {
		const lastDate = new Date()
		lastDate.setDate(lastDate.getDate() - 3)

		const user = await User.findById(req.user.id).populate('license')
		if (
			user.license &&
			(user.license.expiresIn >= lastDate || user.license.status === 'lifetime')
		) {
			res.cookie('userType', 'member', { httpOnly: false })
			return res.redirect('/dashboard')
		} else {
			return res.redirect('/license')
		}
	},
)

router.get('/discord/logout', (req, res) => {
	if (req.user) {
		req.logout()
		res.status(200).json()
	} else {
		res.status(400).json()
	}
})

// Admin
router.post('/login', async (req, res) => {
	try {
		const { login, password } = req.body
		const candidate = await Admin.findOne({ login }).select('password')
		if (candidate && (await bcrypt.compare(password, candidate.password))) {
			const accessToken = jwt.sign(
				{ userId: candidate.id },
				process.env.JWT_SECRET,
				{
					expiresIn: '1d',
				},
			)
			return res.status(200).json({ accessToken })
		} else {
			return res.status(400).json({ message: 'Неверные данные' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/password', auth, async (req, res) => {
	try {
		const { password } = req.body
		const candidate = await Admin.findById(req.user.userId)
		candidate.password = await bcrypt.hash(password, parseInt(process.env.SALT))
		await candidate.save()
		return res.status(200).json({ message: 'Пароль изменен' })
	} catch (e) {
		console.log(e)
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
