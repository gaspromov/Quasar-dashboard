const { Router } = require('express')
const passport = require('passport')

const router = Router()

router.get('/discord', passport.authenticate('discord'), (req, res) => {})

router.get(
	'/discord/redirect',
	passport.authenticate('discord', {
		failureRedirect: '/forbidden',
		successRedirect: '/',
	}),
	(req, res) => {
		res.send(req.user)
	},
)
module.exports = router
