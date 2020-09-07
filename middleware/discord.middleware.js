const passport = require('passport')

const Strategy = require('passport-discord').Strategy
const DiscordUser = require('../models/DiscordUser')

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  console.log('2')
	const candidate = await DiscordUser.findById(id)
	if (candidate) done(null, candidate)
})

passport.use(
	new Strategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CLIENT_REDIRECT,
			scope: ['identify', 'email', 'guilds'],
		},
		async (accessToken, refreshToken, profile, cb) => {
			try {
				const candidate = await DiscordUser.findOne({ discordId: profile.id })
				if (candidate) {
					cb(null, candidate)
				} else {
					const newUser = new DiscordUser({
						discordId: profile.id,
						username: profile.username,
					})
					await newUser.save()
					cb(null, newUser)
				}
			} catch (e) {
				console.log(e)
				cb(e, null)
			}
		},
	),
)
