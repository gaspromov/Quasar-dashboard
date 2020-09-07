// Dependencies
const passport = require('passport')

// Strategy
const DiscordStrategy = require('passport-discord').Strategy

// Model
const DiscordUser = require('../models/DiscordUser')

passport.use(
	new DiscordStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: process.env.CLIENT_REDIRECT,
			scope: ['identify'],
		},
		async (accessToken, refreshToken, profile, done) => {
      try {
        console.log(profile)
				const user = await DiscordUser.findOne({ discordId: profile.id })
				if (user) {
					done(null, user)
				} else {
					const newUser = new DiscordUser({
						discordId: profile.id,
						username: profile.username,
						discriminator: profile.discriminator,
						avatar: profile.avatar,
					})
					await newUser.save()
					done(null, newUser)
				}
			} catch (e) {
				done(e, null)
			}
		},
	),
)

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
	const user = await DiscordUser.findById(id)
	if (user) done(null, user)
})
