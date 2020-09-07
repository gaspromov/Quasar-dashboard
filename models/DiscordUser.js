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
      required: true
    },
    avatar: String,
    licence: {
      type: String,
      unique: true
    },
    licenceExp: Date
	},
	{ versionKey: false },
)

module.exports = model('DiscordUser', schema)
