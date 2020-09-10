// Dependencies
const passport = require('passport')
const refresh = require('passport-oauth2-refresh')

// Strategy
const DiscordStrategy = require('passport-discord').Strategy

// Model
const User = require('../models/User')

passport.serializeUser(async (user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id)
	if (user) {
    await user.refresh()
		done(null, user)
	}
})

const strategy = new DiscordStrategy(
	{
		clientID: process.env.CLIENT_ID,
		clientSecret: process.env.CLIENT_SECRET,
		callbackURL: process.env.CLIENT_REDIRECT,
		scope: ['identify'],
	},
	async (accessToken, refreshToken, profile, done) => {
		try {
			const currentUser = await User.findOne({ discordId: profile.id })
			if (currentUser) {
				done(null, currentUser)
			} else {
				const newUser = await new User({ accessToken, refreshToken }).save()
				done(null, newUser)
			}
		} catch (e) {
			console.log(e)
			done(e, null)
		}
	},
)

passport.use(strategy)
refresh.use(strategy)
