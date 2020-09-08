const { Schema, model } = require('mongoose')

const schema = new Schema(
	{
		discordId: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		discriminator: {
			type: String,
			required: true,
		},
		fullName: {
			type: String,
			required: true,
		},
		license: {
			type: String,
			unique: true,
		},
		accessToken: {
			type: String,
			required: true,
		},
		avatar: String,
		licenseExp: Date,
	},
	{ versionKey: false },
)

module.exports = model('DiscordUser', schema)
