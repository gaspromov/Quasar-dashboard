const { Router } = require('express')

const router = Router()

const authAdmin = require('../middleware/auth.admin.middleware')

const Notification = require('../models/Notification')

router.get('/', authAdmin, async (req, res) => {
	try {
		const notifications = await Notification.find()
		return res.status(200).json(notifications)
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.delete('/', authAdmin, (req, res) => {
	try {
		const { id } = req.body
		console.log(id)
		Notification.findByIdAndDelete(id, (err, notification) => {
			if (!err && notification) {
				return res.status(200).json({ message: 'Уведомление удалено' })
			} else {
				return res.status(400).json({ message: 'Уведомление не найдено' })
			}
		})
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
