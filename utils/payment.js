const axios = require('axios')
const { v4 } = require('uuid')

module.exports.checkout = require('yandex-checkout')(
	process.env.SHOP_ID,
	process.env.SHOP_SECRET_KEY,
)

module.exports.payment = async (
	value = 1500,
	description,
	metadata,
	idempotenceKey = v4(),
	email = 'quasarcook@gmail.com',
) => {
	try {
		return await this.checkout.createPayment(
			{
				amount: {
					value,
					currency: 'RUB',
				},
				confirmation: {
					type: 'embedded',
				},
				// receipt: {
				// 	customer: {
				// 		email,
				// 	},
				// 	items: [
				// 		{
				// 			description: `Ключ ${metadata.key}`,
				// 			quantity: '1.00',
				// 			amount: {
				// 				value,
				// 				currency: 'RUB',
				// 			},
				// 			vat_code: 1,
				// 		},
				// 	],
				// 	email,
				// },
				description,
				save_payment_method: true,
				capture: true,
				metadata,
			},
			idempotenceKey,
		)
	} catch (e) {
		console.log(e)
	}
}

module.exports.subscribe = async (
	payment_method_id,
	value,
	description,
	metadata,
	email = 'quasarcook@gmail.com',
) => {
	try {
		return await this.checkout.createPayment({
			amount: {
				value,
				currency: 'RUB',
			},
			// receipt: {
			// 	customer: {
			// 		email,
			// 	},
			// 	items: [
			// 		{
			// 			description: `Ключ ${metadata.key}`,
			// 			quantity: '1.00',
			// 			amount: {
			// 				value,
			// 				currency: 'RUB',
			// 			},
			// 			vat_code: 1,
			// 		},
			// 	],
			// 	email,
			// },
			description,
			metadata,
			payment_method_id,
			capture: true,
		})
	} catch (e) {
		console.log(e)
	}
}

module.exports.getPayments = async () => {
	try {
		const config = {
			method: 'get',
			url: 'https://payment.yandex.net/api/v3/payments?limit=100',
			auth: {
				username: process.env.SHOP_ID,
				password: process.env.SHOP_SECRET_KEY,
			},
		}
		return await axios(config)
	} catch (e) {
		console.log(e)
	}
}
