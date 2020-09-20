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

// Docs
app.get('/api/v1/docs', (req, res) => {
	return res.sendFile(path.resolve(__dirname, 'docs', 'index.html'))
})

// Single Page
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'public', 'src', 'index.html'))
})

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

		// const yandexCheckout = require('yandex-checkout')(
		// 	'747566',
		// 	'test_gqF_HQEr_88bQgWFo3PZVSoyb-ezL8tM-SIFFU9E7Rc',
		// )
		// const idempotenceKey = '02347fc4-a1f0-49db-807e-f0d67c2ed5a5'

		// yandexCheckout
		// 	.createPayment({
		// 		payment_token:
		// 			'eyJ0eXBlIjoiY2hlY2tvdXRfanNfYmFua19jYXJkIiwiZW5jcnlwdGVkIjoiMFk3Q3dVVXFVSUE0bXVUWW5EVXhBRG9PUFFCRHByQ3F6Y0cvcGw5SDFZV0xKejROaS9wVkZ0amhmT3N1b1NzVGp2cFJzYkRxSTdLWStYNjZjdW45STczTC8zQXFPOGVwV0dtSFEyV1pXR1lHM3pNdUxyNHp1WmJzMW85bDh5czdjT0ZuMEc5T3hma0kyNitQcXBuSGU3NGZwYzRXU1l2TUh4MFpyYVdRNW5UdFlDVWQyZz09IiwiaW5pdFZlY3RvciI6Ik50d0lpZVFFaG9Cb3FJRzFxT29yREE9PSIsImtleUlkIjoiT2pOQUJrL21Uam5kTGtWZlR1U1F0dz09In0=',
		// 		amount: {
		// 			value: '2.00',
		// 			currency: 'RUB',
		// 		},
		// 		confirmation: {
		// 			type: 'redirect',
		// 			return_url: 'https://www.merchant-website.com/return_url',
		// 		},
		// 		description: 'Заказ №72',
		// 		capture: false,
		// 		save_payment_method: true,
		// 	})
		// 	.then(result => {
		// 		console.log({ payment: result })
		// 	})
		// 	.catch(err => console.log(err))
	} catch (e) {
		// Error processing
		console.log('Неизвестная ошибка', e.message)
		process.exit(1)
	}
}

start()
