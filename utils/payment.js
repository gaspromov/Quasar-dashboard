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
				description,
				save_payment_method: true,
				capture: true,
				metadata,
				receipt: {
					items: [
						{
							description: 'Ключ для QuasarCook',
							quantity: '1.00',
							amount: {
								value,
								currency: 'RUB',
							},
							vat_code: 1,
						},
					],
				},
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
) => {
	try {
		return await this.checkout.createPayment({
			amount: {
				value,
				currency: 'RUB',
			},
			description,
			metadata,
			payment_method_id,
			capture: true,
			receipt: {
				items: [
					{
						description: 'Ключ для QuasarCook',
						quantity: '1.00',
						amount: {
							value,
							currency: 'RUB',
						},
						vat_code: 1,
					},
				],
			},
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
