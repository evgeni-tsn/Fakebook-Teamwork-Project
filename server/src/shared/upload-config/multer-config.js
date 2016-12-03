import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import config from '../../config'
import mime from 'mime'

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		console.log("trying")
		cb(null, path.join(config.root, '/public/avatars'))
	},
	filename: function (req, file, cb) {
		console.log("to upload")
		crypto.pseudoRandomBytes(6, function (err, raw) {
			cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype))
		})
	}
})

const fileFilter = function (req, file, cb) {
	console.log('ko sta')
	if (!file.originalname.match(/.+\.(jpg|jpeg|png)$/)) {
		console.log('invalid file')
		return cb(null, false);
	}
	cb(null, true)
}

const upload = multer({ storage: storage, fileFilter: fileFilter})
export { upload }