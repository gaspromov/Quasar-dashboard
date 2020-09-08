const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const router = Router()

const auth = require('../middleware/auth.admin.middleware')

router.get('/discord', passport.authenticate('discord'))

router.get(
	'/discord/login',
	passport.authenticate('discord', {
		failureRedirect: '/login',
	}),
	(req, res) => {
		const lastDate = new Date()
		lastDate.setDate(lastDate.getDate() + 3)

		if (req.user.license && req.user.licenseExp >= lastDate) {
			return res.redirect('/dashboard')
		} else {
			return res.redirect('/license')
		}
	},
)

router.get('/discord/logout', (req, res) => {
	if (req.user) {
		req.logout()
	}
	res.redirect('/login')
})

router.post('/login', async (req, res) => {
	try {
		const { login, password } = req.body

		const candidate = await User.findOne({ login }).select('password')
		if (candidate) {
			if (await bcrypt.compare(password, candidate.password)) {
				const accessToken = jwt.sign(
					{ userId: candidate._id, type: candidate.type },
					process.env.JWT_SECRET,
					{
						expiresIn: '1d',
					},
				)
				return res.status(200).json(accessToken)
			}
		} else {
			return res.status(400).json({ message: 'Данные неверны' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/login', async (req, res) => {
	try {
		const { login, password } = req.body

		const candidate = await User.findOne({ login }).select('password')
		if (candidate) {
			if (await bcrypt.compare(password, candidate.password)) {
				const accessToken = jwt.sign(
					{ userId: candidate._id },
					process.env.JWT_SECRET,
					{
						expiresIn: '1d',
					},
				)
				return res.status(200).json(accessToken)
			}
		} else {
			return res.status(400).json({ message: 'Данные неверны' })
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
		const candidate = await User.findById(req.user.userId)
		candidate.password = await bcrypt.hash(password, parseInt(process.env.SALT))
		await candidate.save()
		return res.status(200).json({ message: 'Пароль изменен' })
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
