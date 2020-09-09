const { Router } = require('express')

const router = Router()

const authUser = require('../middleware/auth.user.middleware')
const User = require('../models/User')

router.get('/', authUser, async (req, res) => {
	try {
		const user = await User.findById(req.user.id)
		if (user) {
      await user.updateInfo()
			return res.status(200).json(user)
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

module.exports = router
