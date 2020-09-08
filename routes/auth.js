const { Router } = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = Router()

router.get('/discord', passport.authenticate('discord'))

router.get(
	'/discord/login',
	passport.authenticate('discord', {
		failureRedirect: '/login',
		successRedirect: '/activate-key',
	}),
)

router.get('/discord/logout', (req, res) => {
	if (req.user) {
		req.logout()
	}
	res.redirect('/login')
})

module.exports = router
