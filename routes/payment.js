const { Router } = require('express')
const authUser = require('../middleware/auth.user.middleware')

const router = Router()

const { payment, subscribe } = require('../utils/payment')

const License = require('../models/License')
const User = require('../models/User')
const Drop = require('../models/Drop')

router.post('/', authUser, async (req, res) => {
	try {
		const { paymentToken, key, dropId } = req.body

		const nextMonth = new Date()
		nextMonth.setMonth(nextMonth.getMonth() + 1)

		const user = await User.findById(req.user.id)
		const drop = await Drop.findById(dropId)

		if (user && !user.license && drop && drop.quantity > drop.purchases) {
			const { status, metadata, payment_method } = await payment(
				paymentToken,
				1500,
				'Покупка ключа',
				key,
			)

			if (status === 'succeeded') {
				drop.purchases += 1
				await drop.save()
				const license = new License({
					key: metadata.key,
					status: 'renewal',
					expiresIn: nextMonth,
					paymentId: payment_method.id,
					card: payment_method.card,
				})
				user.license = license
				license.user = user
				await license.save()
				await user.save()
				return res.status(200).json({ message: 'Вы купили ключ' })
			} else {
				return res.status(400).json({ message: 'Ошибка при оплате' })
			}
		} else {
			return res
				.status(400)
				.json({ message: 'У вас не получилось купить ключ' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
