// Dotenv
require('dotenv').config()

// Dependencies
const compression = require('compression')
const mongoose = require('mongoose')
const passport = require('passport')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')

// Variables
const PORT = process.env.PORT
const app = express()

// Middleware
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(morgan('dev'))
app.use(helmet())
const discord = require('./middleware/discord.middleware')
app.use(passport.initialize())

// Routes
app.use('/api/v1/auth', require('./routes/auth'))

// Docs
app.get('/api/v1/docs', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'docs', 'index.html'))
})

// Single Page
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const start = async () => {
	try {
		// Connect to mongoDB
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})

		// Start server
		app.listen(PORT, () =>
			console.log(`Server has been started on PORT ${PORT}`),
		)
	} catch (e) {
		// Error processing
		console.log('Неизвестная ошибка', e.message)
		process.exit(1)
	}
}

start()