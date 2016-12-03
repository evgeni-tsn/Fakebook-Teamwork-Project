import mongoose from 'mongoose'

let requiredValidationMessage = '{PATH} is required'

let statusSchema = mongoose.Schema({
  content: {type: String, required: requiredValidationMessage},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: requiredValidationMessage},
  likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  comments: [{type: mongoose.Schema.ObjectId, ref: 'Comment'}]
}, {
  timestamps: true,
  collection: 'statuses'
})

export default mongoose.model('Status', statusSchema)