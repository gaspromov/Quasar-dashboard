// Dependencies
const passport = require('passport')
const refresh = require('passport-oauth2-refresh')

// Strategy
const DiscordStrategy = require('passport-discord').Strategy

// Model
const User = require('../models/User')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id)
	if (user) done(null, user)
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
        currentUser.accessToken = accessToken
        currentUser.refreshToken = refreshToken
        await currentUser.save()
				await currentUser.updateInfo()
				done(null, currentUser)
			} else {
				const newUser = new User({
					accessToken,
					refreshToken,
				})
				await newUser.save()
				await newUser.updateInfo()
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
