module.exports.checkout = require('yandex-checkout')(
	process.env.SHOP_ID,
	process.env.SHOP_SECRET_KEY,
)

module.exports.payment = async (payment_token, value, description, key) => {
	try {
		return await this.checkout.createPayment({
			payment_token,
			amount: {
				value,
				currency: 'RUB',
			},
			confirmation: {
				type: 'redirect',
				return_url: process.env.SHOP_REDIRECT,
			},
			description,
			save_payment_method: true,
			capture: true,
			metadata: {
				key,
			},
		})
	} catch (e) {
		console.log(e)
	}
}

module.exports.subscribe = async (
	payment_method_id,
	value,
	description,
	key,
) => {
	try {
		return await this.checkout.createPayment({
			amount: {
				value,
				currency: 'RUB',
			},
			payment_method_id,
			description,
			capture: true,
			metadata: {
				key,
			},
		})
	} catch (e) {
		console.log(e)
	}
}
