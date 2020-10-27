const path = require('path')
const { body } = require('express-validator')

module.exports.isAvailableFormat = file => {
	const filetypes = /jpeg|png|jpg/
	const extname = path.extname(file.name).toLowerCase()
	const mimetype = file.mimetype
	return filetypes.test(extname) && filetypes.test(mimetype)
}

module.exports.dropsValidators = [
	body('password', 'Введите пароль').exists(),
	body('date', 'Некорректная дата').isAfter(),
	body('quantity', 'Некорректное количество участников').isInt({ min: 1 }),
]

module.exports.licenseEditValidators = [
	body('id', 'Некорректный id').isMongoId(),
	body('status', 'Некорректный статус').isIn(['lifetime', 'renewal', 'expired']),
]
