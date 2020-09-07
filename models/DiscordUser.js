const { Schema, model } = require('mongoose')

const schema = new Schema({
	discordId: {
		type: String,
		required: true,
  },
  username: {
    type: String, 
    required: true
  }
}, {versionKey: false})

module.exports = model('DiscordUser', schema)
