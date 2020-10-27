// Dependencies
const { Router } = require('express')
const { validationResult } = require('express-validator')
const axios = require('axios')

// Models
const License = require('../models/License')
const User = require('../models/User')

// Middleware
const authAdmin = require('../middleware/auth.admin.middleware')
const { licenseEditValidators } = require('../utils/validators')

// Variables
const router = Router()

// GET /api/v1/licenses
router.get('/', authAdmin, async (req, res) => {
	try {
		await License.clear()
		const licenses = await License.find({
			status: ['renewal', 'lifetime'],
		}).populate('user', '-_id fullName')
		return res.status(200).json(licenses)
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

// POST /api/v1/licenses
router.post('/', authAdmin, async (req, res) => {
	try {
		let { key, status, expiresIn } = req.body
		expiresIn = new Date(expiresIn)
		expiresIn = status === 'lifetime' ? undefined : expiresIn
		const subscribe = status === 'lifetime' ? true : false
		if (expiresIn >= new Date() || status === 'lifetime') {
			const license = new License({
				key,
				status,
				expiresIn,
				subscribe,
			})
			await license.save()
			return res.status(201).json({ message: `Ключ ${key} успешно создан` })
		} else {
			return res
				.status(400)
				.json({ message: 'Дата окончания не может быть в прошлом' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

// DELETE /api/v1/licenses
router.delete('/', authAdmin, async (req, res) => {
	try {
		await License.clear()
		const { id } = req.body
		License.findByIdAndDelete(id, async (err, license) => {
			if (license && !err) {
				const user = await User.findOne({ license: license._id })
				if (user) {
					const config = {
						method: 'delete',
						url: `https://discord.com/api/guilds/${process.env.GUILD_ID}/members/${user.discordId}`,
						headers: {
							Authorization: `Bot ${process.env.BOT_TOKEN}`,
						},
					}
					await axios(config)
					user.license = undefined
					await user.save()
				}
				return res.status(200).json({ message: 'Ключ удален' })
			} else {
				return res.status(400).json({ message: 'Ключ не найден' })
			}
		})
  } catch (e) {
    console.log(e)
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

// PATCH /api/v1/licenses
router.patch('/', authAdmin, licenseEditValidators, async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ message: errors.array()[0].msg })
		await License.clear()
		const { id, status, expiresIn } = req.body
		const correctDate = new Date(expiresIn)
		const license = await License.findById(id)
		if (license) {
			if (status === 'lifetime') {
				license.status = status
				license.expiresIn = undefined
				license.subscribe = true
			} else {
				license.status = status
				license.expiresIn = correctDate
				license.subscribe = license.paymentId ? true : false
			}
			await license.save()
			await License.clear()
			return res.status(200).json({ message: 'Ключ изменен' })
		} else {
			return res.status(400).json({ message: 'Ключ не найден' })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/check', async (req, res) => {
	try {
		await License.clear()
		const { key } = req.body
		const license = await License.findOne({ key })
		if (license && license.status !== 'expired') {
			return res.status(200).json()
		} else {
			return res.status(400).json()
		}
	} catch (e) {
		console.log(e)
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
		})
	}
})

module.exports = router
