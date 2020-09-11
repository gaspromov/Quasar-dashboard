const path = require('path')

module.exports.isAvailableFormat = file => {
  const filetypes = /jpeg|png|jpg/
	const extname = path.extname(file.name).toLowerCase()
	const mimetype = file.mimetype
	return filetypes.test(extname) && filetypes.test(mimetype)
}
