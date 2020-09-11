// Dependencies
const passport = require('passport')
const refresh = require('passport-oauth2-refresh')
const License = require('../models/License')

// Strategy
const DiscordStrategy = require('passport-discord').Strategy

// Model
const User = require('../models/User')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	User.findById(id, async (err, user) => {
		if (!err) {
			await user.updateInfo()
			done(null, user)
		}
	})
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
				await currentUser.updateInfo()
				done(null, currentUser)
			} else {
				let avatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
				if (!profile.avatar) {
					avatar = `https://cdn.discordapp.com/embed/avatars/${
						profile.discriminator % 5
					}.png`
				}
				const newUser = new User({
					accessToken,
					refreshToken,
					discordId: profile.id,
					username: profile.username,
					discriminator: profile.discriminator,
					fullName: `${profile.username}#${profile.discriminator}`,
					avatar,
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
