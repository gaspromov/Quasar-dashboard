const { Router } = require('express')

const DiscordUser = require('../models/DiscordUser')
const License = require('../models/License')
const router = Router()
// const auth = require('../middleware/auth.discord.middleware')

router.post('/license', async (req, res) => {
	try {
		const { key } = req.body
		const license = await License.findOne({
			key,
			expiresIn: { $gt: new Date() },
		})
		if (license) {
			await DiscordUser.findByIdAndUpdate(req.user.id, { license })
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
