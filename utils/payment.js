module.exports.checkout = require('yandex-checkout')(
	process.env.SHOP_ID,
	process.env.SHOP_SECRET_KEY,
)

module.exports.payment = async (
	value,
	description,
	metadata,
	idempotenceKey,
	email,
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
				receipt: {
					customer: {
						email,
					},
					items: [
						{
							description: `Ключ ${metadata.key}`,
							quantity: '1.00',
							amount: {
								value,
								currency: 'RUB',
							},
							vat_code: 1,
						},
					],
					email,
				},
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
