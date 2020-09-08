const { Router } = require('express')

const DiscordUser = require('../models/DiscordUser')
const router = Router()
const auth = require('../middleware/auth.discord.middleware')

router.get('/license', auth, async (req, res) => {
	try {
		const user = await DiscordUser.findById(req.user.id).select(
			'-_id -licenseExp -license',
		)
		if (user) {
			if (user.avatar) {
				const response = {
					username: user.fullName,
					avatar: `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`,
				}
				return res.status(200).json(response)
			} else {
				const response = {
					username: user.fullName,
					avatar: `https://cdn.discordapp.com/embed/avatars/${
						user.discriminator % 5
					}.png`,
				}
				return res.status(200).json(response)
			}
		} else {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/license', auth, async (req, res) => {
	try {
		const { key } = req.body
		if (key) {
			await DiscordUser.findByIdAndUpdate(req.user.id, {
				license: key,
				licenseExp: Date.now(),
			})
			return res.status(200).json({ message: 'Ключ успешно добавлен' })
		} else {
			return res.status(400).json({ message: 'Не удалось добавить ключ' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
