const refresh = require('passport-oauth2-refresh')
const axios = require('axios')

const { Schema, model, Types } = require('mongoose')
const License = require('./License')
const Notification = require('./Notification')

const schema = new Schema(
	{
		discordId: String,
		username: String,
		discriminator: String,
		fullName: String,
    avatar: String,
    email: String,
		license: {
			type: Types.ObjectId,
			ref: 'License',
		},
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
				if (accessToken && refreshToken) {
					this.accessToken = accessToken
					this.refreshToken = refreshToken
					await this.save()
				}
			},
		)
	} catch (e) {
		console.log('Не удалось обновить accessToken и refreshToken:', e.message)
	}
}

schema.methods.updateInfo = async function () {
	try {
		await this.refresh()
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
		this.email = data.email
		this.discriminator = data.discriminator
		this.fullName = `${data.username}#${data.discriminator}`
		if (data.avatar) {
			this.avatar = `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
		} else {
			this.avatar = `https://cdn.discordapp.com/embed/avatars/${
				data.discriminator % 5
			}.png`
		}
	} catch (e) {
		console.log('Не удалось обновить информацию о пользователе', e.message)
	}
}

schema.methods.checkLicense = async function () {
	const license = await License.findById(this.license)
	if (license && license.status === 'expired') {
    await License.findByIdAndDelete(this.license)
    this.license = undefined
		const notification = new Notification({
			user: this.fullName,
			license: license.key,
			type: 'Expired',
		})
    await notification.save()
    const config = {
			method: 'delete',
			url: `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${this.discordId}`,
			headers: {
				Authorization: `Bot ${process.env.BOT_TOKEN}`,
			},
		}
		await axios(config)
	}
}

module.exports = model('User', schema)
