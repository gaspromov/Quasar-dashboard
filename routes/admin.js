const { Router } = require('express')
const path = require('path')
const shortid = require('shortid')

const router = Router()

const authAdmin = require('../middleware/auth.admin.middleware')
const User = require('../models/User')
const License = require('../models/License')
const { isAvailableFormat } = require('../utils/validators')
const Success = require('../models/Success')

router.get('/license', authAdmin, async (req, res) => {
	try {
		const licenses = await License.find()
		return res.status(200).json(licenses)
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

router.post('/license', authAdmin, async (req, res) => {
	try {
		let { key, status, expiresIn } = req.body
		expiresIn = new Date(expiresIn)
		expiresIn = status === 'lifetime' ? undefined : expiresIn
		if (expiresIn >= new Date() || status === 'lifetime') {
			const license = new License({
				key,
				status,
				expiresIn,
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

router.post('/success', authAdmin, async (req, res) => {
	try {
		const { date, description } = req.body
		const { image } = req.files
		const extname = path.extname(image.name).toLowerCase()
    const correctDate = new Date(date)
		const name = path.join(
			'images',
			`image-${correctDate.getMonth()}-${correctDate.getFullYear()}-${
				shortid.generate() + extname
			}`,
		)
		if (isAvailableFormat(image)) {
			const success = new Success({
				date: correctDate,
				description,
				image: `/${name}`,
			})
			await success.save()
			await image.mv(path.resolve(__dirname, '..', 'public', name))
			return res.status(201).json({ message: 'Success создан' })
		} else {
			return res
				.status(400)
				.json({ message: `Разрешение ${extname} не поддерживается` })
		}
	} catch (e) {
		return res.status(500).json({
			message: 'Что-то пошло не так, попробуйте позже',
			error: e.message,
		})
	}
})

module.exports = router
