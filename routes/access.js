const { Router } = require('express')

const DiscordUser = require('../models/DiscordUser')
const router = Router()
const auth = require('../middleware/auth.discord.middleware')

router.get('/licence', auth, async (req, res) => {
	try {
		const user = await DiscordUser.findById(req.user.id)

    if (user) {
      console.log(user)
			return res.status(200).json(user)
		}
		return res.status(404).json({ message: 'Не найден' })
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
