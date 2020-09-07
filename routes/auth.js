const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = Router()

router.get('/discord', passport.authenticate('discord'))

router.get(
	'/discord/login',
	passport.authenticate('discord'),
	async (req, res) => {
		try {
			const { _id, discordId } = req.user
			const accessToken = jwt.sign(
				{ userId: _id, discordId },
				process.env.JWT_SECRET,
				{
					expiresIn: '1d',
				},
      )
			res.status(200).json(accessToken)
		} catch (e) {
			return res.status(500).json({
				message: 'Что-то пошло не так, попробуйте позже',
				error: e.message,
			})
		}
	},
)
module.exports = router
