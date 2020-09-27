const { Router } = require('express')
const authUser = require('../middleware/auth.user.middleware')

const router = Router()

const { payment, subscribe } = require('../utils/payment')

const License = require('../models/License')
const User = require('../models/User')
const Drop = require('../models/Drop')

router.post('/', authUser, async (req, res) => {
	try {
		const { dropId, key } = req.body

		const user = await User.findById(req.user.id)
		const drop = await Drop.findOne({ _id: dropId, status: 'active' })
		const idempotence = drop.idempotences.find(i => i.status === 'active')
		if (user && !user.license && drop && idempotence) {
			const { confirmation } = await payment(
				1500,
				`Ключ для ${user.fullName}`,
				{
					dropId,
					key,
					userId: req.user.id,
					idempotence: idempotence.key,
				},
				idempotence.key,
				user.email,
			)
			return res
				.status(200)
				.json({ confirmationToken: confirmation.confirmation_token })
		} else {
			return res
				.status(400)
				.json({ message: 'У вас нет возможности купить ключ' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/webhook', async (req, res) => {
	try {
		const nextMonth = new Date()
		nextMonth.setMonth(nextMonth.getMonth() + 1)
		const { object } = req.body
		const { payment_method, metadata, status } = object
		if (status === 'succeeded') {
			const drop = await Drop.findById(metadata.dropId)

			drop.idempotences.forEach(idempotence => {
				if (idempotence.key === metadata.idempotence) {
					idempotence.status = 'finished'
				}
			})
			await drop.save()

			const license = License({
				key: metadata.key,
				status: 'renewal',
				expiresIn: nextMonth,
				user: metadata.userId,
				paymentId: payment_method.id,
				card: payment_method.card,
			})
			await license.save()

			const user = await User.findById(metadata.userId)
			user.license = license._id
			await user.save()

			const active = drop.idempotences.find(i => i.status === 'active')
			if (!active) {
				drop.status = 'finished'
				await drop.save()
			}
			return res.status(200).json()
		}
	} catch (e) {
		console.log(e)
	}
})
module.exports = router
