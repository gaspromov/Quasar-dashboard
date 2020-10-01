// Dependencies
const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// Variables
const router = Router()

// Middleware
const authAdmin = require('../middleware/auth.admin.middleware')

// Models
const Admin = require('../models/Admin')
const User = require('../models/User')

// ============ USER ============

// GET /api/v1/auth/discord
router.get('/discord', passport.authenticate('discord'))

// GET /api/v1/auth/discord/redirect
router.get(
	'/discord/redirect',
	passport.authenticate('discord', {
		failureRedirect: '/',
	}),
	async (req, res) => {
		const lastDate = new Date()
		lastDate.setDate(lastDate.getDate() - 3)

		const user = await User.findById(req.user.id).populate('license')
		res.setHeader(
			'Content-Security-Policy',
			"default-src * 'self'; script-src * 'self' 'unsafe-inline'; style-src * 'self' 'unsafe-inline'; img-src * 'self' data: https:;",
		)
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

// GET /api/v1/auth/discord/logout
router.get('/discord/logout', (req, res) => {
	if (req.user) {
		req.logout()
		return res.status(200).json()
	} else {
		return res.status(400).json()
	}
})

// ============ ADMIN ============

// POST /api/v1/auth/admin/login
router.post('/admin/login', async (req, res) => {
	try {
		const { login, password } = req.body
		const candidate = await Admin.findOne({ login }).select('password')
		if (candidate) {
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

// POST /api/v1/auth/admin/password
router.post('/admin/password', authAdmin, async (req, res) => {
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
