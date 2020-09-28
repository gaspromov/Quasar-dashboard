const { Router } = require('express')
const authUser = require('../middleware/auth.user.middleware')

const router = Router()

const { payment } = require('../utils/payment')

const License = require('../models/License')
const User = require('../models/User')
const Drop = require('../models/Drop')
const Notification = require('../models/Notification')

let queue = 0

router.post('/', authUser, async (req, res) => {
	try {
		const { dropId, key } = req.body

		const user = await User.findById(req.user.id)
		const drop = await Drop.findOne({ _id: dropId, status: 'active' })
    queue = drop.quantity === queue - 1 ? 0 : queue
		const idempotence =
			drop.idempotences[queue].status === 'active'
				? drop.idempotences[queue]
				: drop.idempotences.find(i => i.status === 'active')

    if (user && !user.license && drop && idempotence) {
      console.log(queue)
			queue++
			const { confirmation } = await payment(
				2000,
				`Ключ для ${user.fullName}`,
				{
					dropId,
					key,
					userId: req.user.id,
					idempotence: idempotence.key,
					type: 'buy',
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
		if (status === 'succeeded' && metadata.type === 'buy') {
			const drop = await Drop.findById(metadata.dropId)

			drop.idempotences.forEach(idempotence => {
				if (idempotence.key === metadata.idempotence) {
					idempotence.status = 'finished'
				}
			})
			await drop.save()

			const license = new License({
				key: metadata.key,
				status: 'renewal',
				expiresIn: nextMonth,
				user: metadata.userId,
				paymentId: payment_method.id,
				card: payment_method.card,
				subscribe: true,
			})
			await license.save()

			const user = await User.findById(metadata.userId)
			user.license = license._id
			await user.save()

			const notification = new Notification({
				user: user.fullName,
				license: license.key,
				type: 'Bind',
			})
			await notification.save()

			const active = drop.idempotences.find(i => i.status === 'active')
			if (!active) {
				drop.status = 'finished'
				await drop.save()
				queue = 0
			}
			return res.status(200).json()
		} else if (status === 'succeeded' && metadata.type === 'change-card') {
			const user = await User.findById(metadata.userId)
			const license = await License.findById(metadata.licenseId)

			user.license = license._id

			license.user = metadata.userId
			license.paymentId = payment_method.id
			license.card = payment_method.card
			license.subscribe = true

			await license.save()
			await user.save()

			return res.status(200).json()
		}
	} catch (e) {
		console.log(e)
	}
})
module.exports = router
