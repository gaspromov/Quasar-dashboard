const refresh = require('passport-oauth2-refresh')
const axios = require('axios')

const { Schema, model, Types } = require('mongoose')

const schema = new Schema(
	{
		discordId: String,
		username: String,
		discriminator: String,
		fullName: String,
		avatar: String,
		license: Types.ObjectId,
		accessToken: {
			type: String,
			required: true,
		},
		refreshToken: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false },
)

schema.methods.refresh = async function () {
	try {
		refresh.requestNewAccessToken(
			'discord',
			this.refreshToken,
			async (err, accessToken, refreshToken) => {
				this.accessToken = accessToken
				this.refreshToken = refreshToken
        await this.save()
        await this.updateInfo()
			},
		)
	} catch (e) {
		console.log('Не удалось обновить accessToken', e.message)
	}
}

schema.methods.updateInfo = async function () {
	try {
		const config = {
			method: 'get',
			url: 'https://discord.com/api/v6/users/@me',
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		}
		const { data } = await axios(config)
		this.discordId = data.id
		this.username = data.username
		this.discriminator = data.discriminator
		this.fullName = `${data.username}#${data.discriminator}`
		if (data.avatar) {
			this.avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
		} else {
			this.avatar = `https://cdn.discordapp.com/embed/avatars/${
				data.discriminator % 5
			}.png`
		}
		await this.save()
	} catch (e) {
		console.log('Не удалось обновить информацию о пользователе', e.message)
	}
}

module.exports = model('User', schema)
