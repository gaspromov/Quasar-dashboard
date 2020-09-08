// Dependencies
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
		if (!token) {
			return res.status(401).json({ message: 'Нет авторизации' })
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (e) {
		return res.status(401).json({ message: 'Нет авторизации' })
	}
}