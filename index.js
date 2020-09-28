// Dotenv
require('dotenv').config()

// Strategies
require('./strategies/discord')

// Dependencies
const fileUpload = require('express-fileupload')
const compression = require('compression')
const mongoose = require('mongoose')
const passport = require('passport')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

// Variables
const PORT = process.env.PORT
const app = express()

// Middleware
app.use(
	fileUpload({
		createParentPath: true,
		abortOnLimit: true,
		responseOnLimit: JSON.stringify({
			message: 'Размер файла слишком большой',
		}),
		limits: {
			fileSize: 10 * 1024 * 1024,
		},
	}),
)
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.static(path.resolve(__dirname, 'images')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use(morgan('dev'))
app.use(helmet())

const sess = {
	name: 'discord.oauth2',
	secret: process.env.COOKIE_SECRET,
	cookie: {
		maxAge: 60 * 1000 * 60 * 24,
		httpOnly: false,
	},
	resave: false,
	saveUninitialized: false,
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
}

if (process.env.NODE_ENV === 'production') {
	app.set('trust proxy', 1)
	sess.cookie.secure = true
}

app.use(session(sess))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api/v1/auth', require('./routes/auth'))
app.use('/api/v1/users', require('./routes/users'))
app.use('/api/v1/successes', require('./routes/successes'))
app.use('/api/v1/licenses', require('./routes/licenses'))
app.use('/api/v1/drops', require('./routes/drops'))
app.use('/api/v1/notifications', require('./routes/notification'))
app.use('/api/v1/payment', require('./routes/payment'))

// Single Page
// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })

const start = async () => {
	try {
		// Connect to mongoDB
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
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
