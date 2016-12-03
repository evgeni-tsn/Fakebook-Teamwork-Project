import mongoose from 'mongoose'

let requiredValidationMessage = '{PATH} is required'

let commentSchema = mongoose.Schema({
	content: {type: String, required: requiredValidationMessage},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: requiredValidationMessage},
	status: {type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: requiredValidationMessage},
	comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}]
}, {
	timestamps: true,
	collection: 'comments',
	indexed: true
})

let Comment = mongoose.model('Comment', commentSchema)

export { Comment }