module.exports.checkout = require('yandex-checkout')(
	process.env.SHOP_ID,
	process.env.SHOP_SECRET_KEY,
)

module.exports.payment = async (value, description, key) => {
	try {
		return await this.checkout.createPayment({
			amount: {
				value,
				currency: 'RUB',
			},
			confirmation: {
				type: 'embedded',
			},
			description,
			save_payment_method: true,
			capture: false,
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
